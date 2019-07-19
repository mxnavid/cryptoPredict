import csv
import urllib.request, json
import re
import datetime
from datetime import timedelta
import pandas as pd
import os


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

def writeJs(inputFileName, outputFileName):
    val = pd.read_csv(inputFileName, header=0)
    with open(outputFileName, 'w') as f:
        f.write("module.exports = { hourly_data : ")
        f.write(val.to_json(orient='records'))
        f.write("}")

def convertTimeFile(inputFileName):
    pre, ext = os.path.splitext(inputFileName)
    df = pd.read_csv(inputFileName, header=None)
    outputFileName = pre + '1.csv'
    for index, row in df.iterrows():
        date = datetime.datetime.strptime(row[0], '%a %b %d %H:%M:%S +%f %Y')
        date += timedelta(hours = 4)
        df.iat[index, 0] = date.strftime('%a %b %d %H:%M:%S +%f %Y')
    df.to_csv(outputFileName, encoding='utf-8', header=None, index=False)

def writeFiles(coin, path):
    writeDFtoCSV(coin.dict['tweets'],
                 os.path.join(path, 'data/output/'+coin.dict['name']+'_tweet_output.csv'))
    print('Wrote ' + coin.dict['name'] +' tweet values to CSV')
    writeDFtoCSV(coin.dict['news'],
                 os.path.join(path, 'data/output/'+coin.dict['name']+'_news_output.csv'))
    print('Wrote ' + coin.dict['name'] +' news values to CSV')

    writeDFtoCSV(coin.dict['5min'],
                 os.path.join(path, 'data/output/'+coin.dict['name']+'_5min_output.csv'))
    print('Wrote ' + coin.dict['name'] +' 5 min value to CSV')

    writeDFtoCSV(coin.dict['daily'],
                 os.path.join(path, 'data/output/'+coin.dict['name']+'_daily_output.csv'))
    print('Wrote ' + coin.dict['name'] +' daily values to CSV')
