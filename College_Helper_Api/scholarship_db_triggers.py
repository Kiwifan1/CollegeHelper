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
    # TODO: build query based on req parameters

    try:
        scholarships = list(query_cosmos_db(query, params, CONTAINER, True))
        return func.HttpResponse(json.dumps(scholarships), status_code=200, mimetype="application/json")
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)
