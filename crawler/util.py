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
        fileWriter.writerow(["hour", "open", "close", "high", "low", "volumeCoin", "volumeUSD", "sentiment"])
        listsMerged = zip(cryptoCrawler.hourlyTime, cryptoCrawler.hourlyOpen, cryptoCrawler.hourlyClose, cryptoCrawler.hourlyHigh,
                          cryptoCrawler.hourlyLow, cryptoCrawler.hourlyVolumeCoin, cryptoCrawler.hourlyVolumeUSD, [x[1] for x in cryptoCrawler.hourlySentiment])
        for value in listsMerged:
            fileWriter.writerow(value)
    return

def writeHourlyJson(inputFileName, outputFileName):
    with open(inputFileName) as f:
        reader = csv.reader(f, skipinitialspace=True)
        header = next(reader)
        dictionary = [dict(zip(header, map(str, row))) for row in reader]
    with open(outputFileName, 'w') as f:
        json.dump(dictionary, f)