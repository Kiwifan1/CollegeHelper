import logging
import bcrypt
import uuid
import json
import azure.functions as func

from azure.cosmos import CosmosClient
from http import HTTPStatus

env_variables = json.load(open("local.settings.json"))
cosmos_connection_var = env_variables["Values"]["CosmosDBConnectionString"]
cosmos_client_readonly_key_var = env_variables["Values"]["CosmosClientReadonlyKey"]

user_bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"

CLIENT = CosmosClient.from_connection_string(
    cosmos_connection_var, credential=cosmos_client_readonly_key_var)
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

        outputDocument.set(func.Document.from_dict(user))
        return func.HttpResponse(f"User {user['username']} created successfully.", status_code=HTTPStatus.CREATED)
    else:
        return func.HttpResponse(
            "User creation failed. Please provide a username and password in the request body.",
            status_code=HTTPStatus.BAD_REQUEST
        )


@user_bp.route(route="login", methods=["POST"])
@user_bp.cosmos_db_input(arg_name="inputDocument", database_name="CollegeHelperDB", container_name="USER", connection=cosmos_db_connection)
def login(req: func.HttpRequest, inputDocument: func.DocumentList) -> func.HttpResponse:
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
        query = "SELECT password, salt FROM c WHERE c.username = @username"
        params = [{'name': '@username', 'value': user['username']}]
        items = query_cosmos_db(query, params, "USER")
        if items:
            if hash(user['password'], items[0]['salt']) == items[0]['password']:
                return {"loginSuccess": True}
            else:
                return {"loginSuccess": False}
    else:
        return func.HttpResponse(
            "Login failed. Please provide a username and password in the request body.",
            status_code=HTTPStatus.BAD_REQUEST
        )


@user_bp.route(route="check_user_exists", methods=["POST"])
@user_bp.cosmos_db_input(arg_name="inputDocument", database_name="CollegeHelperDB", container_name="USER", connection=cosmos_db_connection)
def check_user_exists(req: func.HttpRequest, inputDocument: func.DocumentList) -> func.HttpResponse:
    """This function takes a username from the request and checks if it exists in the database.

    Args:
        req (func.HttpRequest): the request object
        inputDocument (func.DocumentList): The CosmosDB input binding.

    Returns:
        func.HttpResponse: The response to the request.
    """
    logging.info('Python HTTP trigger function processed a request.')
    username = req.get_json()
    if username and 'username' in username:
        # check if username exists in database
        query = "SELECT * FROM c WHERE c.username = @username"
        params = [{'name': '@username', 'value': username['username']}]
        items = query_cosmos_db(query, params, "USER")
        return {"userExists": bool(items)}
    else:
        return func.HttpResponse(
            "username check failed. Please provide an username in the request body.",
            status_code=HTTPStatus.BAD_REQUEST
        )


def query_cosmos_db(query: str, params: list) -> list:
    """This function takes a query and returns the results of the query from the CosmosDB.

    Args:
        query (str): The query to be executed.
        params (list): The parameters for the query.

    Returns:
        list: The results of the query.
    """
    items = list(CONTAINER.query_items(query=query, parameters=params))
    return items
