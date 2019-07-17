import React from "react";
import Card2 from "../layout/Card2";
import Card from "../layout/Card";
// {props.match.params.coin}
const Cryptocurrency = props => {
   const { coin } = props.match.params;
  return (
    <div className="section has-background-light ">
      <div className="columns">
        <h1 className="title column" style={{ fontSize: "48px" }}>
          {coin}
        </h1>
      </div>
      <div className="columns is-mobile is-multiline">
         <Card2 />
         <Card2 />
         <Card2 />
         <Card2 />
      </div>
      <div className="columns is-mobile is-multiline">
         <Card title={coin} imageUrl={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"}/>
      </div>
    </div>
  );
};

export default Cryptocurrency;
