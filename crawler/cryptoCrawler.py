from crawler import util
from textblob import TextBlob
import datetime
import time
import requests
import pandas as pd
from crawler.token import t, t2
from datetime import date

class CryptoCrawler:

    ### Puts all the variables into a dictionary with the entries for tweets, hourly and daily cointaining pandas dataframes
    def __init__(self, cryptoName, cryptoShortName, fileNameTweet, fileNameNews):
        self.dict = {}
        self.dict['name'] = cryptoName
        self.dict['shortName'] = cryptoShortName

        self.dict['tweets'] = pd.DataFrame(data=self.setsentiment(util.readerCSV(fileNameTweet)),
                                           columns=['Time', 'Tweet', 'Polarity', 'Subjectivity'])

        self.dict['news'] = pd.DataFrame(data=self.setnewsSentiment(util.readerCSV(fileNameNews)),
                                           columns=['Time', 'Article', 'Polarity', 'Subjectivity'])

        self.dict['hourly'] = self.sethourlyprice()

        self.dict['startDate'] = util.dateFormatChanger(str(self.dict['hourly'].min().Time), '%Y-%m-%d %H', '%Y-%m-%d')
        self.dict['endDate'] = util.dateFormatChanger(str(self.dict['hourly'].max().Time), '%Y-%m-%d %H', '%Y-%m-%d')

        self.dict['hourly'] = pd.merge(self.dict['hourly'],self.sethourlysentiment(), on='Time', sort=False, how='outer')

        self.dict['daily'] = pd.DataFrame(data=list(self.setwiki().items()), columns=['Time', 'Views'])
        self.dict['daily'] = pd.merge(self.dict['daily'], self.setdailynews(), on='Time', sort=False, how='outer')
        self.dict['daily'] = pd.merge(self.dict['daily'],self.setUSDEuroRate(), on='Time', sort=False, how='outer')
        self.dict['daily'] = pd.merge(self.dict['daily'], self.setsp500(), on='Time', sort=False, how='outer')

        self.dict['daily'] = self.dict['daily'].sort_values(self.dict['daily'].columns[0], ascending=True)

    ### Web crawler details

    ### Get a json based on link and return the values as a dictionary
    def setwiki(self):
        startDate = util.dateFormatChanger(str(self.dict['startDate']), '%Y-%m-%d', '%Y%m%d')
        endDate = util.dateFormatChanger(str(self.dict['endDate']), '%Y-%m-%d', '%Y%m%d')
        today = date.today().strftime("%Y%m%d")

        if (startDate == today):
            startDate = str(int(startDate) - 1)
        if (endDate == today):
            endDate = str(int(endDate) - 1)

        link = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/' \
               + self.dict['name'] + '/daily/' + startDate + '00/' + endDate + '00'
        print(link)
        value = util.readerJson(link)
        viewCount = {}
        for item in value['items']:
            viewCount[util.dateFormatChanger(item['timestamp'][0:8], '%Y%m%d', '%Y-%m-%d')] = item['views']
        return viewCount

    ### Gets the sentiment value of every tweet - date, text
    def setsentiment(self, file_reader_input):
        timesentiment = []
        for row in file_reader_input:
            clean_tweets = util.cleanTweets(row[1])
            ### This is merely a reminder that I need to change row[2] back to row[1] when working with other files
            blob = TextBlob(row[1])
            ### This is merely a reminder that I need to change '%Y-%m-%d %H:%M:%S.%f' back to '%a %b %d %H:%M:%S +%f %Y' when working with other files
            timesentiment.append((util.dateFormatChanger(row[0],
                                                         '%a %b %d %H:%M:%S +%f %Y', '%Y-%m-%d %H'), clean_tweets,
                                  blob.polarity, blob.subjectivity))
        return timesentiment

    def sethourlysentiment(self):
        dict = {}
        # combine all sentiment scores by hour into a dictionary with key time and tuple (frequency, sum)
        for index, row in self.dict['tweets'].iterrows():
            if row['Time'] in dict:
                dict[row['Time']] = (dict[row['Time']][0] + 1, (dict[row['Time']][1] + row['Polarity']), (dict[row['Time']][2] + row['Subjectivity']))
            else:
                dict[row['Time']] = (1, row['Polarity'], row['Subjectivity'])

        avgValue = []
        avgSubj = []
        for key, value in dict.items():
            avg = value[1] / value[0]
            avgSub = value[2] / value[0]
            avgValue.append((key, avg))
            avgSubj.append((key, avgSub))

        df = pd.DataFrame(data=list(avgValue), columns=['Time', 'Polarity'])
        dl = pd.DataFrame(data=list(avgSubj), columns=['Time', 'Subjectivity'])
        df = pd.merge(df, dl, on='Time', sort=False, how='outer')

        return df

    def sethourlyprice(self):
        lst = []
        df = pd.DataFrame(columns=['Time', 'Open', 'Close', 'High', 'Low', 'VolumeCoin', 'VolumeUSD'])
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
                'VolumeCoin': reformat['Data'][0]['volumefrom'],
                'VolumeUSD': reformat['Data'][0]['volumeto']
            }
            df = df.append(dic, ignore_index=True)
        return df

    def setsp500(self):

        link = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY' \
               '&symbol=^GSPC&outputsize=full&apikey=' + t2
        value = util.readerJson(link)
        val = {}
        for item in value['Time Series (Daily)']:
            if ((str(item) >= self.dict['startDate']) & (str(item) <= self.dict['endDate'])):
                val[str(item)] = value['Time Series (Daily)'][item]['4. close']
        panda = pd.DataFrame(data=val.items(), columns=['Time', 'S&P500 Close'])
        return panda

    def setUSDEuroRate(self):

        link = 'https://api.exchangeratesapi.io/history?start_at='+self.dict['startDate']+'&end_at='+self.dict['endDate']+'&symbols=USD'
        value = util.readerJson(link)
        rate = {}
        for item in value['rates']:
            rate[str(item)] = value['rates'][item]['USD']
        panda = pd.DataFrame(data=rate.items(), columns=['Time', 'USDEuroRate'])
        return panda

    def setnewsSentiment(self, file_reader_input):
        timesentiment = []
        for row in file_reader_input:
            blob = TextBlob(row[2]+row[3])
            timesentiment.append((util.dateFormatChanger(row[0],
                                                         '%Y-%m-%dT%H:%M:%SZ', '%Y-%m-%d'), row[2]+row[3],
                                  blob.polarity, blob.subjectivity))
        return timesentiment

    def setdailynews(self):
        dict = {}
        # combine all sentiment scores by day into a dictionary with key time and tuple (frequency, sum)
        for index, row in self.dict['news'].iterrows():
            if ((row['Time'] < self.dict['endDate']) & (row['Time'] > self.dict['startDate'])):
                if row['Time'] in dict:
                    dict[row['Time']] = (dict[row['Time']][0] + 1, (dict[row['Time']][1] + row['Polarity']), (dict[row['Time']][2] + row['Subjectivity']))
                else:
                    dict[row['Time']] = (1, row['Polarity'], row['Subjectivity'])

        avgValue = []
        avgSubj = []
        for key, value in dict.items():
            avg = value[1] / value[0]
            avgSub = value[2] / value[0]
            avgValue.append((key, avg))
            avgSubj.append((key, avgSub))

        df = pd.DataFrame(data=list(avgValue), columns=['Time', 'Polarity'])
        dl = pd.DataFrame(data=list(avgSubj), columns=['Time', 'Subjectivity'])
        df = pd.merge(df, dl, on='Time', sort=False, how='outer')

        return df