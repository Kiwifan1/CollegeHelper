import asyncio
import json
import azure.functions as func
from pypika import Query, Table, Field, CustomFunction, functions as fn, Order, queries

from azure.core.paging import ItemPaged, PageIterator
from azure.cosmos import CosmosClient, ContainerProxy, PartitionKey
from http import HTTPStatus
from user_db_triggers import (
    CONTAINER as USER_CONTAINER,
    DATABASE,
    query_cosmos_db,
    hash,
)

from model.utils import append_scores

schol_bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"
cosmos_readonly_key = "CosmosClientReadonlyKey"
SCHOL_CONTAINER = DATABASE.get_container_client("SCHOLARSHIP")
SCORE_CONTAINER = DATABASE.get_container_client("SCORES")


def handleRequirements(string_input):
    if string_input == "Yes":
        return True
    elif string_input == "No":
        return False
    else:
        return None


def build_query(req, query, params, user=None):
    sort_by_match = req.params.get("sort_by_match") == "true"
    essay_required = req.params.get("essayRequired") or None
    merit_based = req.params.get("meritBased") or None
    need_based = req.params.get("needBased") or None

    # adding the predictive list ordering and filtering
    if sort_by_match:
        # start query with creating a list of scholarships from the user
        query += " JOIN s IN c.userScores"
        query += " WHERE s.userId = @user_id"
        params.append({"name": "@user_id", "value": user["id"]})

    if essay_required != None:
        query += " WHERE c.isEssayRequired = @essayRequired"
        params.append(
            {
                "name": "@essayRequired",
                "value": handleRequirements(req.params.get("essayRequired")),
            }
        )

    if merit_based != None:
        if len(params) > 0:
            query += " AND c.isMeritBased = @meritRequired"
        else:
            query += " WHERE c.isMeritBased = @meritRequired"
        params.append(
            {
                "name": "@meritRequired",
                "value": handleRequirements(req.params.get("meritBased")),
            }
        )

    if need_based != None:
        if len(params) > 0:
            query += " AND c.isNeedBased = @needBased"
        else:
            query += " WHERE c.isNeedBased = @needBased"
        params.append(
            {
                "name": "@needBased",
                "value": handleRequirements(req.params.get("needBased")),
            }
        )

    if sort_by_match:
        query += " ORDER BY c.userScores[0].score DESC"
    return query, params


def filter_scholarships(scholarships, req):
    essay_required = req.params.get("essayRequired") or False
    merit_based = req.params.get("meritBased") or False
    need_based = req.params.get("needBased") or False

    filtered_scholarships = []

    for scholarship in scholarships:
        if essay_required and scholarship["isEssayRequired"] != essay_required:
            continue
        if merit_based and scholarship["isMeritBased"] != merit_based:
            continue
        if need_based and scholarship["isNeedBased"] != need_based:
            continue
        filtered_scholarships.append(scholarship)

    return filtered_scholarships


@schol_bp.cosmos_db_input(
    arg_name="user",
    database_name="CollegeHelperDB",
    container_name="USER",
    connection=cosmos_db_connection,
)
@schol_bp.route(route="get_scholarships", methods=["GET"])
def get_scholarships(
    req: func.HttpRequest, user: func.DocumentList
) -> func.HttpResponse:
    # params
    id = req.params.get("id")
    offset = req.params.get("offset")
    limit = req.params.get("limit")

    if not offset or not limit:
        return func.HttpResponse("Error: Missing offset/limit", status_code=400)

    user = next(iter([u.data for u in user if u.data["id"] == id]), None)

    query = "SELECT c FROM c"
    params = []

    query, params = build_query(req, query, params, user)

    query += " OFFSET @offset LIMIT @limit"
    params.append({"name": "@offset", "value": int(offset)})
    params.append({"name": "@limit", "value": int(limit)})

    scholarships = list(query_cosmos_db(query, params, SCHOL_CONTAINER, True))
    scholarships = [s["c"] for s in scholarships]

    return func.HttpResponse(
        json.dumps(scholarships),
        status_code=200,
        mimetype="application/json",
    )


@schol_bp.route(route="get_scholarship", methods=["GET"])
def get_scholarship(req: func.HttpRequest) -> func.HttpResponse:
    scholarship_id = req.params.get("id")
    if not scholarship_id:
        return func.HttpResponse("Error: Missing scholarship id", status_code=400)

    query = "SELECT * FROM c WHERE c.id = @id"
    params = [{"name": "@id", "value": scholarship_id}]

    try:
        scholarship = list(query_cosmos_db(query, params, SCHOL_CONTAINER, True))
        if not scholarship:
            return func.HttpResponse("Error: Scholarship not found", status_code=404)
        return func.HttpResponse(
            json.dumps(scholarship[0]), status_code=200, mimetype="application/json"
        )
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)


