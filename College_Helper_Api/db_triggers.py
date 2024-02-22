import logging
import azure.functions as func

bp = func.Blueprint()
cosmos_db_connection = "CosmosDBConnectionString"


@bp.route(route="test_doc_output")
@bp.queue_output(arg_name="msg", queue_name="outqueue", connection="AzureWebJobsStorage")
@bp.cosmos_db_output(arg_name="outputDocument", database_name="test_db", container_name="test", connection=cosmos_db_connection)
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


@bp.queue_trigger(arg_name="msg",
                  queue_name="outqueue",
                  connection="AzureWebJobsStorage")
@bp.cosmos_db_input(arg_name="inputDocument",
                    database_name="test_db",
                    container_name="test",
                    connection=cosmos_db_connection)
@bp.cosmos_db_output(arg_name="outputDocument",
                     database_name="test_db",
                     container_name="test",
                     connection=cosmos_db_connection)
def test_doc_input(msg: func.QueueMessage, inputDocument: func.DocumentList, outputDocument: func.Out[func.Document]) -> None:
    document = inputDocument[0]
    document['text'] = 'updated'
    outputDocument.set(document)
