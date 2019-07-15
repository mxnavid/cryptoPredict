from crawler.cryptoCrawler import CryptoCrawler
from crawler import util
import os

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

#Bitcoin
#bitcoin = CryptoCrawler('Bitcoin', 'BTC', os.path.join(THIS_FOLDER, 'data/bitcoin.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'))
#util.writeFiles(bitcoin, THIS_FOLDER)

#util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+bitcoin.dict['name']+'_hourly_output.csv'))
#util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+bitcoin.dict['name']+'_daily_output.csv'))


#Litecoin
#litecoin = CryptoCrawler('Litecoin', 'LTC', os.path.join(THIS_FOLDER, 'data/litecoin.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'))
#util.writeFiles(litecoin, THIS_FOLDER)

#util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+litecoin.dict['name']+'_hourly_output.csv'))
#util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+litecoin.dict['name']+'_daily_output.csv'))

#Ethereum
#ethereum = CryptoCrawler('Ethereum', 'ETH', os.path.join(THIS_FOLDER, 'data/bitcoin.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'))
#util.writeFiles(ethereum, THIS_FOLDER)

#util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+ethereum.dict['name']+'_hourly_output.csv'))
#util.writeJs(os.path.join(THIS_FOLDER, 'data/output/'+ethereum.dict['name']+'_daily_output.csv'))

# Run only below if just wanting to convert Csv to Json
#util.writeJs('data/output/Bitcoin_hourly_output.csv')
#util.writeJs('data/output/Bitcoin_daily_output.csv')

util.convertTimeFile(os.path.join(THIS_FOLDER, 'data/bitcoin.csv'))
util.convertTimeFile(os.path.join(THIS_FOLDER, 'data/ethereum.csv'))
util.convertTimeFile(os.path.join(THIS_FOLDER, 'data/litecoin.csv'))