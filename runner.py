from crawler.cryptoCrawler import CryptoCrawler
from crawler import util

bitcoin = CryptoCrawler("Bitcoin", "BTC", "data/cleanprep.csv")
util.writeSentimentCSV(bitcoin, "data/output/"+bitcoin.name+"_sentiment_output.csv")
print("Wrote sentiment values to CSV")
util.writeDictCSV(bitcoin.wiki, "data/output/"+bitcoin.name+"_wiki_output.csv")
print("Wrote wiki views to CSV")
util.writeHourlyCSV(bitcoin, "data/output/"+bitcoin.name+"_hourly_output.csv")
print("Wrote hourly value to CSV")

util.writeHourlyJson("data/output/"+bitcoin.name+"_hourly_output.csv", "data/output/"+bitcoin.name+"_hourly_output.json")