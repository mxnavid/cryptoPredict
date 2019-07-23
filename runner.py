from crawler.cryptoCrawler import CryptoCrawler
from crawler.cryptoCrawler3 import CryptoCrawler3
from crawler import util
import os
import time
import datetime
from datetime import timedelta
import subprocess
from crawler.tok import t2,t3,t4

def writingFiles(coin, THIS_FOLDER):
    util.writeFiles(coin, THIS_FOLDER)

    util.writeJs(os.path.join(THIS_FOLDER, 'data/output/' + coin.dict['name'] + '_daily_output.csv'),
                 os.path.join(THIS_FOLDER, 'ui/src/scraped/' + coin.dict['name'].lower() +'/'+ coin.dict['name'] + '_daily_output.js'))

    util.writeJs(os.path.join(THIS_FOLDER, 'data/output/' + coin.dict['name'] + '_5min_output.csv'),
                 os.path.join(THIS_FOLDER, 'ui/src/scraped/' + coin.dict['name'].lower() +'/'+ coin.dict['name'] + '_5min_output.js'))

    util.writeJs(os.path.join(THIS_FOLDER, 'data/' + coin.dict['name'] + '.csv'),
                 os.path.join(THIS_FOLDER, 'ui/src/scraped/' + coin.dict['name'].lower() +'/'+ coin.dict['name'] + '_tweet_output.js'))

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))


prevTime = datetime.datetime.now() + timedelta(minutes=-5)
while True:
    if (datetime.datetime.now() > prevTime + timedelta(minutes=5)):
        prevTime = datetime.datetime.now()
        print(datetime.datetime.now())
        p = subprocess.Popen(['scp', 'root@45.32.212.127:/root/cryptoPredict/twitterCrawler/{bitcoin.csv,litecoin.csv,ethereum.csv}',
                              os.path.join(THIS_FOLDER, 'data/')])

        sts = os.waitpid(p.pid, 0)


        bitcoin = CryptoCrawler('Bitcoin', 'BTC', os.path.join(THIS_FOLDER, 'data/bitcoin.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'), t3)

        sp500 = bitcoin.dict['5min'][['Time','S&P500 Close', 'S&P500 Volume']]
        #print(sp500)
        usdeuro = bitcoin.dict['5min'][['Time', 'USDEuro']]
        #print(usdeuro)

        litecoin = CryptoCrawler3('Litecoin', 'LTC', os.path.join(THIS_FOLDER, 'data/litecoin.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'), t2, sp500, usdeuro)
        ethereum = CryptoCrawler3('Ethereum', 'ETH', os.path.join(THIS_FOLDER, 'data/ethereum.csv'), os.path.join(THIS_FOLDER, 'data/newsPrep.csv'), t4, sp500, usdeuro)

        writingFiles(bitcoin, THIS_FOLDER)
        writingFiles(ethereum, THIS_FOLDER)
        writingFiles(litecoin, THIS_FOLDER)

        print('finished update')