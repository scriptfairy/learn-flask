from flask import Flask, render_template, send_from_directory, request, jsonify, g
from lib_openai import chat_completion

app = Flask(__name__)


@app.post("/api/chat")
def api_chat():
    request_data = request.get_json()
    text = request_data["text"]
    response = chat_completion(text)

    return jsonify(response)


@app.route("/api/surveys")
def api_surveys():
    surveys = [
        {"id": "abc123", "name": "Survey One"},
        {"id": "xyz", "name": "Survey Two"},
    ]
    return surveys


@app.route("/build/<path:path>")
def static_build(path):
    return send_from_directory("../../build", path)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return render_template("index.html")
