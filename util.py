import csv
import urllib.request, json
import re
import numpy as np

### changes format from YYYYYMMDD to YYYYY-MM-DD
def dateFormatChanger(YYYYMMDD):
    date = YYYYMMDD[0:4] + "-" + YYYYMMDD[4:6] + "-" + YYYYMMDD[6:]
    return date

def readerCSV(fileName):
    fileReaderInput = csv.reader(open(fileName))
    return fileReaderInput

def readerJson(link):
    with urllib.request.urlopen(link) as url:
        data = json.loads(url.read().decode())
        #print(data)
        return data

def cleanTweets(tweet):
    # TODO FIX THIS
    cleanTweet = re.sub(r'(\\x)+\w+\w', '', tweet)
    cleanTweet = re.sub(r'(#)+\w+', '', cleanTweet)
    return cleanTweet

def writeCSV(cryptoCrawler, outputFileName):
    with open(outputFileName, 'w') as csvfile:
        fileWriter = csv.writer(csvfile)
        fileWriter.writerow(["tweet","sentiment value"])
        listsMerged = mergeTwo(cryptoCrawler.tweets, cryptoCrawler.sentiment)
        for value in listsMerged:
            fileWriter.writerow(value)
    return

def mergeTwo(list1, list2):
    merged = np.column_stack([list1, list2])
    return merged
