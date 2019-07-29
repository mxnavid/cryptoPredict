from flask import Flask, jsonify, request
import json
from textblob import TextBlob, Word, Blobber
app = Flask(__name__)

pol = 0.5
sub = 0.1
textInput = "I love bitcoin"


@app.route("/sentimentScore", methods=["GET"])
def sentimentGetter():
    result = {"text": textInput, "polarity": pol, "subjectivity": sub}
    return jsonify(result)


@app.route("/needScore", methods=["POST"])
def getSentiment():
    textInput = request.json["textFromUI"]
    blob = TextBlob(textInput)
    pol = blob.polarity
    sub = blob.sentiment.subjectivity
    result = {"text": textInput, "polarity": pol, "subjectivity": sub}
    return jsonify(result)


if __name__ == '__main__':
    app.run(port=8080)
