import React, { Component } from "react";
import Card2 from "../layout/Card2";
// import Card from "../card/Card";
import PageHeader from "../layout/PageHeader";
import CustomCard from "../customcard/CustomCard";

// {this.props.match.params.coin}
class Cryptocurrency extends Component {

  constructor(props) {
    super(props);

    const { model_data } = require("../../scraped/" +
      this.props.match.params.coin.toLowerCase() +
      "/" +
      this.props.match.params.coin +
      "_model_output.js");

    this.state = {
      model_data: model_data
    };

    // console.log(this.state.model_data);
  }


  render() {
    const { coin } = this.props.match.params;
    return (
      <div key={coin}>
        {/* <Card2 title={coin} data={this.state.model_data[this.state.model_data.length - 1].Open} /> */}
        <PageHeader title={coin} hasST={false} showPriceInfo={true}/>
        <section className="section">
          <div className="columns">
            <div className="column">
              <p className="title">Model Predictions</p>
            </div>
          </div>
          <div className="columns">
            <CustomCard
              coin={coin}
              cardTitle="Price Trend"
              graphTitle="Open"
              lineGraph={true}
            />
            <CustomCard
              coin={coin}
              cardTitle="Previous Predictions From Model"
              graphTitle="Pred_Signal"
              lineGraph={false}
            />
            <CustomCard
              coin={coin}
              cardTitle="Market Return vs Model Return (WIP)"
              graphTitle="strategy_cu_return"
              lineGraph={true}
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
              lineGraph={true}
            />
            <CustomCard
              coin={coin}
              cardTitle="Volume Coin Traded"
              graphTitle="VolumeCoin"
              lineGraph={true}
            />
            <CustomCard
              coin={coin}
              cardTitle="RSI"
              graphTitle="RSI"
              lineGraph={true}
            />
            <CustomCard
              coin={coin}
              cardTitle="SAR"
              graphTitle="SAR"
              lineGraph={true}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Cryptocurrency;
