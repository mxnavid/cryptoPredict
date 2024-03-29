import twitter
import json
import sys
from t import ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET


def get_tweets(api, screen_name):
    timeline = api.GetUserTimeline(screen_name=screen_name, count=200)
    earliest_tweet = min(timeline, key=lambda x: x.id).id
    print("getting tweets before:", earliest_tweet)

    while True:
        tweets = api.GetUserTimeline(
            screen_name=screen_name, max_id=earliest_tweet, count=200
        )
        new_earliest = min(tweets, key=lambda x: x.id).id

        if not tweets or new_earliest == earliest_tweet:
            break
        else:
            earliest_tweet = new_earliest
            print("getting tweets before:", earliest_tweet)
            timeline += tweets

    return timeline


if __name__ == "__main__":
    api = twitter.Api(CONSUMER_KEY, CONSUMER_SECRET,
                      ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)

    statuses = api.GetUserTimeline("961445378")
    # tweet = get_tweets(api, "officialmcafee")
    # print(tweet)

    screen_name = "officialmcafee"
    print(screen_name)
    timeline = get_tweets(api=api, screen_name="officialmcafee")
    print(timeline)
    with open('timeline.json', 'w+') as f:
        for tweet in timeline:
            f.write(json.dumps(tweet._json))
            f.write('\n')
