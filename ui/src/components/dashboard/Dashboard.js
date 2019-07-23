import React, { Component } from "react";
import Card from "../layout/Card";
import { data } from "../../data.js";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <section class="hero has-background-link	">
          <div class="hero-body columns">
            <div className="column" >
              <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
                Dashboard
              </h1>
              <h2 class="subtitle has-text-white" style={{ fontSize: "28px" }}>
                Cryptocurrently
              </h2>
            </div>
          </div>
        </section>

        <section className="section">
          {/* <div className="columns is-multiline is-mobile">
            <p className="title column" style={{ fontSize: "48px" }}>
              Dashboard
            </p>
          </div> */}
          <div className="columns ">
            {data.map((crypto, num) => {
              console.log(num);
              return (
                <Card
                  num={num}
                  cardTitle={crypto.name}
                  title={crypto.name}
                  imageUrl={crypto.logoUrl}
                  color={crypto.color}
                  yMin={-0.3}
                  yMax={0.3}
                  label="Open"
                  multiLine={false}
                  showStuff={true}
                />
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
