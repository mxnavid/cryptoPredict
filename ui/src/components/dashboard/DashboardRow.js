import React, { Component } from "react";
import CustomCard from "../customcard/CustomCard";

export default class DashboardRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        {/* <div className="columns"> */}
          <div className="column">
            <p className="title">{this.props.coin}</p>
          </div>
        {/* </div> */}
        {/* <div className="columns"> */}
          {/* <div className="column"> */}
            <CustomCard
               // customWidth="is-two-fifths"
              cardTitle={this.props.cardTitle}
              modelData={this.props.data}
              coin={this.props.coin}
              graphTitle="Open"
              // multiPrice={true}
              lineGraph={true}
            />
          {/* </div> */}
          <div className="column ">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Additional {this.props.cardTitle} Data
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p>Open: </p>
                  <p>Close: </p>
                  <p>High: </p>
                  <p>Low: </p>
                  <p>Future Price: </p>
                </div>
              </div>
            </div>
          </div>
          <CustomCard
               // customWidth="is-two-fifths"
              cardTitle="Sentiment"
              modelData={this.props.data}
              coin={this.props.coin}
              graphTitle="Polarity"
              // multiPrice={true}
              lineGraph={true}
            />
        {/* </div> */}
      </section>
    );
  }
}
