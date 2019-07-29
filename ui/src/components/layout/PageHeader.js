import React from "react";

export default function PageHeader(props) {
  return (
    <section class="hero" style={{ backgroundColor: "#0018A8" }}>
      <div class="hero-body columns">
        <div className="column">
          <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
            {props.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
