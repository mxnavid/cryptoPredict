from crawler.cryptoCrawler import CryptoCrawler
from crawler.cryptoCrawler3 import CryptoCrawler3
from crawler import util
import os
from datetime import datetime
from datetime import timedelta
import subprocess
from crawler.tok import t2

def writingFiles(coin, THIS_FOLDER):
    util.writeFiles(coin, THIS_FOLDER)

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))


prevTime = datetime.now() + timedelta(minutes=-5)
while True:
    if (datetime.now() > prevTime + timedelta(minutes=5)):
        prevTime = datetime.now()
        print(datetime.now())
        p = subprocess.Popen(['scp', 'root@45.32.212.127:/root/cryptoPredict/tCrawler/{bitcoin.csv,litecoin.csv,ethereum.csv}',
                              os.path.join(THIS_FOLDER, 'data/')])

        sts = os.waitpid(p.pid, 0)

        bitcoin = CryptoCrawler('Bitcoin', 'BTC', os.path.join(THIS_FOLDER, 'data/bitcoin.csv'), t2)

        sp500 = bitcoin.dict['5min'][['Time','S&P500 Close', 'S&P500 Volume']]
        #print(sp500)
        usdeuro = bitcoin.dict['5min'][['Time', 'USDEuro']]
        #print(usdeuro)

        litecoin = CryptoCrawler3('Litecoin', 'LTC', os.path.join(THIS_FOLDER, 'data/litecoin.csv'), t2, sp500, usdeuro)
        ethereum = CryptoCrawler3('Ethereum', 'ETH', os.path.join(THIS_FOLDER, 'data/ethereum.csv'), t2, sp500, usdeuro)

        writingFiles(bitcoin, THIS_FOLDER)
        writingFiles(ethereum, THIS_FOLDER)
        writingFiles(litecoin, THIS_FOLDER)

        print('finished update data')
        print(datetime.now())
        exec(open(os.path.join(THIS_FOLDER, 'landonSimpleModels/bitcoin_model.py')).read());
        print('finished update model')
        print(datetime.now())