import azure.functions as func
import logging
import json
from user_db_triggers import user_bp
from college_db_triggers import college_bp
from scholarship_db_triggers import schol_bp
from highschool_db_triggers import highschool_bp

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# blueprints
app.register_blueprint(user_bp)
app.register_blueprint(college_bp)
app.register_blueprint(schol_bp)
app.register_blueprint(highschool_bp)

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