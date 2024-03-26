import logging
import bcrypt
import uuid
import json
import os
import azure.functions as func

from azure.core.paging import ItemPaged, PageIterator
from azure.cosmos import CosmosClient, ContainerProxy
from http import HTTPStatus
from user_db_triggers import CLIENT, DATABASE, query_cosmos_db, hash

from model.clustering import predict_scholarship_scores

schol_bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"
cosmos_readonly_key = "CosmosClientReadonlyKey"
CONTAINER = DATABASE.get_container_client("SCHOLARSHIP")


def handleRequirements(string_input):
    if string_input == "Yes":
        return True
    elif string_input == "No":
        return False
    else:
        return None


@schol_bp.route(route="get_scholarships", methods=["GET"])
def get_scholarships(req: func.HttpRequest) -> func.HttpResponse:
    query = "SELECT * FROM c"
    params = []
    # req will always have an offset and a limit
    offset = req.params.get("offset")
    limit = req.params.get("limit")

    if not offset or not limit:
        return func.HttpResponse("Error: Missing offset or limit", status_code=400)

    # for now added essayRequired, meritRequired, and needBased

    if handleRequirements(req.params.get("essayRequired")) != None:
        query += " WHERE c.isEssayRequired = @essayRequired"
        params.append(
            {
                "name": "@essayRequired",
                "value": handleRequirements(req.params.get("essayRequired")),
            }
        )

    if handleRequirements(req.params.get("meritBased")) != None:
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

    if handleRequirements(req.params.get("needBased")) != None:
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

    query += " OFFSET @offset LIMIT @limit"
    params.append({"name": "@offset", "value": int(offset)})
    params.append({"name": "@limit", "value": int(limit)})

    try:
        scholarships = list(query_cosmos_db(query, params, CONTAINER, True))
        return func.HttpResponse(
            json.dumps(scholarships), status_code=200, mimetype="application/json"
        )
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)


@schol_bp.route(route="get_scholarship", methods=["GET"])
def get_scholarship(req: func.HttpRequest) -> func.HttpResponse:
    scholarship_id = req.params.get("id")
    if not scholarship_id:
        return func.HttpResponse("Error: Missing scholarship id", status_code=400)

    query = "SELECT * FROM c WHERE c.id = @id"
    params = [{"name": "@id", "value": scholarship_id}]

    try:
        scholarship = list(query_cosmos_db(query, params, CONTAINER, True))
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
        num_scholarships = list(query_cosmos_db(query, params, CONTAINER, True))
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
@schol_bp.cosmos_db_output(
    arg_name="updatedUser",
    database_name="CollegeHelperDB",
    container_name="USER",
    connection=cosmos_db_connection,
)
def process_prediction_request(
    msg: func.QueueMessage,
    scholarships: func.DocumentList,
    updatedUser: func.Out[func.Document],
) -> None:
    if not msg or not msg.get_body() or not scholarships:
        return

    user = json.loads(msg.get_body().decode("utf-8"))
    scholarships = [s.data for s in scholarships]

    user_preds = predict_scholarship_scores(user, scholarships)

    # update user with new predictions
    user["scholarshipScores"] = user_preds
    updatedUser.set(user)

    logging.info(f"Updated user: {user}")
    pass
