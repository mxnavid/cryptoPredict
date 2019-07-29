import React, { Component } from "react";

import PageHeader from "../layout/PageHeader";
import CustomCard from "../customcard/CustomCard";

class Cryptocurrency extends Component {
  constructor(props) {
    super(props);
  }

  importOutput = () => {
    const { model_data } = require("../../scraped/" +
      this.props.match.params.coin.toLowerCase() +
      "/" +
      this.props.match.params.coin +
      "_model_output.js");

    this.state = {
      crypto_data: model_data, // .slice(-100)
      last_one: model_data[model_data.length - 1],
      slice_data: model_data.slice(-12)
    };
  };

  render() {
    const { coin } = this.props.match.params;
    return (
      <div key={coin} onLoad={this.importOutput()}>

        <section class="hero" style={{ backgroundColor: "#0018A8" }}>
          <div class="hero-body columns">
            <div className="column">
              <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
                {coin}
              </h1>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column has-text-white">
                  <div className="subtitle has-text-white">Current Price &nbsp;&nbsp;<i class="fas fa-donate"></i> </div>
                  <div className="title has-text-info has-text-weight-bold">
                    ${this.state.last_one.Open.toFixed(2)}
                  </div>
                  {/* <p>5 minutes ago</p> */}
                </div>



                <div className="column has-text-white">
                  <div className="subtitle has-text-white">Future Price &nbsp;&nbsp;<i class="fas fa-coins"></i> </div>
                  {this.state.last_one.Pred_Signal === 1 ? (
                    <div className="title has-text-success has-text-weight-bold">
                      ${this.state.last_one.FuturePrice.toFixed(2)}
                    </div>
                  ) : (
                    <div className="title has-text-danger has-text-weight-bold">
                      ${this.state.last_one.FuturePrice.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="column has-text-white">
                  <div className="subtitle has-text-white">Trend &nbsp;&nbsp;<i class="fas fa-chart-line"> </i></div>
                  {this.state.last_one.Pred_Signal === 1 ? (
                    <div className="title has-text-success has-text-weight-bold">
                      <i class="fas fa-angle-double-up" /> &nbsp;&nbsp;&nbsp;Up
                    </div>
                  ) : (
                    <div className="title has-text-danger has-text-weight-bold">
                      <i class="fas fa-angle-double-down" /> &nbsp;&nbsp;&nbsp;Down
                    </div>
                  )}

                </div>

                <div className="column has-text-white">
                  <div className="subtitle has-text-white">Trend Confidence &nbsp;&nbsp;<i class="fas fa-donate"></i> </div>
                  <div className="title has-text-info has-text-weight-bold">
                    {this.state.last_one.Score.toFixed(4) * 100}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="columns">
            <div className="column">
              <p className="title">Model Predictions</p>
            </div>
          </div>
          <div className="columns">
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Price Trend"
              graphTitle="Open"
              // multiPrice={true}
              lineGraph={true}
            />
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Previous Predictions From Model"
              graphTitle="Pred_Signal"
              table={true}
            />
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Market Return vs Model Return (WIP)"
              graphTitle="strategy_cu_return"
              multiLine={true}
            />
          </div>
          <div className="columns">
            <div className="column">
              <p className="title">Additonal Info</p>
            </div>
          </div>
          <div className="columns">
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Sentiment"
              graphTitle="Polarity"
              lineGraph={true}
            />
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Volume Coin Traded"
              graphTitle="VolumeCoin"
              lineGraph={true}
            />
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="RSI"
              graphTitle="RSI"
              lineGraph={true}
            />
            <CustomCard
              modelData={this.state.crypto_data}
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
