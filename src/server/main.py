import os
import openai
from flask import Flask, render_template, send_from_directory, request, jsonify


app = Flask(__name__)


@app.post("/api/chat")
def api_chat():
    openai_api_key = os.getenv("OPENAI_API_KEY")
    assert openai_api_key is not None, "OpenAI API key not found."

    openai.api_key = openai_api_key

    request_data = request.get_json()
    text = request_data["text"]

    model = "gpt-3.5-turbo"
    messages = [{"role": "user", "content": text}]
    temperature = 0.7

    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature,
    )

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
