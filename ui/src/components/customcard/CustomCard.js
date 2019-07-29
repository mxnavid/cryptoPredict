import React, { Component } from "react";
import LineExNoScale from "../LineEx/LineExNoScale";
import MultiLineEx from "../LineEx/MultiLineEx";

export default class CustomCard extends Component {
  constructor(props) {
    super(props);

    const { model_data } = require("../../scraped/" +
      props.coin.toLowerCase() +
      "/" +
      props.coin +
      "_model_output.js");

    this.state = { data: model_data, recents: model_data.slice(-5) };
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
                  modelData={this.props.modelData}
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
              ) : null}

              {this.props.table ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Minutes Ago</th>
                      <th>25</th>
                      <th>20</th>
                      <th>15</th>
                      <th>10</th>
                      <th>5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr> 
                      <td><strong>Model Prediction</strong></td>
                      <td>{this.state.recents[0].Pred_Signal}</td>
                      <td>{this.state.recents[0].Pred_Signal}</td>
                      <td>{this.state.recents[0].Pred_Signal}</td>
                      <td>{this.state.recents[0].Pred_Signal}</td>
                      <td>{this.state.recents[0].Pred_Signal}</td>
                    </tr>
                    <tr>
                      <td><strong>Result Price</strong></td>
                      <td>${this.state.recents[0].Open}</td>
                      <td>${this.state.recents[1].Open}</td>
                      <td>${this.state.recents[2].Open}</td>
                      <td>${this.state.recents[3].Open}</td>
                      <td>${this.state.recents[4].Open}</td>
                    </tr>
                  </tbody>
                </table>
              ) : null}

              {this.props.multiLine ? 
              <MultiLineEx 
              modelData={this.props.modelData}
              coin={this.props.coin}
              x="v.Time"
              y2="v.strategy_cu_return"
              y="v.market_cu_return" />
              : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
