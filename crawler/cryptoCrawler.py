from crawler import util
from textblob import TextBlob

class CryptoCrawler:
    def __init__(self, cryptoName, startDate, endDate):
        self.name = cryptoName
        self.startDate = startDate
        self.endDate = endDate
        self.dates, self.tweets, self.sentiment = zip(*self.setsentiment(util.readerCSV("data/bitcointweets.csv")))
        self.hourlyTime, self.hourlyPrice, self.hourlyVolume = zip(*self.sethourlyprice())
        self.hourlySentiment = self.sethourlysentiment()
        ### TODO FIX HOURLY TIME
        self.wiki = self.setwiki()

        ### pull data from crawler/ csv file for rest based on name and dates
        ### call crawler methods

    ### Web crawler details

    ### Get a json based on link and return the values as a dictionary
    def setwiki(self):
        link = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/" \
               + self.name + "/daily/" + self.startDate + "00/" + self.endDate + "00"
        value = util.readerJson(link)
        viewCount = {}
        for item in value['items']:
            viewCount[util.dateFormatChanger(item['timestamp'][0:8], '%Y%m%d', '%Y-%m-%d')] = item['views']
        return viewCount

    ### Get hourly values based on data sets in format dict[date] = (price, volume) - THIS is from a file and not web so cannot get data not from file
    def sethourlyprice(self):
        everyHour = util.readerCSV("data/hourly/"+self.name+".csv")
        hoursNeeded = []
        for row in everyHour:
            if ((row[1][0:10] >= util.dateFormatChanger(self.startDate, '%Y%m%d', '%Y-%m-%d')) &
                    (row[1][0:10] <= util.dateFormatChanger(self.endDate, '%Y%m%d', '%Y-%m-%d'))):
                hoursNeeded.append((util.dateFormatChanger(row[1], '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H'), row[3], row[7]))
        return hoursNeeded

    ### Gets the sentiment value of every tweet - date, text
    def setsentiment(self, file_reader_input):
        timesentiment = []
        for row in file_reader_input:
            cleaned_tweet = util.cleanTweets(row[1])
            blob = TextBlob(cleaned_tweet)
            timesentiment.append((util.dateFormatChanger(row[0],
                                                         '%a %b %d %H:%M:%S +%f %Y', '%Y-%m-%d %H'), cleaned_tweet, blob.polarity))
        return timesentiment

    def sethourlysentiment(self):
        datesentiment = zip(self.dates, self.sentiment)
        dict = {}
        # combine all sentiment scores by hour into a dictionary with key time and tuple (frequency, sum)
        for val in datesentiment:
            if val[0] in dict:
                dict[val[0]] = (dict[val[0]][0] + 1, dict[val[0]][1] + val[1])
            else:
                dict[val[0]] = (1, val[1])

        avgValue = []
        for value in self.hourlyTime:
            if value not in dict.keys():
                avgValue.append((value, 0))

        for key, value in dict.items():
            avg = value[1] / value[0]
            avgValue.append((key, avg))
        avgValue = sorted(avgValue, key=lambda x: x[0], reverse=True)
        print(avgValue)
        return avgValue