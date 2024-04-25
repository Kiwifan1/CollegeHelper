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

highschool_bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"
cosmos_readonly_key = "CosmosClientReadonlyKey"
SCHOOL_CONTAINER = DATABASE.get_container_client("HIGHSCHOOL")


@highschool_bp.route("get_highschool", methods=["GET"])
def get_highschool(req: func.HttpRequest) -> func.HttpResponse:
    query = "SELECT * FROM c WHERE c.code = @code"
    params = [{"name": "@code", "value": req.params.get("code")}]
    try:
        highschool = list(query_cosmos_db(query, params, SCHOOL_CONTAINER))
        return func.HttpResponse(
            json.dumps(highschool, indent=4),
            status_code=HTTPStatus.OK,
            mimetype="application/json",
        )
    except Exception as e:
        return func.HttpResponse(str(e), status_code=HTTPStatus.INTERNAL_SERVER_ERROR)


@highschool_bp.route("get_highschools", methods=["GET"])
def get_highschools(req: func.HttpRequest) -> func.HttpResponse:
    state = req.params.get("state")
    offset = req.params.get("offset")
    limit = req.params.get("limit")

    query = "SELECT * FROM c WHERE c.state = @state OFFSET @offset LIMIT @limit"
    params = [
        {"name": "@state", "value": state},
        {"name": "@offset", "value": int(offset)},
        {"name": "@limit", "value": int(limit)},
    ]

    try:
        highschools = list(
            query_cosmos_db(query, params, SCHOOL_CONTAINER, cross_part=True)
        )
        return func.HttpResponse(
            json.dumps(highschools, indent=4),
            status_code=HTTPStatus.OK,
            mimetype="application/json",
        )
    except Exception as e:
        return func.HttpResponse(str(e), status_code=HTTPStatus.INTERNAL_SERVER_ERROR)
