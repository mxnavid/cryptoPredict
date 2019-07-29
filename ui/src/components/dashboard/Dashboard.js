import React, { Component } from "react";
import Card from "../card/Card";
import { data } from "../../data.js";
import PageHeader from "../layout/PageHeader";

export default class Dashboard extends Component {

  

  render() {
    return (
      <div>
        <PageHeader title="Dashboard" />

        <section className="section">
          <div className="columns ">
            {data.map((crypto, num) => {
              // console.log(num);
              return (
                <Card
                  key={num}
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
