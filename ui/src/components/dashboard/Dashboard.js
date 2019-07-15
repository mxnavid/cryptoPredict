import React, { Component } from "react";


import LineEx from "../LineEx/LineEx";
import MultiLineEx from "../LineEx/MultiLineEx";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>Dashboard Component</p>

        <LineEx
          name="Bitcoin"
          label="Price"
          x="v.Time"
          y="v.Open"
          color="rgba(20,120,20,1)"
        />
        <LineEx
          name="Litecoin"
          label="Price"
          x="v.Time"
          y="v.Open"
          color="rgba(120,20,20,1)"
        />
        <LineEx
          name="Ethereum"
          label="Price"
          x="v.Time"
          y="v.Open"
          color="rgba(20,20,120,1)"
        />
        <MultiLineEx name="Price" x="v.Time" y="v.Open" />
        <MultiLineEx name="Sentiment" x="v.Time" y="v.Polarity" />
      </div>
    );
  }
}
