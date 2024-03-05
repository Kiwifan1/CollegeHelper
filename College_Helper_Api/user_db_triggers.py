import logging
import bcrypt
import uuid
import json
import os
import azure.functions as func

from azure.core.paging import ItemPaged, PageIterator
from azure.cosmos import CosmosClient, ContainerProxy
from http import HTTPStatus

user_bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"
cosmos_readonly_key = "CosmosClientReadonlyKey"

CLIENT = CosmosClient.from_connection_string(
    os.environ[cosmos_db_connection], credential=os.environ[cosmos_readonly_key])
DATABASE = CLIENT.get_database_client("CollegeHelperDB")
CONTAINER = DATABASE.get_container_client("USER")


def salt_and_hash(password: str) -> str:
    """This function takes a password and returns a salt and password hashed with the salt.

    Args:
        password (str): The password to be hashed.

    Returns:
        str: The salt.
        str: The hashed password.
    """
    salt = bcrypt.gensalt().decode('utf-8')
    hashed = bcrypt.hashpw(password.encode(), salt.encode()).decode()
    return salt, hashed


def hash(password: str, salt: str) -> str:
    """This function takes a password and salt and returns the hashed password.

    Args:
        password (str): The password to be hashed.
        salt (str): The salt to be used.

    Returns:
        str: The hashed password.
    """
    return bcrypt.hashpw(password.encode(), salt.encode()).decode()


@user_bp.route(route="test_doc_output")
@user_bp.queue_output(arg_name="msg", queue_name="outqueue", connection="AzureWebJobsStorage")
@user_bp.cosmos_db_output(arg_name="outputDocument", database_name="CollegeHelperDB", container_name="TEST", connection=cosmos_db_connection)
def test_doc_output(req: func.HttpRequest, msg: func.Out[func.QueueMessage],
                    outputDocument: func.Out[func.Document]) -> func.HttpResponse:
    """This function takes a name from the request and adds it to a CosmosDB container and a queue.

    Args:
        req (func.HttpRequest): The request object.
        msg (func.Out[func.QueueMessage]): The queue message output binding.
        outputDocument (func.Out[func.Document]): The CosmosDB output binding.

    Returns:
        func.HttpResponse: The response to the request.
    """
    logging.info('Python test_doc_output function processed a request.')
    logging.info(
        'Python CosmosDB output binding function processed a request.')
    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')
    if name:
        outputDocument.set(func.Document.from_dict({'id': name}))
        msg.set(name)
        return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    else:
        return func.HttpResponse(
            "This HTTP triggered function executed unsuccessfully. Pass a name in the query string or in the request body for a personalized response.",
            status_code=HTTPStatus.BAD_REQUEST
        )


@user_bp.route(route="create_user", methods=["POST"])
@user_bp.cosmos_db_output(arg_name="outputDocument", database_name="CollegeHelperDB", container_name="USER", connection=cosmos_db_connection)
def create_user(req: func.HttpRequest, outputDocument: func.Out[func.Document]) -> func.HttpResponse:
    """This function takes a user from the request and adds it to a CosmosDB container.

    Args:
        req (func.HttpRequest): The request object.
        outputDocument (func.Out[func.Document]): The CosmosDB output binding.

    Returns:
        func.HttpResponse: The response to the request.
    """
    logging.info('Python HTTP create_user function processed a request.')
    # get user from request and convert to User class
    user = req.get_json()
    if user and 'username' in user and 'password' in user:
        # create user
        salt, hashed = salt_and_hash(user['password'])
        user['salt'] = salt
        user['password'] = hashed
        user['id'] = str(uuid.uuid4())
        try:
            outputDocument.set(func.Document.from_dict(user))
            return func.HttpResponse(json.dumps(user), status_code=HTTPStatus.CREATED, mimetype="application/json")
        except:
            return func.HttpResponse(
                "User creation failed. Please try again later.",
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY
            )
    else:
        return func.HttpResponse(
            "User creation failed. Please provide a username and password in the request body.",
            status_code=HTTPStatus.BAD_REQUEST
        )


