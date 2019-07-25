from crawler import util
from textblob import TextBlob
import datetime
import time
import requests
import pandas as pd
import numpy as np
from crawler.tok import t
from datetime import date
from datetime import timedelta

class CryptoCrawler:

    ### Puts all the variables into a dictionary with the entries for tweets, hourly and daily cointaining pandas dataframes
    def __init__(self, cryptoName, cryptoShortName, fileNameTweet, fileNameNews, token):
        self.dict = {}
        self.dict['token'] = token
        self.dict['name'] = cryptoName
        self.dict['shortName'] = cryptoShortName

        self.dict['tweets'] = pd.DataFrame(data=self.setsentiment(util.readerCSV(fileNameTweet)),
                                           columns=['Time', 'Tweet', 'Polarity', 'Subjectivity'])

        self.dict['news'] = pd.DataFrame(data=self.setnewsSentiment(util.readerCSV(fileNameNews)),
                                           columns=['Time', 'Article', 'Polarity', 'Subjectivity'])

        self.dict['startDate'] = str(self.dict['tweets'].min().Time)
        self.dict['endDate'] = str(self.dict['tweets'].max().Time)

        self.dict['5min'] = self.sethourlysentiment()
        self.dict['5min'] = pd.merge(self.dict['5min'], self.sethourlyprice(), on='Time', sort=False, how='outer')
        self.dict['5min'] = pd.merge(self.dict['5min'], self.setsp500(), on='Time', sort=False, how='outer')
        self.dict['5min'] = pd.merge(self.dict['5min'], self.setUSDEuroRate(), on='Time', sort=False, how='outer')

        self.dict['daily'] = pd.DataFrame(data=list(self.setwiki().items()), columns=['Time', 'Views'])
        self.dict['daily'] = pd.merge(self.dict['daily'], self.setdailynews(), on='Time', sort=False, how='outer')

        self.dict['5min'] = self.dict['5min'].sort_values(self.dict['5min'].columns[0], ascending=True)

        self.dict['5min'].replace('', np.nan, inplace=True)
        self.dict['5min'] = self.dict['5min'].fillna(method='ffill')

        self.dict['daily'] = self.dict['daily'].sort_values(self.dict['daily'].columns[0], ascending=True)


    ### Web crawler details

    ### Get a json based on link and return the values as a dictionary
    def setwiki(self):
        startDate = util.dateFormatChanger(str(self.dict['startDate']), '%Y-%m-%d %H:%M', '%Y%m%d')
        endDate = util.dateFormatChanger(str(self.dict['endDate']), '%Y-%m-%d %H:%M', '%Y%m%d')
        today = date.today().strftime("%Y%m%d")

        if (startDate == today):
            startDate = str(int(startDate) - 1)
        if (endDate == today):
            endDate = str(int(endDate) - 1)

        link = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/' \
               + self.dict['name'] + '/daily/' + startDate + '00/' + endDate + '00'

        value = util.readerJson(link)
        viewCount = {}
        for item in value['items']:
            viewCount[util.dateFormatChanger(item['timestamp'][0:8], '%Y%m%d', '%Y-%m-%d')] = item['views']
        return viewCount

    ### Gets the sentiment value of every tweet - date, text
    def setsentiment(self, file_reader_input):
        timesentiment = []
        for row in file_reader_input:
            blob = TextBlob(row[1])
            timeRound = util.dateFormatChanger(row[0], '%a %b %d %H:%M:%S +%f %Y', '%Y-%m-%d %H:%M')
            timeRound = datetime.datetime.strptime(timeRound, '%Y-%m-%d %H:%M')
            val = (((timeRound.minute) // 5 * 5) % 60)
            val2 = (((timeRound.minute) // 5 * 5) // 60)
            timeRound = timeRound.replace(hour=timeRound.hour + val2, minute=val)
            timeRound = util.dateFormatChanger(str(timeRound), '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M')
            timesentiment.append((timeRound, row[1],
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
        end7date = datetime.datetime.strptime(self.dict['endDate'], '%Y-%m-%d %H:%M')
        end7date += timedelta(days=-7)
        index = pd.date_range(end7date, self.dict['endDate'], freq='5min')
        df = pd.DataFrame(columns=['Time', 'Open', 'Close', 'High', 'Low', 'VolumeCoin', 'VolumeUSD'])
        timeUnix = time.mktime(index[index.__len__()-1].timetuple())
        #print(timeUnix)
        url = "https://min-api.cryptocompare.com/data/histominute?fsym=" + self.dict[
            'shortName'] + "&tsym=USD&aggregate=5&limit=2000&toTs=" + str(int(timeUnix)) + "&api_key=" + t
        #print(url)
        reformat = requests.get(url).json()
        i = len(reformat['Data'])-1
        k = len(reformat['Data'])-1
        for _ in index:
            if i == 0:
                timeUnix = time.mktime(index[index.__len__()-1-k].timetuple())
                #print(timeUnix)
                url = "https://min-api.cryptocompare.com/data/histominute?fsym=" + self.dict[
                    'shortName'] + "&tsym=USD&aggregate=5&limit=2000&toTs=" + str(int(timeUnix)) + "&api_key=" + t
                #print(url)
                reformat = requests.get(url).json()
                k += len(reformat['Data'])-1
                i = len(reformat['Data'])-1
            if (len(reformat['Data']) > 0):
                inas = reformat['Data'][i]
                rounded = util.dateFormatChanger(str(index[index.__len__()-1-k+i]), '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M')
                rounded = datetime.datetime.strptime(rounded, '%Y-%m-%d %H:%M')
                va = (((rounded.minute + 1) // 5 * 5) % 60)
                rounded = rounded.replace(hour=rounded.hour, minute=va)
                dic = {
                    'Time': util.dateFormatChanger(str(rounded), '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M'),
                    'Open': inas['open'],
                    'Close': inas['close'],
                    'High': inas['high'],
                    'Low': inas['low'],
                    'VolumeCoin': inas['volumefrom'],
                    'VolumeUSD': inas['volumeto']
                }
                i -= 1
                df = df.append(dic, ignore_index=True)
        df.sort_values(df.columns[0], ascending=True)
        #print(df)
        return df

    def setsp500(self):

        link = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY' \
               '&symbol=.INX&interval=5min&outputsize=full&apikey=' + self.dict['token']
        #print(link)
        value = util.readerJson(link)
        val = {}
        val2 = {}
        for item in value['Time Series (5min)']:
            item2 = util.dateFormatChanger(str(item), '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M')
            item3 = datetime.datetime.strptime(item2, '%Y-%m-%d %H:%M')
            va = (((item3.minute) // 5 * 5) % 60)
            item3.replace(hour=item3.hour, minute=va)
            item3 = util.dateFormatChanger(str(item3), '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M')
            if ((item2 >= str(self.dict['startDate'])) & (item2 <= str(self.dict['endDate']))):
                val[item3] = value['Time Series (5min)'][item]['4. close']
                val2[item3] = value['Time Series (5min)'][item]['5. volume']
        panda = pd.DataFrame(data=val.items(), columns=['Time', 'S&P500 Close'])
        panda2 = pd.DataFrame(data=val2.items(), columns=['Time', 'S&P500 Volume'])
        df = pd.merge(panda, panda2, on='Time', sort=False, how='outer')

        return df

    def setUSDEuroRate(self):

        link = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&outputsize=full&apikey=' + self.dict['token']
        #print(link)
        value = util.readerJson(link)
        val = {}
        for item in value['Time Series FX (5min)']:
            item2 = util.dateFormatChanger(str(item), '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M')
            if ((str(item2) >= self.dict['startDate']) & (str(item2) <= self.dict['endDate'])):
                val[str(item2)] = value['Time Series FX (5min)'][item]['4. close']
        panda = pd.DataFrame(data=val.items(), columns=['Time', 'USDEuro'])
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
