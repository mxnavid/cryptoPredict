from crawler.cryptoCrawler import CryptoCrawler
from crawler import util

bitcoin = CryptoCrawler("Bitcoin", "BTC", "data/cleanprep.csv")
#util.writeSentimentCSV(bitcoin, "data/output/sentiment_output.csv")
#print("Wrote sentiment values to CSV")
util.writeDictCSV(bitcoin.wiki, "data/output/wiki_output.csv")
print("Wrote wiki views to CSV")
util.writeHourlyCSV(bitcoin, "data/output/hourly_output.csv")
print("Wrote hourly value to CSV")