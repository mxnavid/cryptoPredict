import React from "react";
import LineExNoScale from "../LineEx/LineExNoScale";

export default function CustomCard(props) {
  return (
   <div className="column">
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{props.cardTitle}</p>
      </header>
      <div className="card-content">
        <div className="content">
         {console.log(props.coin)}
          <LineExNoScale
            coin={props.coin}
            time={1}
            name={props.graphTitle}
            label="Price"
            x="v.Time"
            y={"v."+props.graphTitle}
            color="indigo"
            // className="column"
            show="false"
          />
        </div>
      </div>
    </div>
    </div>
  );
}
