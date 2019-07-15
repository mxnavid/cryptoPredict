import twitter
from t import ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET
import json
import csv
import re
import time
from textblob import TextBlob, Word, Blobber
import logging
import datetime

sleepTime = 5
api = twitter.Api(CONSUMER_KEY,
                  CONSUMER_SECRET,
                  ACCESS_TOKEN_KEY,
                  ACCESS_TOKEN_SECRET,
                  sleep_on_rate_limit=True)


def demojify(text):
    return text.encode('ascii', 'ignore').decode('ascii')


def polaritySubjectivityScore(tweetText):
    blob = TextBlob(tweetText)
    polarity = blob.polarity
    sentiment = blob.sentiment.subjectivity
    polaritySentiment = str(polarity) + "," + str(sentiment)
    return polaritySentiment


def cleanTweets(tweet):
    cleanTweet = re.sub(r'\\x\w+\w', '', tweet)
    cleanTweet = re.sub(r'(http|#|@)\S+', '', cleanTweet)
    cleanTweet = re.sub(r',|\n', '', cleanTweet)
    cleanTweet = demojify(cleanTweet)
    cleanTweet = "" + cleanTweet + ""
    # print(cleanTweet)
    return cleanTweet


def bitcoin(previousDate):
    with open("bitcoin.csv", 'a') as writer:
        response = api.GetSearch(
            raw_query="q=%23bitcoin%2C%20OR%20%23btc&l=en&src=typd")
        time.sleep(sleepTime)
        y = json.loads(str(response[0]))
        publishDate = y["created_at"]
        publishDate = str(publishDate)
        if publishDate == previousDate:
            logging.info("BITCOIN - Same Date Ignoring It")
            return 0
        else:
            previousDate = publishDate

            tweetText = y["text"]
            tweetText = str(tweetText)
            tweetText = cleanTweets(tweetText)
            accountID = y["id"]

            accountID = "" + str(accountID) + ""
            sentiment = polaritySubjectivityScore(tweetText)
            writer.write(publishDate + "," + tweetText + "," + accountID +
                         "," + sentiment + "\n")
            logging.info("Bitcoin Executed")
            return publishDate


def ethereum(previousDate):
    with open("ethereum.csv", 'a') as writer:
        response = api.GetSearch(
            raw_query="q=%23eth%2C%20OR%20%23ethereum&l=en&src=typd")
        time.sleep(sleepTime)
        y = json.loads(str(response[0]))
        publishDate = y["created_at"]
        publishDate = str(publishDate)

        if publishDate == previousDate:
            logging.info("ETH - Same Date Ignoring It")
            return 0
        else:
            previousDate = publishDate
            tweetText = y["text"]
            tweetText = str(tweetText)
            tweetText = cleanTweets(tweetText)
            accountID = y["id"]
            accountID = "" + str(accountID) + ""
            sentiment = polaritySubjectivityScore(tweetText)
            writer.write(publishDate + "," + tweetText + "," + accountID +
                         "," + sentiment + "\n")
            return publishDate
            logging.info("ETH Executed")


def litecoin(previousDate):
    with open("litecoin.csv", 'a') as writer:
        response = api.GetSearch(
            raw_query="f=tweets&vertical=news&q=litecoin&l=en&src=typd")
        time.sleep(sleepTime)
        y = json.loads(str(response[0]))
        publishDate = y["created_at"]
        publishDate = str(publishDate)

        if publishDate == previousDate:
            logging.info("Litecoin - Same Date Ignoring It")
            return 0
        else:
            previousDate = publishDate
            tweetText = y["text"]
            tweetText = str(tweetText)
            tweetText = cleanTweets(tweetText)
            accountID = y["id"]

            accountID = "" + str(accountID) + ""
            sentiment = polaritySubjectivityScore(tweetText)
            writer.write(publishDate + "," + tweetText + "," + accountID +
                         "," + sentiment + "\n")
            logging.info("LTC Executed")
        return publishDate


def get_tweets(api):
    logging.basicConfig(
        filename="hastag.log",
        filemode='a',
        format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
        datefmt='%H:%M:%S',
        level=logging.INFO)

    previousDateBTC = ""
    previousDateETH = ""
    previousDateLTC = ""
    i = 0
    timeNOW = datetime.datetime.now()
    msgStart = "Time Started " + str(timeNOW)
    logging.critical(msgStart)
    while True:
        if i % 3 == 0:
            retrieveBTC = bitcoin(previousDateBTC)
            previousDateBTC = retrieveBTC
        elif i % 3 == 1:
            retrieveETH = ethereum(previousDateETH)
            previousDateETH = retrieveETH
        else:
            retrieveLTC = litecoin(previousDateLTC)
            previousDateLTC = retrieveLTC
        i += 1
    msgEnd = "Faild at " + str(timeNOW)
    logging.critical(msgEnd)


get_tweets(api)
