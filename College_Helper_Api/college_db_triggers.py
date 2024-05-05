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
    try:
        query = "SELECT * FROM c"

        # build query based on req parameters
        # params: name, location, rating, page, limit, sort,
        params = []
        offset = req.params.get("offset")
        limit = req.params.get("limit")

        if not offset or not limit:
            return func.HttpResponse("Error: Missing offset or limit", status_code=400)

        if req.params.get("name"):
            query += f" WHERE c.name = @name AND"
            params.append({"name": "name", "value": req.params.get("name")})
        if req.params.get("location"):
            query += f" WHERE c.location = @location AND"
            params.append({"name": "location", "value": req.params.get("location")})
        if req.params.get("rating"):
            query += f" WHERE c.rating = @rating AND"
            params.append({"name": "rating", "value": req.params.get("rating")})

        # remove trailing AND
        if query.endswith("AND"):
            query = query[:-3]

        if req.params.get("sort"):
            query += f" ORDER BY @sort"
            params.append({"name": "sort", "value": req.params.get("sort")})

        query += " OFFSET @offset LIMIT @limit"
        params.append({"name": "@offset", "value": int(offset)})
        params.append({"name": "@limit", "value": int(limit)})

        # execute query
        try:
            colleges = list(query_cosmos_db(query, params, CONTAINER, True))
            return func.HttpResponse(
                json.dumps(colleges), status_code=200, mimetype="application/json"
            )
        except Exception as e:
            return func.HttpResponse(f"Error: {str(e)}", status_code=500)
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)


@college_bp.route(route="get_colleges_by_name", methods=["GET"])
def get_colleges_by_name(req: func.HttpRequest) -> func.HttpResponse:
    try:
        query = "SELECT * FROM c WHERE CONTAINS(c.name, @partial, true)"

        # build query based on req parameters
        # params: name
        params = []
        if not req.params.get("name"):
            return func.HttpResponse("Error: Missing name", status_code=400)

        params.append({"name": "@partial", "value": req.params.get("name")})
        # execute query
        try:
            colleges = list(query_cosmos_db(query, params, CONTAINER, True))
            return func.HttpResponse(
                json.dumps(colleges), status_code=200, mimetype="application/json"
            )
        except Exception as e:
            return func.HttpResponse(f"Error: {str(e)}", status_code=500)
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)


@college_bp.route(route="get_best_college", methods=["GET"])
def get_best_college(req: func.HttpRequest) -> func.HttpResponse:
    try:
        # TODO: Implement this function
        return func.HttpResponse("Not Implemented", status_code=501)
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)
