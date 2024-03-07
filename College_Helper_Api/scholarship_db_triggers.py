import logging
import bcrypt
import uuid
import json
import os
import azure.functions as func

from azure.core.paging import ItemPaged, PageIterator
from azure.cosmos import CosmosClient, ContainerProxy
from http import HTTPStatus
from user_db_triggers import CLIENT, DATABASE, query_cosmos_db

schol_bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"
cosmos_readonly_key = "CosmosClientReadonlyKey"
CONTAINER = DATABASE.get_container_client("SCHOLARSHIP")


@schol_bp.route(route="get_scholarships", methods=["GET"])
def get_scholarships(req: func.HttpRequest) -> func.HttpResponse:
    query = "SELECT * FROM c"
    params = []
    # req will always have an offset and a limit
    offset = req.params.get("offset")
    limit = req.params.get("limit")

    if not offset or not limit:
        return func.HttpResponse("Error: Missing offset or limit", status_code=400)

    query += " OFFSET @offset LIMIT @limit"
    params.append({"name": "@offset", "value": int(offset)})
    params.append({"name": "@limit", "value": int(limit)})

    try:
        scholarships = list(query_cosmos_db(query, params, CONTAINER, True))
        return func.HttpResponse(json.dumps(scholarships), status_code=200, mimetype="application/json")
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
        return func.HttpResponse(json.dumps(scholarship[0]), status_code=200, mimetype="application/json")
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)


@schol_bp.route(route="get_num_scholarships", methods=["GET"])
def get_num_scholarships(req: func.HttpRequest) -> func.HttpResponse:
    query = "SELECT VALUE COUNT(1) FROM c"
    params = []

    try:
        num_scholarships = list(query_cosmos_db(
            query, params, CONTAINER, True))
        # get length of list
        return func.HttpResponse(json.dumps({"length": num_scholarships[0]}), status_code=200, mimetype="application/json")
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)
