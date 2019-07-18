import React, { Component } from "react";
import Card from "../layout/Card";
import {data} from "../../data.js";

export default class Dashboard extends Component {
  render() {

    return (
      <div className="section ">
        <div className="columns is-multiline is-mobile" style={{backgroundColor: '#151E29'}}>
          <p className="title column has-text-white" style={{fontSize: '48px'}}>Dashboard</p>
        </div>
        <div className="columns is-multiline is-mobile" style={{backgroundColor: '#151E29'}}>

          {data.map(crypto => <Card title={crypto.name} imageUrl={crypto.logoUrl} color={crypto.color}/>)}

        </div>
      </div>
    );
  }
}
