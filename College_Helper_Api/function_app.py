import azure.functions as func
import logging
import json
from College_Helper_Api.user_db_triggers import user_bp

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# blueprints
app.register_blueprint(user_bp)

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
