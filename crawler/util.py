import csv
import urllib.request, json
import re
import datetime

### changes format from YYYYYMMDD to YYYYY-MM-DD
def dateFormatChanger(date, format1, format2):
    date = datetime.datetime.strptime(date, format1).strftime(format2)
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
    cleanTweet = re.sub(r'\\x\w+\w', '', tweet)
    cleanTweet = re.sub(r'(http|#|@)\S+', '', cleanTweet)
    cleanTweet = re.sub(r',', '', cleanTweet)
    return cleanTweet

def writeDictCSV(dict, outputFileName):
    with open(outputFileName, 'w') as csvfile:
        fileWriter = csv.writer(csvfile)
        for key, value in dict.items():
            fileWriter.writerow([key, value])
    return

def writeSentimentCSV(cryptoCrawler, outputFileName):
    with open(outputFileName, 'w') as csvfile:
        fileWriter = csv.writer(csvfile)
        fileWriter.writerow(["date/time", "tweet", "sentiment value"])
        listsMerged = zip(cryptoCrawler.dates, cryptoCrawler.tweets, cryptoCrawler.sentiment)
        for value in listsMerged:
            fileWriter.writerow(value)
    return

def writeHourlyCSV(cryptoCrawler, outputFileName):
    with open(outputFileName, 'w') as csvfile:
        fileWriter = csv.writer(csvfile)
        fileWriter.writerow(["hour", "price", "volume", "sentiment"])
        listsMerged = zip(cryptoCrawler.hourlyTime, cryptoCrawler.hourlyPrice, cryptoCrawler.hourlyVolume, [x[1] for x in cryptoCrawler.hourlySentiment])
        for value in listsMerged:
            fileWriter.writerow(value)
    return
