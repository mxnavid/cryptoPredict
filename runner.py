from crawler.cryptoCrawler import CryptoCrawler
from crawler import util

bitcoin = CryptoCrawler("Bitcoin", "20180101", "20180107")
util.writeSentimentCSV(bitcoin, "data/sentiment_output.csv")
print("Wrote sentiment values to CSV")
util.writeDictCSV(bitcoin.wiki, "data/wiki_output.csv")
print("Wrote wiki views to CSV")
util.writeDictCSV(bitcoin.dailyprice, "data/dailyprice_output.csv")
print("Wrote daily value to CSV")