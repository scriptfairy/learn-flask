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
    df = pd.read_csv("temp/qa.csv")

    # Extract the comments and corresponding student IDs from the columns
    comments = df["generalComments"].astype(str)
    student_ids = df["studentID"].astype(str)

    # Initialize the SentimentIntensityAnalyzer
    sia = SentimentIntensityAnalyzer()

    # Define keywords related to being unhappy or struggling
    keywords = [
        "never heard of AIM",
        "not aware of AIM",
        "not seen AIM",
        "AIM: Made aware of",
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


@app.route("/pert")
def pert():
    import torch
    from transformers import BertTokenizer, BertForSequenceClassification

    # Step 1: Prepare data
    comments = [
        "Students were reminded of completing their AIM Modules. Moreover, they were recommended to go through Learn2Learn.",
        "Student has not completed AIM (didn't know what it was).",
        "Student has started working on their AIM module",
        "the student has completed the AIM already.",
        "Student was unaware of AIM but is planning to do it soon.",
        "Student was not aware about AIM student was briefly explained what it is and to find it on Vuws.",
    ]
    labels = [1, 0, 1, 1, 0, 0]  # 1 for aware, 0 for not aware

    # Step 2: Tokenization
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

    # Step 3: Model Selection
    model = BertForSequenceClassification.from_pretrained(
        "bert-base-uncased", num_labels=2
    )

    # Step 4: Model Training
    inputs = tokenizer(comments, padding=True, truncation=True, return_tensors="pt")
    labels = torch.tensor(labels)

    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5)

    model.train()
    for epoch in range(5):  # Training for 5 epochs (you can adjust as needed)
        optimizer.zero_grad()
        outputs = model(**inputs, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()

    # Step 5: Inference
    test_comment = "The student mentioned completing the AIM module."
    test_input = tokenizer(
        test_comment, padding=True, truncation=True, return_tensors="pt"
    )
    model.eval()
    with torch.no_grad():
        outputs = model(**test_input)
        predicted_label = torch.argmax(outputs.logits).item()

    if predicted_label == 1:
        return "The student is aware of AIM."
    else:
        return "The student is not aware of AIM."
