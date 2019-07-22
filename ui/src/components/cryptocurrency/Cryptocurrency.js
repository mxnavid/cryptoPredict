import React from "react";
import Card2 from "../layout/Card2";
import Card from "../layout/Card";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from "react-twitter-embed";
import bitcoindata from "../../scraped/bitcoin/Bitcoin_5min_output.js";

// {props.match.params.coin}
const Cryptocurrency = props => {
  const { coin } = props.match.params;
  return (
    <div>
      <section class="hero has-background-link	">
        <div class="hero-body columns is-mobile">
          <div className="column is-one-quarter" style={{ padding: " 27px 90px" }}>
            <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
              {coin}
            </h1>
            <h2 class="subtitle has-text-white" style={{ fontSize: "28px" }}>
              Data
            </h2>
          </div>

          <Card2 title="Open" data={bitcoindata.hourly_data[0].Open} />
          <Card2 title="Close" data={bitcoindata.hourly_data[0].Close} />
          <Card2 title="High" data={bitcoindata.hourly_data[0].High} />
          <Card2 title="Low" data={bitcoindata.hourly_data[0].Low} />
          

        </div>
      </section>
      <section className="section">
        <div className="columns is-mobile is-multiline">
          <Card
            title={coin}
            imageUrl={""}
            color={"#fff"}
            label="Polarity"
            yMin={-0.3}
            yMax={0.3}
            multiLine={false}
          />
          <Card
            title={coin}
            imageUrl={""}
            color={"#fff"}
            label="VolumeUSD"
            yMin={1000000}
            yMax={50000000}
            multiLine={false}
          />
          <Card
            title={coin}
            imageUrl={""}
            color={"#fff"}
            label="Polarity"
            yMin={-0.3}
            yMax={0.3}
            multiLine={true}
          />
        </div>
      </section>
    </div>
  );
};

export default Cryptocurrency;
