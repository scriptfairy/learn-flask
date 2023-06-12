import os
from flask import Flask, jsonify, render_template, send_from_directory


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/build/<path:path>")
def static_build(path):
    return send_from_directory("../../build", path)


@app.route("/hello")
def hello():
    return "<p>Hello, Worldz!</p>"


@app.route("/nlsearch")
def nlsearch():
    import pandas as pd
    import nltk
    from nltk.sentiment import SentimentIntensityAnalyzer
    import json

    # Read the CSV file
    df = pd.read_csv("qa.csv")

    # Extract the comments and corresponding student IDs from the columns
    comments = df["generalComments"].astype(str)
    student_ids = df["studentID"].astype(str)

    # Initialize the SentimentIntensityAnalyzer
    sia = SentimentIntensityAnalyzer()

    # Define keywords related to being unhappy or struggling
    keywords = [
        "not completed AIM",
        "not aware of AIM",
        " not seen AIM",
    ]

    # Initialize lists to store student IDs
    aim_students = []

    # Analyze sentiment and check for keywords in each comment
    for comment, student_id in zip(comments, student_ids):
        sentiment_score = sia.polarity_scores(comment)
        for keyword in keywords:
            if keyword in comment.lower():
                if sentiment_score["compound"] < 0:
                    aim_students.append(student_id)

    # Count the number of unique unhappy and struggling students
    num_aim_students = len(set(aim_students))

    # Return the counts and the IDs of unhappy and struggling students to the client
    result = {
        "num_aim_students ==": num_aim_students,
        "aim_student_ids ==": aim_students,
    }
    return json.dumps(result)
