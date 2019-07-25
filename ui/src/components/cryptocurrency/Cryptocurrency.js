import React, { Component } from "react";
import Card2 from "../layout/Card2";
// import Card from "../card/Card";
import PageHeader from "../layout/PageHeader";
import CustomCard from "../customcard/CustomCard";

// {this.props.match.params.coin}
class Cryptocurrency extends Component {
  constructor(props) {
    super(props);

    // console.log(props.name);
    // if (props.match.params.coin === "Litecoin") {
    //   var {
    //     hourly_data
    //   } = require("../../scraped/litecoin/Litecoin_model_output.js");
    // } else if (props.match.params.coin === "Ethereum") {
    //   var {
    //     hourly_data
    //   } = require("../../scraped/ethereum/Ethereum_model_output.js");
    // } else {
    //   var {
    //     hourly_data
    //   } = require("../../scraped/bitcoin/Bitcoin_model_output.js");
    // }

    const {
      model_data
    } = require("../../scraped/" + props.match.params.coin.toLowerCase() + "/" + props.match.params.coin + "_model_output.js");


    this.state = {
      model_data: model_data
    };
  }

  render() {
    const { coin } = this.props.match.params;
    return (
      <div key={coin}>
        <PageHeader title={coin} hasST={false} />
        <section className="section">
          <div className="columns">
            <div className="column">
              <p className="title">Model Predictions</p>
            </div>
          </div>
          <div className="columns">
            <CustomCard coin={coin} cardTitle="Price Trend" graphTitle="Open" />
            <CustomCard
              coin={coin}
              cardTitle="Previous Predictions From Model"
              graphTitle="Pred_Signal"
            />
            <CustomCard
              coin={coin}
              cardTitle="Market Return vs Model Return (WIP)"
              graphTitle="Return"
            />
          </div>
          {/* </section>
      <section className="section"> */}
          <div className="columns">
            <div className="column">
              <p className="title">Additonal Info</p>
            </div>
          </div>
          <div className="columns">
            <CustomCard
              coin={coin}
              cardTitle="Sentiment"
              graphTitle="Polarity"
            />
            <CustomCard
              coin={coin}
              cardTitle="Volume Coin Traded"
              graphTitle="VolumeCoin"
            />
            <CustomCard coin={coin} cardTitle="RSI" graphTitle="RSI" />
            <CustomCard coin={coin} cardTitle="SAR" graphTitle="SAR" />
          </div>
        </section>
      </div>
    );
  }
}

export default Cryptocurrency;
