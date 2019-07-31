import React, { Component } from "react";
import Card from "../card/Card";
import { data } from "../../data.js";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    let bitcoin_data;
    let ethereum_data;
    let litecoin_data;

    if (true) {
      let {
        model_data
      } = require("../../scraped/bitcoin/Bitcoin_model_output.js");
      bitcoin_data = model_data;
    }
    if (true) {
      let {
        model_data
      } = require("../../scraped/ethereum/Ethereum_model_output.js");
      ethereum_data = model_data;
    }
    if (true) {
      let {
        model_data
      } = require("../../scraped/litecoin/Litecoin_model_output.js");
      litecoin_data = model_data;
    }

    this.state = {
      bitcoin_data: bitcoin_data, // .slice(-100)
      ethereum_data: ethereum_data, // .slice(-100)
      litecoin_data: litecoin_data // .slice(-100)
      //  last_one: model_data[model_data.length - 1],
      //  slice_data: model_data.slice(-12)
    };
  }

  render() {
    return (
      <div>
        <section className="hero" style={{ backgroundColor: "#0518A8" }}>
          <div className="hero-body columns">
            <div className="column is-two-fifths">
              <h1 className="title has-text-white" style={{ fontSize: "48px" }}>
                Dashboard
              </h1>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column has-text-white">
                  <div className="subtitle has-text-white">
                    Comparing &nbsp;&nbsp;
                    <i className="fas fa-donate" />{" "}
                  </div>
                  <div className="title has-text-info has-text-weight-bold">
                    Price
                  </div>
                </div>

                <div className="column has-text-white">
                  <div className="subtitle has-text-white">
                    Updating In... &nbsp;&nbsp;
                    <i className="fas fa-clock" />{" "}
                  </div>
                  <div className="title has-text-danger has-text-weight-bold">
                    5 minutes
                  </div>
                </div>

                <div className="column has-text-white">
                  <div className="subtitle has-text-white">
                    Today's Date &nbsp;&nbsp;
                    <i className="fas fa-calendar" />{" "}
                  </div>
                  <div className="title has-text-success has-text-weight-bold">
                    8/2/2019
                  </div>
                </div>

                {/* <div className="column has-text-white">
                  <div className="subtitle has-text-white">
                    Showing &nbsp;&nbsp;
                    <i className="fas fa-calendar" />{" "}
                  </div>
                  <div className="title has-text-grey-light has-text-weight-bold">
                    Separately <i className="far fa-edit" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns ">
            {data.map((crypto, num) => {
              // console.log(num);
              return (
                <Card
                  key={num}
                  num={num}
                  cardTitle={crypto.name}
                  title={crypto.name}
                  imageUrl={crypto.logoUrl}
                  color={crypto.color}
                  yMin={-0.3}
                  yMax={0.3}
                  label="Open"
                  multiLine={false}
                  showStuff={true}
                />
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
