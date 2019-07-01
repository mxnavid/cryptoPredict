from crawler import util
from textblob import TextBlob
import datetime
import time
import requests
from crawler.token import t


class CryptoCrawler:

    def __init__(self, cryptoName, cryptoShortName, fileName):
        self.name = cryptoName
        self.shortName = cryptoShortName
        self.dates, self.tweets, self.sentiment = zip(*self.setsentiment(util.readerCSV(fileName)))
        self.hourlySentiment = self.sethourlysentiment()
        self.hourlyTime, self.hourlyOpen, self.hourlyClose, self.hourlyHigh, self.hourlyLow, self.hourlyVolumeCoin, self.hourlyVolumeUSD = zip(*self.sethourlyprice())
        self.wiki = self.setwiki()

        ### pull data from crawler/ csv file for rest based on coin and times in tweets
        ### call crawler methods

    ### Web crawler details

    ### Get a json based on link and return the values as a dictionary
    def setwiki(self):
        startDate = util.dateFormatChanger(str(min(self.hourlySentiment)[0]), '%Y-%m-%d %H', '%Y%m%d')
        endDate = util.dateFormatChanger(str(max(self.hourlySentiment)[0]), '%Y-%m-%d %H', '%Y%m%d')
        link = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/" \
               + self.name + "/daily/" + startDate + "00/" + endDate + "00"
        value = util.readerJson(link)
        viewCount = {}
        for item in value['items']:
            viewCount[util.dateFormatChanger(item['timestamp'][0:8], '%Y%m%d', '%Y-%m-%d')] = item['views']
        return viewCount

    ### Gets the sentiment value of every tweet - date, text
    def setsentiment(self, file_reader_input):
        timesentiment = []
        for row in file_reader_input:
            ### TODO This is merely a reminder that I need to change row[2] back to row[1] when working with other files
            cleaned_tweet = util.cleanTweets(row[2])
            blob = TextBlob(cleaned_tweet)
            ### TODO This is merely a reminder that I need to change '%Y-%m-%d %H:%M:%S.%f' back to '%a %b %d %H:%M:%S +%f %Y' when working with other files
            timesentiment.append((util.dateFormatChanger(row[0],
                                                         '%Y-%m-%d %H:%M:%S.%f', '%Y-%m-%d %H'), cleaned_tweet,
                                  blob.polarity))
        return timesentiment

    def sethourlysentiment(self):
        datesentiment = zip(self.dates, self.sentiment)
        dict = {}
        # combine all sentiment scores by hour into a dictionary with key time and tuple (frequency, sum)
        for val in datesentiment:
            if val[1] != 0:
                if val[0] in dict:
                    dict[val[0]] = (dict[val[0]][0] + 1, dict[val[0]][1] + val[1])
                else:
                    dict[val[0]] = (1, val[1])

        avgValue = []
        for key, value in dict.items():
            avg = value[1] / value[0]
            avgValue.append((key, avg))
        avgValue = sorted(avgValue, key=lambda x: x[0], reverse=True)
        ##print(avgValue)
        return avgValue

    def sethourlyprice(self):
        lst = []
        for tim, var in self.hourlySentiment:
            timeUnix = time.mktime(datetime.datetime.strptime(tim, '%Y-%m-%d %H').timetuple())

            url = "https://min-api.cryptocompare.com/data/histohour?fsym=" + self.shortName + "&tsym=USD&limit=1&toTs=" + str(timeUnix) + "&api_key=" + t

            reformat = requests.get(url).json()
            lst.append((tim, reformat['Data'][0]['open'], reformat['Data'][0]['close'],
                         reformat['Data'][0]['high'], reformat['Data'][0]['low'], reformat['Data'][0]['volumefrom'], reformat['Data'][0]['volumeto']))
            lst = sorted(lst, key=lambda x: x[0], reverse=True)
        return lst
