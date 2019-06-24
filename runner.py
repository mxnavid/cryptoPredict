from crawler.cryptoCrawler import CryptoCrawler
from crawler import util

bitcoin = CryptoCrawler("Bitcoin", "20180101", "20180107")
util.writeSentimentCSV(bitcoin, "data/output/sentiment_output.csv")
print("Wrote sentiment values to CSV")
util.writeDictCSV(bitcoin.wiki, "data/output/wiki_output.csv")
print("Wrote wiki views to CSV")
util.writeDictCSV(bitcoin.hourlyprice, "data/output/hourlyprice_output.csv")
print("Wrote hourly value to CSV")
util.writeDictCSV(bitcoin.hourlyvolume, "data/output/hourlyvolume_output.csv")
print("Wrote hourly volume to CSV")