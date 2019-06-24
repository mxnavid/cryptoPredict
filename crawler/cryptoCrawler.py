from crawler import util
from textblob import TextBlob

class CryptoCrawler:
    def __init__(self, cryptoName, startDate, endDate):
        self.name = cryptoName
        self.startDate = startDate
        self.endDate = endDate
        self.tweets, self.sentiment = self.setsentiment(util.readerCSV("data/input1.csv"))

        self.wiki = self.setwiki()
        self.dailyprice = self.setdailyprice()

        ### pull data from crawler/ csv file for rest based on name and dates
        ### call crawler methods

    ### Web crawler details

    ### Get a json based on link
    def setwiki(self):
        link = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/" + self.name + "/daily/" + self.startDate + "00/" + self.endDate + "00"
        value = util.readerJson(link)
        viewCount = {}
        for item in value['items']:
            viewCount[util.dateFormatChanger(item['timestamp'][0:8])] = item['views']
        return viewCount

    ### Get a json based on link
    ### Only works for bitcoin it seems
    def setdailyprice(self):
        link = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + util.dateFormatChanger(self.startDate) + "&end=" + util.dateFormatChanger(self.endDate)
        value = util.readerJson(link)
        return value['bpi']

    ### Gets the sentiment value of every tweet
    def setsentiment(self, file_reader_input):
        ### TODO rewrite this function to create a dictionary with date as key and tuple containing (cleaned tweet, polarity) --- Need dates in input before I will make this change
        sentiment2 = []
        tweets = []
        for row in file_reader_input:
            cleaned_tweet = util.cleanTweets(row[0])
            blob = TextBlob(cleaned_tweet)
            tweets.append(cleaned_tweet)
            sentiment2.append(blob.polarity)
        return tweets, sentiment2