@user_bp.route(route="update_user", methods=["PUT"])
@user_bp.cosmos_db_output(arg_name="outputDocument", database_name="CollegeHelperDB", container_name="USER", connection=cosmos_db_connection)
def update_user(req: func.HttpRequest, outputDocument: func.Out[func.Document]) -> func.HttpResponse:
    """This function takes a user from the request and updates it in a CosmosDB container.

    Args:
        req (func.HttpRequest): The request object.
        outputDocument (func.Out[func.Document]): The CosmosDB output binding.

    Returns:
        func.HttpResponse: The response to the request.
    """
    logging.info('Python HTTP update_user function processed a request.')
    user = req.get_json()
    if user and 'username' in user and 'password' in user and 'salt' in user:
        try:
            query = "SELECT * FROM c where c.username = @username AND c.password = @password"
            potential_pass = hash(user['password'], user['salt'])
            params = [{'name': '@username', 'value': user['username']},
                      {'name': '@password', 'value': potential_pass}]
            items = query_cosmos_db(query, params, CONTAINER)
            # check if items has any elements:
            if items.next():
                user['password'] = potential_pass
                outputDocument.set(func.Document.from_dict(user))
                return func.HttpResponse(json.dumps(user), status_code=HTTPStatus.OK, mimetype="application/json")
        except:
            return func.HttpResponse(
                "User update failed. Please try again later.",
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
    else:
        return func.HttpResponse(
            "User update failed. Please provide an id in the request body.",
            status_code=HTTPStatus.BAD_REQUEST
        )


@user_bp.route(route="login", methods=["POST"])
def login(req: func.HttpRequest) -> func.HttpResponse:
    """This function takes a user from the request and checks if it exists in the database.

    Args:
        req (func.HttpRequest): The request object.
        inputDocument (func.DocumentList): The CosmosDB input binding.

    Returns:
        func.HttpResponse: The response to the request.
    """
    logging.info('Python HTTP trigger function processed a request.')
    user = req.get_json()
    if user and 'password' in user and 'username' in user:
        # find user in database
        query = "SELECT * FROM c WHERE c.username = @username"
        params = [{'name': '@username', 'value': user['username']}]
        items = query_cosmos_db(query, params, CONTAINER)
        for item in items:  # only one item should be returned, so we can just get the first item
            # get the first item
            if hash(user['password'], item['salt']) == item['password']:
                item.pop('password')
                return func.HttpResponse(json.dumps(item), status_code=HTTPStatus.OK, mimetype="application/json")
            else:
                return func.HttpResponse(
                    {'loginSuccess': False},
                    status_code=HTTPStatus.UNAUTHORIZED,
                    mimetype="application/json"
                )
    else:
        return func.HttpResponse(
            "Login failed. Please provide a username and password in the request body.",
            status_code=HTTPStatus.BAD_REQUEST
        )


@user_bp.route(route="check_user_exists", methods=["POST"])
def check_user_exists(req: func.HttpRequest) -> func.HttpResponse:
    """This function takes a username from the request and checks if it exists in the database.

    Args:
        req (func.HttpRequest): the request object
        inputDocument (func.DocumentList): The CosmosDB input binding.

    Returns:
        func.HttpResponse: The response to the request.
    """
    logging.info('Python HTTP trigger function processed a request.')
    user_info = req.get_json()
    if user_info and 'username' in user_info and 'email' in user_info:
        # check if username exists in database
        query = "SELECT * FROM c WHERE c.username = @username OR c.email = @email"
        params = [{'name': '@username', 'value': user_info['username']},
                  {'name': '@email', 'value': user_info['email']}]
        items = query_cosmos_db(query, params, CONTAINER, cross_part=True)
        if list(items) != []:
            return func.HttpResponse(json.dumps({'userExists': True}), status_code=HTTPStatus.FORBIDDEN, mimetype="application/json")
        else:
            return func.HttpResponse(json.dumps({'userExists': False}), status_code=HTTPStatus.OK, mimetype="application/json")
    else:
        return func.HttpResponse(
            "username check failed. Please provide an username in the request body.",
            status_code=HTTPStatus.BAD_REQUEST
        )


def query_cosmos_db(query: str, params: list, container: ContainerProxy, cross_part=False) -> ItemPaged:
    """This function takes a query and returns the results of the query from the CosmosDB.

    Args:
        query (str): The query to be executed.
        params (list): The parameters for the query.
        container (ContainerProxy): The container to query from.
        cross_part (bool, optional): Whether the query is cross partition. Defaults to False.

    Returns:
        ItemPaged: The results of the query.
    """

    items = container.query_items(
        query=query,
        parameters=params,
        enable_cross_partition_query=cross_part if cross_part else None
    )

    return items
