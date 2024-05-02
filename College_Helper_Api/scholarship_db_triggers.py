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
SCORE_CONTAINER = DATABASE.get_container_client("SCORE")


def handleRequirements(string_input):
    if string_input == "Yes":
        return True
    elif string_input == "No":
        return False
    else:
        return None


def build_query(req, query, params, user=None, similarity_match=True):
    essay_required = req.params.get("essayRequired") or None
    merit_based = req.params.get("meritBased") or None
    application_fee = req.params.get("applicationFee") or None
    need_based = req.params.get("needBased") or None

    essay_required = handleRequirements(essay_required)
    merit_based = handleRequirements(merit_based)
    application_fee = handleRequirements(application_fee)
    need_based = handleRequirements(need_based)

    min_amount = req.params.get("minAmount") or None
    max_amount = req.params.get("maxAmount") or None

    # adding the predictive list ordering and filtering
    if similarity_match is not None and user and user["scholarshipScores"] != []:
        if len(params) > 0:
            query += " AND ARRAY_CONTAINS(@schol_ids, c.id, true)"
        else:
            query += " WHERE ARRAY_CONTAINS(@schol_ids, c.id, true)"
        params.append(
            {
                "name": "@schol_ids",
                "value": [s["scholId"] for s in user["scholarshipScores"]],
            }
        )

    if essay_required is not None:
        if len(params) > 0:
            query += " AND c.isEssayRequired = @essayRequired"
        else:
            query += " WHERE c.isEssayRequired = @essayRequired"
        params.append(
            {
                "name": "@essayRequired",
                "value": essay_required,
            }
        )

    if merit_based is not None:
        if len(params) > 0:
            query += " AND c.isMeritBased = @meritRequired"
        else:
            query += " WHERE c.isMeritBased = @meritRequired"
        params.append(
            {
                "name": "@meritRequired",
                "value": merit_based,
            }
        )

    if need_based is not None:
        if len(params) > 0:
            query += " AND c.isNeedBased = @needBased"
        else:
            query += " WHERE c.isNeedBased = @needBased"
        params.append(
            {
                "name": "@needBased",
                "value": need_based,
            }
        )

    if application_fee is not None:
        operator = "=" if not application_fee else "!="
        if len(params) > 0:
            query += f" AND c.applicationFee {operator} null"
        else:
            query += f" WHERE c.applicationFee {operator} null"

    if min_amount is not None:
        if len(params) > 0:
            query += " AND c.awardMax >= @minAmount"
        else:
            query += " WHERE c.awardMax >= @minAmount"
        params.append({"name": "@minAmount", "value": int(min_amount)})

    if max_amount is not None:
        if len(params) > 0:
            query += " AND c.awardMax <= @maxAmount"
        else:
            query += " WHERE c.awardMax <= @maxAmount"
        params.append({"name": "@maxAmount", "value": int(max_amount)})

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
@schol_bp.cosmos_db_input(
    arg_name="scores",
    database_name="CollegeHelperDB",
    container_name="SCORE",
    connection=cosmos_db_connection,
)
@schol_bp.route(route="get_scholarships", methods=["GET"])
def get_scholarships(
    req: func.HttpRequest, user: func.DocumentList, scores: func.DocumentList
) -> func.HttpResponse:
    # params
    id = req.params.get("id")
    offset = req.params.get("offset")
    limit = req.params.get("limit")
    similarity_match = req.params.get("similarityMatch") == "true"

    if not offset or not limit:
        return func.HttpResponse("Error: Missing offset/limit", status_code=400)

    user = next(iter([u.data for u in user if u.data["id"] == id]), None)
    user_score = next(iter([u.data for u in scores if u.data["userId"] == id]), None)

    if not user_score:
        similarity_match = False
        user["scholarshipScores"] = []
    else:
        user["scholarshipScores"] = user_score["scores"]

    query = "SELECT * FROM c"
    params = []

    query, params = build_query(
        req, query, params, user, similarity_match=similarity_match
    )
    if not similarity_match:
        temp_query = "SELECT VALUE COUNT(1) FROM c" + query.split("FROM c")[1]
        num_returned = list(query_cosmos_db(temp_query, params, SCHOL_CONTAINER, True))[
            0
        ]

        query += " ORDER BY c.awardMax DESC"
        query += " OFFSET @offset LIMIT @limit"
        params.append({"name": "@offset", "value": int(offset)})
        params.append({"name": "@limit", "value": int(limit)})

    scholarships = list(query_cosmos_db(query, params, SCHOL_CONTAINER, True))
    # scholarships = [s["c"] for s in scholarships]

    # do sorting, offset and limit backend side if similarity match

    if similarity_match:
        scores = {score["scholId"]: score["score"] for score in user_score["scores"]}

        for scholarship in scholarships:
            scholarship["score"] = scores[scholarship["id"]]
        scholarships = sorted(scholarships, key=lambda x: x["score"], reverse=True)
        num_returned = len(scholarships)
        scholarships = scholarships[int(offset) : int(offset) + int(limit)]
    return func.HttpResponse(
        json.dumps({"scholarships": scholarships, "num_returned": num_returned}),
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


@schol_bp.route(route="get_scholarship_award_amounts", methods=["GET"])
@schol_bp.cosmos_db_input(
    arg_name="scores",
    database_name="CollegeHelperDB",
    container_name="SCORE",
    connection=cosmos_db_connection,
)
@schol_bp.cosmos_db_input(
    arg_name="user",
    database_name="CollegeHelperDB",
    container_name="USER",
    connection=cosmos_db_connection,
)
def get_scholarship_award_amounts(
    req: func.HttpRequest, scores: func.DocumentList, user: func.DocumentList
) -> func.HttpResponse:

    id = req.params.get("id") or None
    similarity_match = req.params.get("similarityMatch") == "true"
    user = next(iter([u.data for u in user if u.data["id"] == id]), None)
    user_score = next(iter([u.data for u in scores if u.data["userId"] == id]), None)

    if not user_score:
        similarity_match = False
        user["scholarshipScores"] = []
    else:
        user["scholarshipScores"] = user_score["scores"]

    min_query = "SELECT VALUE MIN(c.awardMin) FROM c"
    max_query = "SELECT VALUE MAX(c.awardMax) FROM c"
    min_params = []
    max_params = []

    min_query, min_params = build_query(
        req, min_query, min_params, similarity_match=similarity_match
    )
    max_query, max_params = build_query(
        req, max_query, max_params, similarity_match=similarity_match
    )

    try:
        min_amount = list(
            query_cosmos_db(min_query, min_params, SCHOL_CONTAINER, True)
        )[0]
        max_amount = list(
            query_cosmos_db(max_query, max_params, SCHOL_CONTAINER, True)
        )[0]
        return func.HttpResponse(
            json.dumps({"min": min_amount, "max": max_amount}),
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
        user = list(query_cosmos_db(query, params, USER_CONTAINER, True))
        if not user:
            return func.HttpResponse("Error: User not found", status_code=404)
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)

    if user[0].get("scholarshipScores"):
        user[0].pop("scholarshipScores")

    msg.set(json.dumps(user[0]))
    return func.HttpResponse(
        json.dumps({"success": True}), status_code=200, mimetype="application/json"
    )


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
def process_prediction_request(
    msg: func.QueueMessage,
    scholarships: func.DocumentList,
) -> None:
    if not msg or not msg.get_body() or not scholarships:
        return
    user = json.loads(msg.get_body().decode("utf-8"))

    scholarships = [s.data for s in scholarships]
    user_preds = append_scores(user, scholarships)
    user_preds = {pred[0]: pred[1] for pred in user_preds}

    # convert to list for stored procedure testing
    user_preds = [{"scholId": key, "score": value} for key, value in user_preds.items()]
    scores = {"userId": user["id"], "scores": user_preds}

    res = SCORE_CONTAINER.scripts.execute_stored_procedure(
        "checkIfUserExists", partition_key=user["id"], params=[user["id"]]
    )

    if res and isinstance(res, dict):
        res["scores"] = user_preds
        SCORE_CONTAINER.upsert_item(res)
    else:
        SCORE_CONTAINER.create_item(scores, enable_automatic_id_generation=True)
