from t import key
from newsapi import NewsApiClient
import json
import datetime

api = NewsApiClient(api_key=key)

all_articles = api.get_everything(
    q='bitcoin',
    sources='bbc-news,the-verge, financial-post, business-insider,\
                                             crypto-coins-news, bloomberg, cbs-news \
                                            cnbc, cnn, daily-mail, the-economist, techcrunch,\
                                            the-huffington-post, the-wall-street-journal, the-washington-post, \
                                             usa-today, time, wired',
    from_param='2019-07-30',
    to='2019-07-01',
    language='en',
    sort_by='relevancy',
    page=2)


def api_col(fromDate, toDate, coin):
    all_articles = api.get_everything(
        q=coin,
        sources='bbc-news,the-verge, financial-post, business-insider,\
                                             crypto-coins-news, bloomberg, cbs-news \
                                            cnbc, cnn, daily-mail, the-economist, techcrunch,\
                                            the-huffington-post, the-wall-street-journal, the-washington-post, \
                                             usa-today, time, wired',
        from_param=str(fromDate),
        to=str(toDate),
        language='en',
        sort_by='relevancy',
        page=2)
    dump = json.dumps(all_articles)
    y = json.loads(dump)
    return y


def writer(coinName, y):
    articleNumber = y["totalResults"]
    lele = len(y["articles"])
    print(lele)
    if coinName == 'bitcoin':
        fileName = 'btc.csv'
    elif coinName == 'ethereum':
        fileName = 'eth.csv'
    else:
        fileName = 'ltc.csv'
    with open(fileName, 'a') as writer:
        for x in range(0, lele):
            r = y["articles"][x]
            dumper = json.dumps(r)
            parser = json.loads(dumper)
            title = parser["title"]
            title = str(title)
            title = title.replace(",", "")
            title = title.replace("\n", "")
            description = parser["description"]
            description = str(description)
            description = description.replace(",", "")
            description = description.replace("\n", "")
            publishTime = parser["publishedAt"]
            publisher = parser["source"]["name"]
            writer.write(publishTime + "," + title + "," + description + "," +
                         publisher + "\n")


def processor():

    datePrev = datetime.datetime(2019, 7, 18).date()
    dateLater = datetime.datetime(2019, 7, 19).date()

    for i in range(0, 10):
        datePrev += datetime.timedelta(days=1)
        dateLater += datetime.timedelta(days=1)
        for x in range(0, 2):
            if x == 0:
                responseBTC = api_col(datePrev, dateLater, 'bitcoin')
                writer('bitcoin', responseBTC)
                print("BTC executed")
            elif x == 1:
                responseETH = api_col(datePrev, dateLater, 'ethereum')
                writer('ethereum', responseETH)
                print("ETH executed")

            else:
                responseLTC = api_col(datePrev, dateLater, 'litecoin')
                writer('litecoin', responseLTC)
                print("LTC Executed")


processor()