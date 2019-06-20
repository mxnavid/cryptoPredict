import csv
from textblob import TextBlob

def readerCSV():
    fileReaderInput = csv.reader(open("input1.csv"))
    for rows in fileReaderInput:
        analysis(rows[0])
        break


def analysis(tweet):
    blob = TextBlob(tweet)
    print(blob.sentiment.polarity)


readerCSV()