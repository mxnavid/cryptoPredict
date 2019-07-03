from crawler import util
from textblob import TextBlob
import datetime
import time
import requests
import pandas as pd
from crawler.token import t


class CryptoCrawler:

    def __init__(self, cryptoName, cryptoShortName, fileName):
        self.dict = {}
        self.dict['name'] = cryptoName
        self.dict['shortName'] = cryptoShortName

        self.dict['tweets'] = pd.DataFrame(data=self.setsentiment(util.readerCSV(fileName)),
                                           columns=['Time', 'Tweet', 'Sentiment'])
        #print(self.dict['tweets'])

        self.dict['hourly'] = self.sethourlyprice()
        #print(self.dict['hourly'])
        self.dict['hourly'] = pd.merge(self.dict['hourly'],self.sethourlysentiment(), on='Time', sort=False)
        #print(self.dict['hourly'])

        self.dict['daily'] = pd.DataFrame(data=list(self.setwiki().items()), columns=['Time', 'Views'])
        print(self.dict['daily'])

        ### pull data from crawler/ csv file for rest based on coin and times in tweets
        ### call crawler methods

    ### Web crawler details

    ### Get a json based on link and return the values as a dictionary
    def setwiki(self):
        startDate = util.dateFormatChanger(str(self.dict['hourly'].min().Time), '%Y-%m-%d %H', '%Y%m%d')
        endDate = util.dateFormatChanger(str(self.dict['hourly'].max().Time), '%Y-%m-%d %H', '%Y%m%d')

        link = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/' \
               + self.dict['name'] + '/daily/' + startDate + '00/' + endDate + '00'
        value = util.readerJson(link)
        viewCount = {}
        for item in value['items']:
            viewCount[util.dateFormatChanger(item['timestamp'][0:8], '%Y%m%d', '%Y-%m-%d')] = item['views']
        print(viewCount)
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
        dict = {}
        # combine all sentiment scores by hour into a dictionary with key time and tuple (frequency, sum)
        #print(self.dict['tweets'])
        for index, row in self.dict['tweets'].iterrows():
            if row['Time'] in dict:
                dict[row['Time']] = (dict[row['Time']][0] + 1, (dict[row['Time']][1] + row['Sentiment']))
            else:
                dict[row['Time']] = (1, row['Sentiment'])

        avgValue = []
        for key, value in dict.items():
            avg = value[1] / value[0]
            avgValue.append((key, avg))

        df = pd.DataFrame(data=list(avgValue), columns=['Time', 'Sentiment'])

        return df

    def sethourlyprice(self):
        lst = []
        df = pd.DataFrame(columns=['Time', 'Open', 'Close', 'High', 'Low', 'Volume Coin', 'Volume USD'])
        for index, rows in self.dict['tweets'].iterrows():
            lst.append(rows['Time'])
        lst = list(dict.fromkeys(lst))

        for val in lst:
            timeUnix = time.mktime(datetime.datetime.strptime(val, '%Y-%m-%d %H').timetuple())
            url = "https://min-api.cryptocompare.com/data/histohour?fsym=" + self.dict['shortName'] + "&tsym=USD&limit=1&toTs=" + str(timeUnix) + "&api_key=" + t

            reformat = requests.get(url).json()
            dic = {
                'Time': val,
                'Open': reformat['Data'][0]['open'],
                'Close': reformat['Data'][0]['close'],
                'High': reformat['Data'][0]['high'],
                'Low': reformat['Data'][0]['low'],
                'Volume Coin': reformat['Data'][0]['volumefrom'],
                'Volume USD': reformat['Data'][0]['volumeto']
            }
            df = df.append(dic, ignore_index=True)
        return df

    def setsp500(self):
        return