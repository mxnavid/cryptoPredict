from crawler.cryptoCrawler import CryptoCrawler
from crawler import util

bitcoin = CryptoCrawler('Bitcoin', 'BTC', 'data/cleanprep.csv')

util.writeDFtoCSV(bitcoin.dict['tweets'],'data/output/'+bitcoin.dict['name']+'_tweet_output.csv')
print('Wrote tweet values to CSV')
util.writeDFtoCSV(bitcoin.dict['hourly'],'data/output/'+bitcoin.dict['name']+'_hourly_output.csv')
print('Wrote hourly value to CSV')

util.writeDFtoCSV(bitcoin.dict['daily'],'data/output/'+bitcoin.dict['name']+'_daily_output.csv')
print('Wrote daily values to CSV')
