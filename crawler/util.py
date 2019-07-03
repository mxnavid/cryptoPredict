import csv
import urllib.request, json
import re
import datetime


### changes format from X to Y ex) YYYYmmdd HH:MM to YYYYMMDD
def dateFormatChanger(date, format1, format2):
    date = datetime.datetime.strptime(date, format1).strftime(format2)
    return date

def readerCSV(fileName):
    fileReaderInput = csv.reader(open(fileName))
    return fileReaderInput

def readerJson(link):
    with urllib.request.urlopen(link) as url:
        data = json.loads(url.read().decode())
        return data

def cleanTweets(tweet):
    cleanTweet = re.sub(r'\\x\w+\w', '', tweet)
    cleanTweet = re.sub(r'(http|#|@)\S+', '', cleanTweet)
    cleanTweet = re.sub(r',', '', cleanTweet)
    return cleanTweet

def writeDFtoCSV(df, outputFileName):
    df.to_csv(outputFileName, encoding='utf-8', index=False)

def writeHourlyJson(inputFileName, outputFileName):
    with open(inputFileName) as f:
        reader = csv.reader(f, skipinitialspace=True)
        header = next(reader)
        dictionary = [dict(zip(header, map(str, row))) for row in reader]
    with open(outputFileName, 'w') as f:
        json.dump(dictionary, f)