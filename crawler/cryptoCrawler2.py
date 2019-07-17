from crawler.cryptoCrawler import CryptoCrawler
from crawler import util
import pandas as pd
import os

class CryptoCrawler2(CryptoCrawler):
    pass

    ### Puts all the variables into a dictionary with the entries for tweets, hourly and daily cointaining pandas dataframes
    def __init__(self, cryptoName, cryptoShortName, startDate, endDate):
        self.dict = {}
        self.dict['name'] = cryptoName
        self.dict['shortName'] = cryptoShortName
        self.dict['startDate'] = startDate
        self.dict['endDate'] = endDate

        self.dict['hourly'] = self.sethourlyprice()
        print('done set hourly price')
        self.dict['hourly'] = pd.merge(self.dict['hourly'], self.setsp500(), on='Time', sort=False, how='outer')
        print('done set sp500')
        self.dict['daily'] = pd.DataFrame(data=list(self.setwiki().items()), columns=['Time', 'Views'])
        print('done set wiki')
        self.dict['hourly'] = pd.merge(self.dict['hourly'], self.setUSDEuroRate(), on='Time', sort=False, how='outer')
        print('done set usdeuro rate')

        self.dict['hourly'] = self.dict['hourly'].sort_values(self.dict['hourly'].columns[0], ascending=True)
        for index, rows in self.dict['hourly'].iterrows():
            if pd.isnull(self.dict['hourly']['S&P500 Close'].iat[index]):
                self.dict['hourly']['S&P500 Close'].iat[index] = self.dict['hourly']['S&P500 Close'].iat[index-1]

        self.dict['daily'] = self.dict['daily'].sort_values(self.dict['daily'].columns[0], ascending=True)
