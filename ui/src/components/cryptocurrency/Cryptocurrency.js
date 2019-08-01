import React, { Component } from "react";

import CustomCard from "../customcard/CustomCard";
import { Link } from "react-router-dom";

class Cryptocurrency extends Component {
  importOutput = () => {
    let curr_model_data;

    let { model_data } = require("../../scraped/" +
      this.props.match.params.coin.toLowerCase() +
      "/" +
      this.props.match.params.coin +
      "_model_output.js");

    if (this.props.match.params.model !== "daily") {
      const { model_data } = require("../../scraped/" +
        this.props.match.params.coin.toLowerCase() +
        "/" +
        this.props.match.params.coin +
        "_model_output.js");
      curr_model_data = model_data;

      console.log("not daily");
    } else {
      console.log("daily");

      const { model_data } = require("../../scraped/" +
        this.props.match.params.coin.toLowerCase() +
        "/" +
        this.props.match.params.coin +
        "_day_model_output.js");
      curr_model_data = model_data;
    }

    this.state = {
      crypto_data: curr_model_data, // .slice(-100)
      last_one: curr_model_data[curr_model_data.length - 1],
      slice_data: curr_model_data.slice(-12)
    };
  };

  render() {
    const { coin } = this.props.match.params;
    return (
      <div key={coin} onLoad={this.importOutput()}>
        <section className="hero" style={{ backgroundColor: "#0018A8" }}>
          <div className="hero-body columns is-mobile is-multiline">
            <div className="column is-full-mobile is-full-tablet is-full-desktop is-one-third-widescreen is-one-third-fullhd">
              <h1
                className="title has-text-white"
                style={{ fontSize: "48px", marginBottom: "12px" }}
              >
                {coin}
              </h1>
              <Link
                to={"/cryptocurrency/" + coin + "/daily"}
                className="subtitle has-text-white"
                style={{ marginTop: 0 }}
              >
                5 Minute Model
              </Link>
            </div>
            <div className="column">
              <div className="columns is-mobile is-multiline">
                <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd has-text-white">
                  <div className="subtitle has-text-white">
                    Current Price &nbsp;&nbsp;
                    <i className="fas fa-donate" />{" "}
                  </div>
                  <div className="title has-text-info has-text-weight-bold">
                    ${this.state.last_one.Open.toFixed(2)}
                  </div>
                </div>

                <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd has-text-white">
                  <div className="subtitle has-text-white">
                    Est. Future Price &nbsp;&nbsp;
                    <i className="fas fa-coins" />{" "}
                  </div>
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

                <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd has-text-white">
                  <div className="subtitle has-text-white">
                    Prediction &nbsp;&nbsp;
                    <i className="fas fa-chart-line"> </i>
                  </div>
                  {this.state.last_one.Pred_Signal === 1 ? (
                    <div className="title has-text-success has-text-weight-bold">
                      <i className="fas fa-angle-double-up" />{" "}
                      &nbsp;&nbsp;&nbsp;Up
                    </div>
                  ) : (
                    <div className="title has-text-danger has-text-weight-bold">
                      <i className="fas fa-angle-double-down" />{" "}
                      &nbsp;&nbsp;&nbsp;Down
                    </div>
                  )}
                </div>

                <div className="column is-full-mobile is-half-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd has-text-white">
                  <div className="subtitle has-text-white">
                    Model Confidence &nbsp;&nbsp;
                    <i className="fas fa-balance-scale" />{" "}
                  </div>
                  <div className="title has-text-info has-text-weight-bold">
                    {(this.state.last_one.Score * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="columns is-mobile is-multiline ">
            <div className="column">
              <p className="title">Model Data</p>
            </div>
          </div>
          <div className="columns is-mobile is-multiline">
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Past Hour (Price)"
              graphTitle="Open"
              // multiPrice={true}
              lineGraph={true}
              // customWidth="3"
            />
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Previous Predictions"
              graphTitle="Pred_Signal"
              table={true}
              // customWidth="5"
            />
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Market Return vs Model Return"
              graphTitle="strategy_cu_return"
              multiLine={true}
              // customWidth="4"
            />
          </div>
          <div className="columns is-mobile is-multiline">
            <div className="column">
              <p className="title">Additional Info</p>
            </div>
          </div>
          <div className=" columns is-mobile is-multiline">
            {this.props.match.params.model === "daily" ? null : (
              <CustomCard
                modelData={this.state.crypto_data}
                coin={coin}
                cardTitle="Twitter Sentiment"
                graphTitle="Polarity"
                lineGraph={true}
                customWidth="one-quarter"
              />
            )}
            {this.props.match.params.model === "daily" ? null : (
              <CustomCard
                modelData={this.state.crypto_data}
                coin={coin}
                cardTitle={
                  this.props.match.params.model === "daily"
                    ? "Volume Coin Traded (Daily)"
                    : "Trade Volume"
                }
                graphTitle="VolumeCoin"
                lineGraph={true}
                customWidth="one-quarter"
              />
            )}
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Simple Moving Average"
              graphTitle="SMA"
              lineGraph={true}
              customWidth="one-quarter"
            />
            <CustomCard
              modelData={this.state.crypto_data}
              coin={coin}
              cardTitle="Parabolic Stop and Reverse"
              graphTitle="SAR"
              lineGraph={true}
              customWidth="one-quarter"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Cryptocurrency;
