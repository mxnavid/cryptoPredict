import React, { Component } from "react";
import { Link } from "react-router-dom";
import LineEx from "../LineEx/LineEx";

export default class Card2 extends Component {
  constructor(props) {
    super(props);

    const { model_data } = require("../../scraped/" +
      props.title.toLowerCase() +
      "/" +
      props.title +
      "_model_output.js");

    if (props.graphLabel === "Open") {
      this.state = {
        data: model_data[model_data.length - 1].Open,
      };
    }
    else if (props.graphLabel === "Pred_Signal") {
      this.state = {
        data: model_data[model_data.length - 1].Pred_Signal,
      };
    }
    else if (props.graphLabel === "high") {
      this.state = {
        data: model_data[model_data.length - 1].high,
      };
    }
  }

  render() {
    return (
      <div className="column">
        <p className="has-text-white subtitle is-vertical-center">
          {this.props.label}: {this.props.graphLabel !== "Pred_Signal" ? "$" : null}
          {this.state.data}
        </p>
      </div>
    );
  }
}
