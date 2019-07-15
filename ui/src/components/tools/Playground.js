import React from "react";

import LineEx from "../LineEx/LineEx";
import MultiLineEx from "../LineEx/MultiLineEx";

const Playground = () => {
  return (
    <div className="section">
      <div className="columns">
        <LineEx
          name="Bitcoin"
          label="Price"
          x="v.Time"
          y="v.Open"
          color="rgba(20,120,20,1)"
          className="column"
        />
        <LineEx
          name="Litecoin"
          label="Price"
          x="v.Time"
          y="v.Open"
          color="rgba(120,20,20,1)"
          className="column"
        />
        <LineEx
          name="Ethereum"
          label="Price"
          x="v.Time"
          y="v.Open"
          color="rgba(20,20,120,1)"
          className="column"
        />
      </div>
      <div className="columns">
        <MultiLineEx
          name="Price"
          x="v.Time"
          y="v.Open"
          className="column is-half"
        />
        <MultiLineEx
          name="Sentiment"
          x="v.Time"
          y="v.Polarity"
          className="column is-half"
        />
      </div>
    </div>
  );
}

export default Playground;