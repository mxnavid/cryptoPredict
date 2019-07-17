from crawler.cryptoCrawler import CryptoCrawler
from crawler.cryptoCrawler2 import CryptoCrawler2
from crawler import util
import os
import time

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

#Bitcoin
bitcoin = CryptoCrawler('Bitcoin', 'BTC', os.path.join(THIS_FOLDER, 'data/bitcoin.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'))
util.writeFiles(bitcoin, THIS_FOLDER)

util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+bitcoin.dict['name']+'_hourly_output.csv'))
util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+bitcoin.dict['name']+'_daily_output.csv'))

time.sleep(30)

#Litecoin
litecoin = CryptoCrawler('Litecoin', 'LTC', os.path.join(THIS_FOLDER, 'data/litecoin.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'))
util.writeFiles(litecoin, THIS_FOLDER)

util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+litecoin.dict['name']+'_hourly_output.csv'))
util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+litecoin.dict['name']+'_daily_output.csv'))

time.sleep(30)

#Ethereum
ethereum = CryptoCrawler('Ethereum', 'ETH', os.path.join(THIS_FOLDER, 'data/ethereum.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'))
util.writeFiles(ethereum, THIS_FOLDER)

util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+ethereum.dict['name']+'_hourly_output.csv'))
util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+ethereum.dict['name']+'_daily_output.csv'))

# Run only below if just wanting to convert Csv to Js
#util.writeJs('data/output/Bitcoin_hourly_output.csv')
#util.writeJs('data/output/Bitcoin_daily_output.csv')

#util.convertTimeFile(os.path.join(THIS_FOLDER, 'data/bitcoin.csv'))
#util.convertTimeFile(os.path.join(THIS_FOLDER, 'data/ethereum.csv'))
#util.convertTimeFile(os.path.join(THIS_FOLDER, 'data/litecoin.csv'))

#btc = CryptoCrawler2('Bitcoin', 'BTC', '2018-07-16 00', '2019-07-16 00')

#util.writeDFtoCSV(btc.dict['hourly'],
#                  os.path.join(THIS_FOLDER, 'data/output/' + btc.dict['name'] + '2_hourly_output.csv'))
#print('Wrote ' + btc.dict['name'] + ' hourly value to CSV')
#util.writeDFtoCSV(btc.dict['daily'],
#                  os.path.join(THIS_FOLDER, 'data/output/' + btc.dict['name'] + '2_daily_output.csv'))
#print('Wrote ' + btc.dict['name'] + ' daily values to CSV')
