import util
from textblob import TextBlob
import preprocessor as p

class CryptoCrawler:
    def __init__(self, cryptoName, startDate, endDate):
        self.name = cryptoName
        self.startDate = startDate
        self.endDate = endDate
        self.tweets, self.sentiment = self.setsentiment(util.readerCSV("input1.csv"))

        #self.wiki = []
        #self.setwiki()
        #self.setdailyprice()

        ### pull data from crawler/ csv file for rest based on name and dates
        ### call crawler methods

    ### Web crawler details

    ### Get a json based on link
    def setwiki(self):
        link = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/" + self.name + "/daily/" + self.startDate + "00/" + self.endDate + "00"
        ### get the json from link and format/ save it however we want
        ### TODO Take json input from link and do stuff
        util.readerJson(link)
        return

    ### Get a json based on link
    ### Only works for bitcoin it seems
    def setdailyprice(self):
        link = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + util.dateFormatChanger(self.startDate) + "&end=" + util.dateFormatChanger(self.endDate)
        ### TODO Take json input from link and do stuff
        util.readerJson(link)
        return

    ### Gets the sentiment value of every tweet
    def setsentiment(self, file_reader_input):
        sentiment2 = []
        tweets = []
        for row in file_reader_input:
            cleaned_tweet = util.cleanTweets(row[0])
            blob = TextBlob(cleaned_tweet)
            tweets.append(cleaned_tweet)
            sentiment2.append(blob.polarity)

        print("done sentiment")
        return tweets, sentiment2


### format for dates in YYYYMMDD
bitcoin = CryptoCrawler("Bitcoin", "20180101", "20180107")
util.writeCSV(bitcoin, "output.csv")
print("Finished")