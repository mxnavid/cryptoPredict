import React, { Component } from "react";
import LineExNoScale from "../LineEx/LineExNoScale";

export default class CustomCard extends Component {
  constructor(props) {
    super(props);

    const { model_data } = require("../../scraped/" +
      props.coin.toLowerCase() +
      "/" +
      props.coin +
      "_model_output.js");

    this.state = { data: model_data, recents: model_data.slice(-12) };
  }

  render() {
    return (
      <div className="column">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{this.props.cardTitle}</p>
          </header>
          <div className="card-content">
            <div className="content">
              {this.props.lineGraph ? (
                <LineExNoScale
                  coin={this.props.coin}
                  time={1}
                  name={this.props.graphTitle}
                  label="Price"
                  x="v.Time"
                  y={"v." + this.props.graphTitle}
                  color="indigo"
                  // className="column"
                  show="false"
                />
              ) : (
                this.state.recents.map(newData => {
                  return (


                    <div>
                      <p>{newData.Pred_Signal}</p>
                    </div>


                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
