import os
from flask import Flask, render_template, send_from_directory


app = Flask(__name__)


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
