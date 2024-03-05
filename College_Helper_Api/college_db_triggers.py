import logging
import bcrypt
import uuid
import json
import os
import azure.functions as func


from azure.cosmos import CosmosClient
from http import HTTPStatus
from user_db_triggers import CLIENT, DATABASE, query_cosmos_db

college_bp = func.Blueprint()

cosmos_db_connection = "CosmosDBConnectionString"
cosmos_readonly_key = "CosmosClientReadonlyKey"
CONTAINER = DATABASE.get_container_client("COLLEGE")

@college_bp.route(route="get_colleges", methods=["GET"])
def get_colleges(req: func.HttpRequest) -> func.HttpResponse:
    query = "SELECT * FROM c"

    # build query based on req parameters
    # params: name, location, rating, page, limit, sort,
    params = []

    if req.params.get('name'):
        query += f" WHERE c.name = @name AND"
        params.append({"name": "name", "value": req.params.get('name')})
    if req.params.get('location'):
        query += f" WHERE c.location = @location AND"
        params.append(
            {"name": "location", "value": req.params.get('location')})
    if req.params.get('rating'):
        query += f" WHERE c.rating = @rating AND"
        params.append({"name": "rating", "value": req.params.get('rating')})

    # remove trailing AND
    if query.endswith("AND"):
        query = query[:-3]

    if req.params.get('sort'):
        query += f" ORDER BY @sort"
        params.append({"name": "sort", "value": req.params.get('sort')})
    if req.params.get('page'):
        query += f" OFFSET @page"
        params.append({"name": "page", "value": int(req.params.get('page'))})
    if req.params.get('limit'):
        query += f" LIMIT @limit"
        params.append({"name": "limit", "value": int(req.params.get('limit'))})

    # execute query
    try:
        colleges = list(query_cosmos_db(query, params, CONTAINER, True))
        return func.HttpResponse(json.dumps(colleges), status_code=200, mimetype="application/json")
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)
