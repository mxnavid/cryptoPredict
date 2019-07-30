from flask import Flask, jsonify, request
import json
from textblob import TextBlob, Word, Blobber
app = Flask(__name__)

pol = 0.5
sub = 0.1
textInput = "I love bitcoin"
l1 = []
polar = []
subject = []


@app.route("/sentimentScore", methods=["GET"])
def sentimentGetter():
    result = {"text": l1[-1], "polarity": polar[-1], "subjectivity": subject[-1]}
    return jsonify(result)


@app.route("/needScore", methods=["POST"])
def getSentiment():
    textInput = request.json["textFromUI"]
    l1.append(textInput)
    blob = TextBlob(textInput)
    pol = blob.polarity
    polar.append(pol)
    sub = blob.sentiment.subjectivity
    subject.append(sub)
    result = {"text": textInput, "polarity": pol, "subjectivity": sub}
    return jsonify(result)


if __name__ == '__main__':
    app.run(port=8080)
