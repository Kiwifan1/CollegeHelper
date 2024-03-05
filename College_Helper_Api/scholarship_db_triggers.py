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