@schol_bp.route(route="get_num_scholarships", methods=["GET"])
@schol_bp.cosmos_db_input(
    arg_name="user",
    database_name="CollegeHelperDB",
    container_name="USER",
    connection=cosmos_db_connection,
)
def get_num_scholarships(
    req: func.HttpRequest, user: func.DocumentList
) -> func.HttpResponse:
    id = req.params.get("id")
    user = next(iter([u.data for u in user if u.data["id"] == id]), None)

    query = "SELECT VALUE COUNT(1) FROM c"
    params = []

    query, params = build_query(req, query, params, user)

    try:
        num_scholarships = list(query_cosmos_db(query, params, SCHOL_CONTAINER, True))
        # get length of list
        return func.HttpResponse(
            json.dumps({"length": num_scholarships[0]}),
            status_code=200,
            mimetype="application/json",
        )
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)


@schol_bp.queue_output(
    arg_name="msg",
    queue_name="scholarship-predictions-queue",
    connection="AzureWebJobsStorage",
)
@schol_bp.route(route="predict_scholarships", methods=["POST"])
def predict_scholarships(
    req: func.HttpRequest,
    msg: func.Out[func.QueueMessage],
) -> func.HttpResponse:
    user = json.loads(req.get_body().decode("utf-8"))
    if not user:
        return func.HttpResponse("Error: Missing user data", status_code=400)
    if not "id" in user:
        return func.HttpResponse("Error: Missing user id", status_code=400)
    if not "password" in user or not "salt" in user:
        return func.HttpResponse("Error: Missing password/salt", status_code=400)

    potential_pass = hash(user["password"], user["salt"])

    # check if user exists
    query = "SELECT * FROM c WHERE c.id = @id AND c.password = @password"
    params = [
        {"name": "@id", "value": user["id"]},
        {"name": "@password", "value": potential_pass},
    ]

    try:
        user = list(
            query_cosmos_db(query, params, DATABASE.get_container_client("USER"), True)
        )
        if not user:
            return func.HttpResponse("Error: User not found", status_code=404)
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)

    if user[0].get("scholarshipScores"):
        user[0].pop("scholarshipScores")

    msg.set(json.dumps(user[0]))
    return func.HttpResponse("User found", status_code=200)


@schol_bp.queue_trigger(
    arg_name="msg",
    queue_name="scholarship-predictions-queue",
    connection="AzureWebJobsStorage",
)
@schol_bp.cosmos_db_input(
    arg_name="scholarships",
    database_name="CollegeHelperDB",
    container_name="SCHOLARSHIP",
    connection=cosmos_db_connection,
)
async def process_prediction_request(
    msg: func.QueueMessage, scholarships: func.DocumentList
) -> None:
    if not msg or not msg.get_body() or not scholarships:
        return
    user = json.loads(msg.get_body().decode("utf-8"))

    # returns [(schol_id, score), ...]
    user_preds = append_scores(user, scholarships)
    user_preds = {pred[0]: pred[1] for pred in user_preds}

    # convert to list for stored procedure testing
    # user_preds = [{"id": key, "score": value} for key, value in user_preds.items()]
    # user_preds.insert(0, {"id": user["id"], "score": 0})

    scholarships = [
        schol.data for schol in scholarships if schol.data["id"] in user_preds
    ]

    for scholarship in scholarships:
        if not scholarship.get("userScores") or scholarship["userScores"] == []:
            scholarship["userScores"] = [
                {"userId": user["id"], "score": user_preds[scholarship["id"]]}
            ]
        else:
            user_exists = any(
                [score["userId"] == user["id"] for score in scholarship["userScores"]]
            )

            # userScores is set up [{'userId': <id>, 'score': <score>}, ...]
            if user_exists:
                scholarship["userScores"] = [
                    (
                        {"userId": user["id"], "score": user_preds[scholarship["id"]]}
                        if score["userId"] == user["id"]
                        else score
                    )
                    for score in scholarship["userScores"]
                ]
            else:
                scholarship["userScores"].append(
                    {"userId": user["id"], "score": user_preds[scholarship["id"]]}
                )

    scholarship_routines = [updateScore(scholarship) for scholarship in scholarships]
    # batch them into sizes of 100
    batch_size = 100
    for i in range(0, len(scholarship_routines), batch_size):
        await asyncio.gather(*scholarship_routines[i : i + batch_size])


async def updateScore(scholarship):
    await SCORE_CONTAINER.upsert_item(scholarship)
