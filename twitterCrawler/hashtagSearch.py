import twitter
from t import ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET
import json
import csv
import re
import time

sleepTime = 4
api = twitter.Api(CONSUMER_KEY,
                  CONSUMER_SECRET,
                  ACCESS_TOKEN_KEY,
                  ACCESS_TOKEN_SECRET,
                  sleep_on_rate_limit=True)


def demojify(text):
    return text.encode('ascii', 'ignore').decode('ascii')


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
            print("Same Date Ignoring It")
            return 0
        else:
            previousDate = publishDate

            tweetText = y["text"]
            tweetText = str(tweetText)
            tweetText = cleanTweets(tweetText)
            accountID = y["id"]

            accountID = "" + str(accountID) + ""
            writer.write(publishDate + "," + tweetText + "," + accountID +
                         "\n")
            print("bitcoin executed")
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
            print("Same Date Ignoring It")
            return 0
        else:
            previousDate = publishDate
            tweetText = y["text"]
            tweetText = str(tweetText)
            tweetText = cleanTweets(tweetText)
            accountID = y["id"]

            accountID = "" + str(accountID) + ""
            writer.write(publishDate + "," + tweetText + "," + accountID +
                         "\n")
            return publishDate
        print("ethereum got executed")


def litecoin(previousDate):
    with open("litecoin.csv", 'a') as writer:
        response = api.GetSearch(
            raw_query="f=tweets&vertical=news&q=litecoin&l=en&src=typd")
        time.sleep(sleepTime)
        y = json.loads(str(response[0]))
        publishDate = y["created_at"]
        publishDate = str(publishDate)

        if publishDate == previousDate:
            print("Same Date Ignoring It")
            return 0
        else:
            previousDate = publishDate
            tweetText = y["text"]
            tweetText = str(tweetText)
            tweetText = cleanTweets(tweetText)
            accountID = y["id"]

            accountID = "" + str(accountID) + ""
            writer.write(publishDate + "," + tweetText + "," + accountID +
                         "\n")
        print("litecoin got executed")
        return publishDate


def get_tweets(api):
    previousDateBTC = ""
    previousDateETH = ""
    previousDateLTC = ""
    i = 0
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


get_tweets(api)
