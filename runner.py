from crawler.cryptoCrawler import CryptoCrawler
from crawler.cryptoCrawler3 import CryptoCrawler3
from crawler import util
import os
import datetime
from datetime import timedelta
import subprocess
from crawler.tok import t2
from landonSimpleModels.bitcoin_model import bitcoinModel
from landonSimpleModels.litecoin_model import litecoinModel
from landonSimpleModels.ethereum_model import ethereumModel
import pandas as pd
import ray

@ray.remote
def bitcoin2(THIS_FOLDER):
    bitcoin = CryptoCrawler('Bitcoin', 'BTC', os.path.join(THIS_FOLDER, 'data/bitcoin.csv'), t2)
    return bitcoin

@ray.remote
def bitcoin3(bitcoin, THIS_FOLDER, sp500, usdeuro):
    bitcoin.dict['5min'] = pd.merge(bitcoin.dict['5min'], sp500, on='Time', sort=False, how='outer')
    bitcoin.dict['5min'] = pd.merge(bitcoin.dict['5min'], usdeuro, on='Time', sort=False, how='outer')
    util.writeFiles(bitcoin, THIS_FOLDER)
    bitcoinModel(os.path.join(THIS_FOLDER, 'landonSimpleModels/Bitcoin_5min_output.csv'),
                 os.path.join(THIS_FOLDER, 'ui/src/scraped/bitcoin/Bitcoin_model_output.js'))

@ray.remote
def litecoin2(THIS_FOLDER):
    litecoin = CryptoCrawler('Litecoin', 'LTC', os.path.join(THIS_FOLDER, 'data/litecoin.csv'), t2)
    return litecoin

@ray.remote
def litecoin3(litecoin, THIS_FOLDER, sp500, usdeuro):
    litecoin = CryptoCrawler('Litecoin', 'LTC', os.path.join(THIS_FOLDER, 'data/litecoin.csv'), t2)
    litecoin.dict['5min'] = pd.merge(litecoin.dict['5min'], sp500, on='Time', sort=False, how='outer')
    litecoin.dict['5min'] = pd.merge(litecoin.dict['5min'], usdeuro, on='Time', sort=False, how='outer')
    util.writeFiles(litecoin, THIS_FOLDER)
    litecoinModel(os.path.join(THIS_FOLDER, 'landonSimpleModels/Litecoin_5min_output.csv'),
                  os.path.join(THIS_FOLDER, 'ui/src/scraped/litecoin/Litecoin_model_output.js'))

@ray.remote
def ethereum2(THIS_FOLDER):
    ethereum = CryptoCrawler('Ethereum', 'ETH', os.path.join(THIS_FOLDER, 'data/ethereum.csv'), t2)
    return ethereum

@ray.remote
def ethereum3(ethereum, THIS_FOLDER, sp500, usdeuro):
    ethereum.dict['5min'] = pd.merge(ethereum.dict['5min'], sp500, on='Time', sort=False, how='outer')
    ethereum.dict['5min'] = pd.merge(ethereum.dict['5min'], usdeuro, on='Time', sort=False, how='outer')
    util.writeFiles(ethereum, THIS_FOLDER)
    ethereumModel(os.path.join(THIS_FOLDER, 'landonSimpleModels/Ethereum_5min_output.csv'),
                  os.path.join(THIS_FOLDER, 'ui/src/scraped/ethereum/Ethereum_model_output.js'))

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))


prevTime = datetime.datetime.now() + timedelta(minutes=-5)
while True:
    if (datetime.datetime.now() > prevTime + timedelta(minutes=5)):
        prevTime = datetime.datetime.now()
        print(datetime.datetime.now())
        p = subprocess.Popen(['scp',
                              'root@45.32.212.127:/root/cryptoPredict/tCrawler/{bitcoin.csv,litecoin.csv,ethereum.csv}',
                              os.path.join(THIS_FOLDER, 'data/')])
        sts = os.waitpid(p.pid, 0)

        print('download done')
        ray.init()
        bitcoin = bitcoin2.remote(THIS_FOLDER)
        ethereum = ethereum2.remote(THIS_FOLDER)
        litecoin = litecoin2.remote(THIS_FOLDER)
        print('coins done')

        sp500 = ray.get(bitcoin).setsp500()
        usdeuro = ray.get(bitcoin).setUSDEuroRate()

        bitcoin3.remote(ray.get(bitcoin), THIS_FOLDER, sp500, usdeuro)
        ethereum3.remote(ray.get(ethereum), THIS_FOLDER, sp500, usdeuro)
        litecoin3.remote(ray.get(litecoin), THIS_FOLDER, sp500, usdeuro)
        print('models done')
