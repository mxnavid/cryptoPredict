import twitter
from t import ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET
import json
import csv
import time

api = twitter.Api(CONSUMER_KEY,
                  CONSUMER_SECRET,
                  ACCESS_TOKEN_KEY,
                  ACCESS_TOKEN_SECRET,
                  sleep_on_rate_limit=True)


def demojify(text):
    return text.encode('ascii', 'ignore').decode('ascii')


def bitcoin():
    with open("bitcoin.csv", 'a') as writer:
        response = api.GetSearch(
            raw_query="q=%23bitcoin%2C%20OR%20%23btc&l=en&src=typd")
        time.sleep(5)
        y = json.loads(str(response[0]))
        publishDate = y["created_at"]
        tweetText = y["text"]
        tweetText = str(tweetText)
        tweetText.replace(",", "")
        tweetText.replace("\n", "")
        tweetText = demojify(tweetText)
        accountID = y["id"]
        writer.write(publishDate + "," + tweetText + "," + "\n")
        print("bitcoin executed")


def ethereum():
    with open("ethereum.csv", 'a') as writer:
        response = api.GetSearch(
            raw_query="q=%23eth%2C%20OR%20%23ethereum&l=en&src=typd")
        time.sleep(5)
        y = json.loads(str(response[0]))
        publishDate = y["created_at"]
        tweetText = y["text"]
        tweetText = str(tweetText)
        tweetText.replace(",", "")
        tweetText.replace("\n", "")
        tweetText = demojify(tweetText)

        accountID = y["id"]
        writer.write(publishDate + "," + tweetText + "," + "\n")
        print("ethereum got executed")


def litecoin():
    with open("litecoin.csv", 'a') as writer:
        response = api.GetSearch(
            raw_query="f=tweets&vertical=news&q=litecoin&l=en&src=typd")
        time.sleep(2)
        y = json.loads(str(response[0]))
        publishDate = y["created_at"]
        tweetText = y["text"]
        tweetText = str(tweetText)
        tweetText.replace(",", "")
        tweetText.replace("\n", "")
        accountID = y["id"]
        writer.write(publishDate + "," + tweetText + "," + str(accountID) +
                     "\n")
        print("litecoin got executed")


def get_tweets(api):
    for i in range(0, 21):
        if i % 3 == 0:
            bitcoin()
        elif i % 3 == 1:
            print()
            ethereum()
        else:
            print()
            # litecoin()


get_tweets(api)
