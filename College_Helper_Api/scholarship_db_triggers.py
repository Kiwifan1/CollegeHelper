import logging
import bcrypt
import uuid
import json
import os
import azure.functions as func
from pypika import Query, Table, Field, CustomFunction, functions as fn, Order, queries
import pypika

from azure.core.paging import ItemPaged, PageIterator
from azure.cosmos import CosmosClient, ContainerProxy
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
    sort_by_match = req.params.get("sort_by_match") or False
    essay_required = req.params.get("essayRequired") or None
    merit_based = req.params.get("meritBased") or None
    need_based = req.params.get("needBased") or None

    # adding the predictive list ordering and filtering
    if sort_by_match:
        # start query with creating a list of scholarships from the user

        scores = user["scholarshipScores"]
        if not scores:
            return Exception("Error: Missing scores")

        schol_ids = [score[0] for score in scores]

        query += " WHERE c.id IN ("
        for i in range(len(schol_ids)):
            query += f"@id{i}"
            if i != len(schol_ids) - 1:
                query += ", "
            params.append({"name": f"@id{i}", "value": schol_ids[i]})
        query += ")"

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

    return query, params


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
    query = "SELECT * FROM c"
    params = []

    id = req.params.get("id")
    user = [u.data for u in user if u.data["id"] == id][0]
    # req will always have an offset and a limit
    offset = req.params.get("offset")
    limit = req.params.get("limit")

    if not offset or not limit:
        return func.HttpResponse("Error: Missing offset or limit", status_code=400)

    query, params = build_query(req, query, params, user)

    sort_by_match = req.params.get("sort_by_match") or False

    if sort_by_match == "true":
        scholarships = list(query_cosmos_db(query, params, SCHOL_CONTAINER, True))

        scores = user["scholarshipScores"]
        schol_ids = [score[0] for score in scores]
        schol_scores = [score[1] for score in scores]

        scholarships = sorted(
            scholarships,
            key=lambda x: (schol_ids.index(x["id"])),
        )

        # perform manual offset and limit
        scholarships = scholarships[int(offset) : int(offset) + int(limit)]

        # add score to scholarship
        for scholarship in scholarships:
            scholarship["score"] = schol_scores[schol_ids.index(scholarship["id"])]
        return func.HttpResponse(
            json.dumps(scholarships), status_code=200, mimetype="application/json"
        )

    else:
        query += " OFFSET @offset LIMIT @limit"
        params.append({"name": "@offset", "value": int(offset)})
        params.append({"name": "@limit", "value": int(limit)})

        try:
            scholarships = list(query_cosmos_db(query, params, SCHOL_CONTAINER, True))
            return func.HttpResponse(
                json.dumps(scholarships), status_code=200, mimetype="application/json"
            )
        except Exception as e:
            return func.HttpResponse(f"Error: {str(e)}", status_code=500)


def handle_sort_by_match(scores, query, params):
    # scores is an object set up like {user_id: <id>, scores: [{schol_id: <id>, score: <score>}]}
    # the scores should already be sorted from highest to lowest, so we can just iterate through them, and add to the query
    schol_ids = [score["schol_id"] for score in scores["scores"]]

    # parameterize the list of ids
    query += " WHERE c.id IN ("
    for i in range(len(schol_ids)):
        query += f"@id{i}"
        if i != len(schol_ids) - 1:
            query += ", "
        params.append({"name": f"@id{i}", "value": schol_ids[i]})
    query += ")"

    # ensure that the order of the scholarships is the same as the order of the scores
    query += " ORDER BY c.id IN ("
    for i in range(len(schol_ids)):
        query += f"@id{i}"
        if i != len(schol_ids) - 1:
            query += ", "
        params.append({"name": f"@id{i}", "value": schol_ids[i]})
    query += ") DESC"

    return query, params


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
def get_num_scholarships(req: func.HttpRequest) -> func.HttpResponse:
    query = "SELECT VALUE COUNT(1) FROM c"
    params = []

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
@schol_bp.cosmos_db_input(
    arg_name="scores",
    database_name="CollegeHelperDB",
    container_name="SCORES",
    connection=cosmos_db_connection,
)
def process_prediction_request(
    msg: func.QueueMessage,
    scholarships: func.DocumentList,
    scores: func.DocumentList,
) -> None:
    if not msg or not msg.get_body() or not scholarships:
        return
    user = json.loads(msg.get_body().decode("utf-8"))

    scholarships = [s.data for s in scholarships]
    scholarships_dict = dict((s["id"], s) for s in scholarships)

    scores = [s.data for s in scores]
    scores_dict = dict((s["scholarshipId"], s) for s in scores)
    score_ids = set(s["id"] for s in scores)

    #
    user_preds = append_scores(user, scholarships)
    user["scholarshipScores"] = user_preds
    USER_CONTAINER.upsert_item(user)

    # # create new score document and add it to db if it doesn't exist
    # # if it does exist, add to the 'scores' list
    # updated_scores = []
    # updated_scholarships = []
    # for schol_id, score in user_preds:
    #     new_score = {}
    #     if schol_id in scores_dict:
    #         new_score = scores_dict[schol_id]
    #         new_score["scores"].append(score)
    #     else:  # starts off inefficient, but as more get added it will be faster, and eventually never run
    #         new_score = {
    #             "id": str(uuid.uuid4()),
    #             "scholarshipId": schol_id,
    #             "scores": [score],
    #         }

    #         SCORE_CONTAINER.create_item(new_score)
    #         logging.info(f"Added new score: {new_score['id']}")
    #         scores_dict[schol_id] = new_score
    #     updated_scores.append(new_score)

    #     schol = scholarships_dict[schol_id]

    #     if "similarityId" not in schol or schol["similarityId"] not in score_ids:
    #         schol["similarityId"] = new_score["id"]
    #         updated_scholarships.append(schol)
    #         logging.info(f"Updated scholarship: {schol_id}")
    #         SCHOL_CONTAINER.upsert_item(schol)

    # def prep_update_score_prediction():
    #     query = "UPDATE c SET c.scores = CASE c.scholarshipId"

    #     for i, score in enumerate(updated_scores):
    #         query += f" WHEN '{score['scholarshipId']}' THEN @scores_{i}"
    #     query += " ELSE c.scores END WHERE c.scholarshipId IN ("

    #     for i, score in enumerate(updated_scores):
    #         query += f"@schol_id_{i}"
    #         if i != len(updated_scores) - 1:
    #             query += ", "
    #     query += ")"

    #     params = [
    #         {"name": "@new_scores", "value": updated_scores},
    #     ]
    #     for i, score in enumerate(updated_scores):
    #         params.append({"name": f"@scores_{i}", "value": score})
    #         params.append({"name": f"@schol_id_{i}", "value": score["scholarshipId"]})
    #     return query, params

    # query, params = prep_update_score_prediction()
