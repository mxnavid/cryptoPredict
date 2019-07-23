import React, {Component} from "react";
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

// {this.props.match.params.coin}
class Cryptocurrency extends Component {

  constructor(props) {
    super(props);
    

      // console.log(props.name);
      if (props.match.params.coin == "Litecoin") {
        var { hourly_data } = require("../../scraped/litecoin/Litecoin_5min_output.js");
      } else if (props.match.params.coin == "Ethereum") {
        var { hourly_data } = require("../../scraped/ethereum/Ethereum_5min_output.js");
      } else {
        var { hourly_data } = require("../../scraped/bitcoin/Bitcoin_5min_output.js");
      }

      this.state = {
        hourly_data: hourly_data,
      }
  }



  render() {
  const { coin } = this.props.match.params;
  return (
    <div>
      <section class="hero has-background-link	">
        <div class="hero-body columns">
          <div className="column is-one-quarter" >
            <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
              {coin}
            </h1>
            <h2 class="subtitle has-text-white" style={{ fontSize: "28px" }}>
              Data
            </h2>
          </div>

          <Card2 title="Open" data={this.state.hourly_data[0].Open} />
          <Card2 title="Close" data={this.state.hourly_data[0].Close} />
          <Card2 title="High" data={this.state.hourly_data[0].High} />
          <Card2 title="Low" data={this.state.hourly_data[0].Low} />
          

        </div>
      </section>
      <section className="section">
        <div className="columns">
          <Card
            title={coin}
            imageUrl={""}
            color={"#3272dc"}
            label="Polarity"
            yMin={-0.3}
            yMax={0.3}
            multiLine={false}
            showStuff={false}
          />
          <Card
            title={coin}
            imageUrl={""}
            color={"#3272dc"}
            label="VolumeUSD"
            yMin={-0.3}
            yMax={0.3}
            multiLine={false}
            showStuff={false}
          />
          <Card
            title={coin}
            imageUrl={""}
            color={"#3272dc"}
            label="VolumeCoin"
            yMin={-0.3}
            yMax={0.3}
            multiLine={false}
            showStuff={false}
          />
          {/* <Card
            title={coin}
            imageUrl={""}
            color={"#fff"}
            label="VolumeUSD"
            yMin={1000000}
            yMax={50000000}
            multiLine={false}
          /> */}
          {/* <Card
            title={coin}
            imageUrl={""}
            color={"#fff"}
            label="Polarity"
            yMin={-0.3}
            yMax={0.3}
            multiLine={true}
          /> */}
        </div>
      </section>
    </div>
  );
}
};

export default Cryptocurrency;
