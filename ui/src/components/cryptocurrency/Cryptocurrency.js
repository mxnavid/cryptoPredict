import React from "react";
import Card2 from "../layout/Card2";
// {props.match.params.coin}
const Cryptocurrency = props => {
  return (
    <div className="section has-background-light ">
      <div className="columns">
        <h1 className="title column" style={{ fontSize: "48px" }}>
          {props.match.params.coin}
        </h1>
      </div>
      <div className="columns is-mobile is-multiline">
         <Card2 />
         <Card2 />
         <Card2 />
         <Card2 />
      </div>
    </div>
  );
};

export default Cryptocurrency;
