import React, { Component } from "react";
import Card from "../layout/Card";

export default class Dashboard extends Component {
  render() {

    const cryptos = [
      {name: 'Bitcoin',
       logoUrl: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'},
      {name: 'Ethereum',
       logoUrl: 'https://ae01.alicdn.com/kf/HTB1RTrloInI8KJjSsziq6z8QpXaQ/6000pcs-lot-4x4cm-ethereum-logo-stickers-Self-adhesive-cryptocurrency-label-Item-No-FS17.jpg_640x640.jpg'}, 
      {name: 'Litecoin', 
       logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Litecoin_Logo.jpg/768px-Litecoin_Logo.jpg'}]

    return (
      <div className="section has-background-light ">
        <div className="columns is-multiline is-mobile">
          {cryptos.map(crypto => <Card title={crypto.name} imageUrl={crypto.logoUrl}/>)}
        </div>
      </div>
    );
  }
}
