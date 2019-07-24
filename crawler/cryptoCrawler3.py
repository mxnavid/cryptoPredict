from crawler.cryptoCrawler import CryptoCrawler
from crawler import util
import pandas as pd
import numpy as np

class CryptoCrawler3(CryptoCrawler):
    pass

    ### Puts all the variables into a dictionary with the entries for tweets, hourly and daily cointaining pandas dataframes
    def __init__(self, cryptoName, cryptoShortName, fileNameTweet, fileNameNews, token, sp500, usdeuro):
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
        self.dict['5min'] = pd.merge(self.dict['5min'], sp500, on='Time', sort=False)
        self.dict['5min'] = pd.merge(self.dict['5min'], usdeuro, on='Time', sort=False)

        self.dict['daily'] = pd.DataFrame(data=list(self.setwiki().items()), columns=['Time', 'Views'])
        self.dict['daily'] = pd.merge(self.dict['daily'], self.setdailynews(), on='Time', sort=False, how='outer')

        self.dict['5min'] = self.dict['5min'].sort_values(self.dict['5min'].columns[0], ascending=True)

        self.dict['5min'].replace('', np.nan, inplace=True)
        self.dict['5min'] = self.dict['5min'].fillna(method='ffill')

        self.dict['daily'] = self.dict['daily'].sort_values(self.dict['daily'].columns[0], ascending=True)
