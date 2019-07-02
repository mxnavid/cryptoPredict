from t import key
from newsapi import NewsApiClient
import json

api = NewsApiClient(api_key=key)

all_articles = api.get_everything(q='bitcoin',
                                      sources='bbc-news,the-verge, financial-post, business-insider,\
                                             crypto-coins-news, bloomberg, cbs-news \
                                            cnbc, cnn, daily-mail, the-economist, techcrunch,\
                                            the-huffington-post, the-wall-street-journal, the-washington-post, \
                                             usa-today, time, wired',
                                      
                                      from_param='2019-06-30',
                                      to='2019-07-01',
                                      language='en',
                                      sort_by='relevancy',
                                      page=2)


def writer():
    dump = json.dumps(all_articles)
    y = json.loads(dump)
    
    with open("ee.json", 'w+') as e:
        e.write(str(y))
    articleNumber = y["totalResults"]
    lele = len(y["articles"])
    print(lele)
    with open("output.csv", 'a') as writer:
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
            writer.write(publishTime + "," +  title + "," + description + "," + publisher + "\n")
            # with open("output.txt", "w+") as writer:
    #     writer.write(all_articles)

# print(all_articles)


writer()