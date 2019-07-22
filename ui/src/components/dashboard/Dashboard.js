import React, { Component } from "react";
import Card from "../layout/Card";
import {data} from "../../data.js";

export default class Dashboard extends Component {
  render() {

    return (
      <div className="section " style={{backgroundColor: '#141d26'}}>
        <div className="columns is-multiline is-mobile" style={{backgroundColor: '#151E29'}}>
          <p className="title column has-text-white" style={{fontSize: '48px'}}>Dashboard</p>
        </div>
        <div className="columns is-multiline is-mobile" style={{backgroundColor: '#151E29'}}>

          {data.map(crypto => <Card title={crypto.name} imageUrl={crypto.logoUrl} color={crypto.color} yMin={-0.3} yMax={0.3} label="Polarity" multiLine={false}/>)}

        </div>
      </div>
    );
  }
}
