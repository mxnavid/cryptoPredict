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


@app.route("/sentimentScore/text", methods=["GET"])
def textGetter():
    return l1[-1]

@app.route("/sentimentScore/polarity", methods=["GET"])
def polarityGetter():
    return str( polar[-1])

@app.route("/sentimentScore/subjectivity", methods=["GET"])
def subjectivityGetter():
    return str(subject[-1])


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
    return "Successfully Processed"


if __name__ == '__main__':
    app.run(port=8080)
