import React from "react";
import Card2 from "./Card2";

export default function PageHeader(props) {
  return (
    <section class="hero" style={{ backgroundColor: "#0018A8" }}>
      <div class="hero-body columns">
        <div className="column">
          <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
            {props.title}
          </h1>
          {props.hasST ? (
            <h2 class="subtitle has-text-white" style={{ fontSize: "28px" }}>
              {props.subtitle}
            </h2>
          ) : null}
        </div>

        {props.showPriceInfo ? (
          <div className="column columns">
            <Card2 title={props.title} label="Price" graphLabel="Open" />
            <Card2 title={props.title} label="Anticipated Price Range" graphLabel="high" />
            <Card2 title={props.title} label="Pred_Signal" graphLabel="Pred_Signal" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
