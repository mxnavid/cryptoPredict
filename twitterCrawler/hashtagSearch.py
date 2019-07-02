import twitter
from t import ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET
import json
import csv
import time

api = twitter.Api(CONSUMER_KEY, CONSUMER_SECRET,
                  ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)


def get_tweets(api):
    with open("output.csv", 'w+') as writer:
        for i in range(0, 100000000000000000000000):
            startTime = time.time()
            results = api.GetSearch(
                raw_query="l=en&q=bitcoin&src=typd")
# TODO %3 = 0 - bitcoin, 1 - eth, 3 - ltc
            for x in range(0, len(results)):
                y = json.loads(str(results[x]))
                date = y["created_at"]
                status = y["text"]
                statusTOstr = str(status)
                statusTOstr = statusTOstr.replace("\n", " ")
                statusTOstrFINAL = statusTOstr.replace(",", " ")
                writer.write(str(date) + ' , ' + statusTOstrFINAL + ' \n')
            # print(parsedJSON["created_at"])
            time.sleep(5)
            endTime = time.time()
            elapsed = endTime-startTime
            print("I am sleeping for ")
            print(elapsed)

            print("call number" + str(i))


get_tweets(api)
