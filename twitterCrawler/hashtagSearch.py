import twitter
from t import ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET
import json
import csv


api = twitter.Api(CONSUMER_KEY, CONSUMER_SECRET,
                  ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)

results = api.GetSearch(raw_query="l=en&q=bitcoin&src=typd",
                        return_json="true")


# print(results)
def handleJSON(jsonData):
    dumpJSON = json.dumps(jsonData)
    parsedJSON = json.loads(dumpJSON)
    return parsedJSON


def get_tweets(api):

    with open("output.csv", 'w+') as writer:
        for i in range(0, 10):
            results = api.GetSearch(
                raw_query="l=en&q=bitcoin&src=typd")
            y = json.loads(str(results[i]))
            date = y["created_at"]
            status = y["text"]
            statusTOstr = str(status)
            statusTOstr = statusTOstr.replace("\n", " ")
            statusTOstrFINAL = statusTOstr.replace(",", " ")
            writer.write(str(date) + ' , ' + statusTOstrFINAL + ' \n')
            # print(parsedJSON["created_at"])
            i += 1


get_tweets(api)
