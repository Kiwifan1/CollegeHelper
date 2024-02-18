import azure.functions as func
import logging
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)
cosmos_db_connection = "CosmosDBConnectionString"


@app.route(route="http_trigger")
def http_trigger(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    else:
        return func.HttpResponse(
            "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
            status_code=200
        )


@app.route(route="test_doc_output")
@app.queue_output(arg_name="msg", queue_name="outqueue", connection="AzureWebJobsStorage")
@app.cosmos_db_output(arg_name="outputDocument", database_name="test_db", container_name="test", connection=cosmos_db_connection)
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


@app.queue_trigger(arg_name="msg",
                   queue_name="outqueue",
                   connection="AzureWebJobsStorage")
@app.cosmos_db_input(arg_name="inputDocument",
                     database_name="test_db",
                     container_name="test",
                     connection=cosmos_db_connection)
@app.cosmos_db_output(arg_name="outputDocument",
                      database_name="test_db",
                      container_name="test",
                      connection=cosmos_db_connection)
def test_doc_input(msg: func.QueueMessage, inputDocument: func.DocumentList, outputDocument: func.Out[func.Document]) -> None:
    document = inputDocument[0]
    document['text'] = 'updated'
    outputDocument.set(document)


@app.route(route="increment/{number}", methods=["GET"])
def increment(req: func.HttpRequest) -> func.HttpResponse:
    if not req.route_params.get('number') or not req.route_params.get('number').isdigit():
        return func.HttpResponse("Please provide a number in the URL", status_code=400)
    number = int(req.route_params.get('number'))
    response = {
        "value": number + 1
    }
    return func.HttpResponse(json.dumps(response), status_code=200)


@app.route(route="getAge", methods=["POST"])
def get_age(req: func.HttpRequest) -> func.HttpResponse:
    if not req.get_json():
        return func.HttpResponse("Please provide a name and age in the request body", status_code=400)
    req_body = req.get_json()
    name = req_body.get('name')
    age = req_body.get('age')

    response = {
        "name": name,
        "age": age + 1
    }
    return func.HttpResponse(json.dumps(response), status_code=200)
