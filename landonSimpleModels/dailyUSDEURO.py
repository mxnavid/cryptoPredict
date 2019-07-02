import urllib.request
import json
import csv
import pandas as pd
from datetime import timedelta, date
def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)
start_date = date(2017,1,1)
end_date = date(2019,5,1)
for single_date in daterange(start_date, end_date):
    bob = "https://api.exchangeratesapi.io/"+ single_date.strftime("%Y-%m-%d") + "?symbols=USD"
    read = urllib.request.urlopen(bob).read().decode('utf-8')
    k = json.loads(read)
    USDs = (k['rates']['USD'])
    print(USDs)
    #will figure out how/if we want to add this to csv in collumn, but need to do
    # so by date index, and we don't have that yet
#bob = "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2019-01-01&symbols=USD"
#read = urllib.request.urlopen(bob).read().decode('utf-8')
#k = json.loads(read)
#print(k)
