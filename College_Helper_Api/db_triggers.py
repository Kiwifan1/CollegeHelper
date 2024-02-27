import logging
import bcrypt
import azure.functions as func

bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"


def salt_and_hash(password: str) -> str:
    salt = bcrypt.gensalt().decode('utf-8')
    hashed = bcrypt.hashpw(password.encode(), salt.encode()).decode()
    return salt, hashed


@bp.route(route="test_doc_output")
@bp.queue_output(arg_name="msg", queue_name="outqueue", connection="AzureWebJobsStorage")
@bp.cosmos_db_output(arg_name="outputDocument", database_name="CollegeHelperDB", container_name="TEST", connection=cosmos_db_connection)
def test_doc_output(req: func.HttpRequest, msg: func.Out[func.QueueMessage],
                    outputDocument: func.Out[func.Document]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
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
            status_code=400
        )


# @bp.queue_trigger(arg_name="msg",
#                   queue_name="outqueue",
#                   connection="AzureWebJobsStorage")
# @bp.cosmos_db_input(arg_name="inputDocument",
#                     database_name="CollegeHelperDB",
#                     container_name="TEST",
#                     connection=cosmos_db_connection)
# @bp.cosmos_db_output(arg_name="outputDocument",
#                      database_name="CollegeHelperDB",
#                      container_name="TEST",
#                      connection=cosmos_db_connection)
# def test_doc_input(msg: func.QueueMessage, inputDocument: func.DocumentList, outputDocument: func.Out[func.Document]) -> None:
#     document = inputDocument[0]
#     document['text'] = 'updated'
#     outputDocument.set(document)


@bp.route(route="create_user")
@bp.cosmos_db_output(arg_name="outputDocument", database_name="CollegeHelperDB", container_name="USER", connection=cosmos_db_connection)
def create_user(req: func.HttpRequest, outputDocument: func.Out[func.Document]) -> func.HttpResponse:
    logging.info('Python HTTP create_user function processed a request.')
    # get user from request and convert to User class
    user = req.get_json()
    if user and 'username' in user and 'password' in user:
        # create user
        salt, hashed = salt_and_hash(user['password'])
        user['salt'] = salt
        user['password'] = hashed
        user['id'] = user['username']

        outputDocument.set(func.Document.from_dict(user))
        return func.HttpResponse(f"User {user['username']} created successfully.", status_code=201)
    else:
        return func.HttpResponse(
            "User creation failed. Please provide a username and password in the request body.",
            status_code=400
        )


@bp.route(route="login")
@bp.cosmos_db_input(arg_name="inputDocument", database_name="CollegeHelperDB", container_name="USER", connection=cosmos_db_connection)
def login(req: func.HttpRequest, inputDocument: func.DocumentList) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    user = req.get_json()
    if user and 'password' in user and 'username' in user:
        # find user in database
        for doc in inputDocument:
            if doc['username'] == user['username']:
                # check if password is correct
                hashed = bcrypt.hashpw(
                    user['password'].encode('utf-8'), doc['salt'].encode('utf-8')).decode('utf-8')
                if hashed == doc['password']:
                    return func.HttpResponse(f"Login successful.")
                else:
                    return func.HttpResponse(f"Login failed.")
        return func.HttpResponse(f"Login failed.")
    else:
        return func.HttpResponse(
            "Login failed. Please provide a username and password in the request body.",
            status_code=400
        )
