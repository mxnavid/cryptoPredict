from crawler.cryptoCrawler import CryptoCrawler
from crawler import util

bitcoin = CryptoCrawler('Bitcoin', 'BTC', 'data/tweetsSmall.csv', 'data/newsPrep.csv')

util.writeDFtoCSV(bitcoin.dict['tweets'],'data/output/'+bitcoin.dict['name']+'_tweet_output.csv')
print('Wrote tweet values to CSV')
util.writeDFtoCSV(bitcoin.dict['news'],'data/output/'+bitcoin.dict['name']+'_news_output.csv')
print('Wrote news values to CSV')
util.writeDFtoCSV(bitcoin.dict['hourly'],'data/output/'+bitcoin.dict['name']+'_hourly_output.csv')
print('Wrote hourly value to CSV')
util.writeDFtoCSV(bitcoin.dict['daily'],'data/output/'+bitcoin.dict['name']+'_daily_output.csv')
print('Wrote daily values to CSV')

util.writeJs('data/output/'+bitcoin.dict['name']+'_hourly_output.csv')
util.writeJs('data/output/'+bitcoin.dict['name']+'_daily_output.csv')

# Run only below if just wanting to convert Csv to Json
#util.writeJs('data/output/Bitcoin_hourly_output.csv')
#util.writeJs('data/output/Bitcoin_daily_output.csv')