import React from "react";
import Card2 from "../layout/Card2";
import Card from "../layout/Card";

import bitcoindata from "../../scraped/bitcoin/Bitcoin_hourly_output";
import ethereumdata from "../../scraped/ethereum/Ethereum_hourly_output";
import litecoindata from "../../scraped/litecoin/Litecoin_hourly_output";
// {props.match.params.coin}
const Cryptocurrency = props => {
   const { coin } = props.match.params;
  return (
    <div className="section " style={{backgroundColor: 'transparent'}}>
      <div className="columns">
        <h1 className="title column" style={{ fontSize: "48px" }}>
          {coin}
        </h1>
      </div>
      <div className="columns is-mobile is-multiline">
         <Card2 title="Open" data={bitcoindata.hourly_data[0].Open}/>
         <Card2 title="Close" data={bitcoindata.hourly_data[0].Close}/>
         <Card2 title="High" data={bitcoindata.hourly_data[0].High}/>
         <Card2 title="Low" data={bitcoindata.hourly_data[0].Low}/>
      </div>
      <div className="columns is-mobile is-multiline">
         <Card title={coin} imageUrl={""} color={'#fff'} label="Polarity" yMin={-0.3} yMax={0.3} multiLine={false}/ >
         <Card title={coin} imageUrl={""} color={'#fff'} label="VolumeUSD" yMin={1000000} yMax={50000000} multiLine={false}/ >
         <Card title={coin} imageUrl={""} color={'#fff'} label="Polarity" yMin={-0.3} yMax={0.3} multiLine={true}/ >
      </div>
    </div>
  );
};

export default Cryptocurrency;
