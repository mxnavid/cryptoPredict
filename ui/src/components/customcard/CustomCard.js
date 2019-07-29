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

    this.state = { data: model_data, recents: model_data.slice(-6) };
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
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>Mins Ago</th>
                      <th>25</th>
                      <th>20</th>
                      <th>15</th>
                      <th>10</th>
                      <th>5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Trend</strong>
                      </td>
                      {this.state.recents[0].Pred_Signal === 1 ? (
                        <td>
                          <div className="has-text-success has-text-weight-bold">
                            <i class="fas fa-angle-double-up" />{" "}
                            &nbsp;&nbsp;&nbsp;Up
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="has-text-danger has-text-weight-bold">
                            <i class="fas fa-angle-double-down" />{" "}
                            &nbsp;&nbsp;&nbsp;Down
                          </div>
                        </td>
                      )}
                      {this.state.recents[1].Pred_Signal === 1 ? (
                        <td>
                          <div className="has-text-success has-text-weight-bold">
                            <i class="fas fa-angle-double-up" />{" "}
                            &nbsp;&nbsp;&nbsp;Up
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="has-text-danger has-text-weight-bold">
                            <i class="fas fa-angle-double-down" />{" "}
                            Down
                          </div>
                        </td>
                      )}
                      {this.state.recents[2].Pred_Signal === 1 ? (
                        <td>
                          <div className="has-text-success has-text-weight-bold">
                            <i class="fas fa-angle-double-up" />{" "}
                            Up
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="has-text-danger has-text-weight-bold">
                            <i class="fas fa-angle-double-down" />{" "}
                            Down
                          </div>
                        </td>
                      )}
                      {this.state.recents[3].Pred_Signal === 1 ? (
                        <td>
                          <div className="has-text-success has-text-weight-bold">
                            <i class="fas fa-angle-double-up" />{" "}
                            Up
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="has-text-danger has-text-weight-bold">
                            <i class="fas fa-angle-double-down" />{" "}
                            Down
                          </div>
                        </td>
                      )}
                      {this.state.recents[4].Pred_Signal === 1 ? (
                        <td>
                          <div className="has-text-success has-text-weight-bold">
                            <i class="fas fa-angle-double-up" />{" "}
                            Up
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="has-text-danger has-text-weight-bold">
                            <i class="fas fa-angle-double-down" />{" "}
                            Down
                          </div>
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>
                        <strong>Current</strong>
                      </td>
                      <td>${this.state.recents[0].Open.toFixed(2)}</td>
                      <td>${this.state.recents[1].Open.toFixed(2)}</td>
                      <td>${this.state.recents[2].Open.toFixed(2)}</td>
                      <td>${this.state.recents[3].Open.toFixed(2)}</td>
                      <td>${this.state.recents[4].Open.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Result</strong>
                      </td>
                      <td className={this.state.recents[1].Open > this.state.recents[0].Open ? "has-text-success" : "has-text-danger" }>${this.state.recents[1].Open.toFixed(2)}</td>
                      <td className={this.state.recents[2].Open > this.state.recents[1].Open ? "has-text-success" : "has-text-danger" }>${this.state.recents[2].Open.toFixed(2)}</td>
                      <td className={this.state.recents[3].Open > this.state.recents[2].Open ? "has-text-success" : "has-text-danger" }>${this.state.recents[3].Open.toFixed(2)}</td>
                      <td className={this.state.recents[4].Open > this.state.recents[3].Open ? "has-text-success" : "has-text-danger" }>${this.state.recents[4].Open.toFixed(2)}</td>
                      <td className={this.state.recents[5].Open > this.state.recents[4].Open ? "has-text-success" : "has-text-danger" }>${this.state.recents[5].Open.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : null}

              {this.props.multiLine ? (
                <MultiLineEx
                  modelData={this.props.modelData}
                  coin={this.props.coin}
                  x="v.Time"
                  y2="v.strategy_cu_return"
                  y="v.market_cu_return"
                />
              ) : null}

              {this.props.multiPrice ? (
                <MultiLineEx
                  modelData={this.props.modelData}
                  coin={this.props.coin}
                  x="v.Time"
                  y2="v.Open"
                  y="v.SMA"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
