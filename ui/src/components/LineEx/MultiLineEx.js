import React from 'react';
import {Line} from 'react-chartjs-2';

class MultiLineEx extends React.Component {
  constructor(props) {
    super(props)
    var {hourly_data} = require("../../Bitcoin_hourly_output.js");
    var bitcoin_data = hourly_data
    var {hourly_data} = require("../../Litecoin_hourly_output.js");
    var litecoin_data = hourly_data
    var {hourly_data} = require("../../Ethereum_hourly_output.js");
    var ethereum_data = hourly_data

    const x = bitcoin_data.map(v => (eval(props.x)));
    const y = bitcoin_data.map(v => (eval(props.y)));
    const y2 = litecoin_data.map(v => (eval(props.y)));
    const y3 = ethereum_data.map(v => (eval(props.y)));


    this.data = {
      labels: x,
      datasets: [
      {
        label: 'Bitcoin',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(20,120,20,1)',
        borderColor: 'rgba(20,120,20,1)',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(20,120,20,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(20,120,20,1)',
        pointHoverBorderColor: 'rgba(20,120,20,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        data: y
      },
        {
          label: 'Litecoin',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(120,20,20,1)',
          borderColor: 'rgba(120,20,20,1)',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(120,20,20,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(120,20,20,1)',
          pointHoverBorderColor: 'rgba(120,20,20,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: y2
        },
        {
          label: 'Ethereum',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(20,20,120,1)',
          borderColor: 'rgba(20,20,120,1)',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(20,20,120,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(20,20,120,1)',
          pointHoverBorderColor: 'rgba(20,20,120,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: y3
        }
      ]
    };
  }

  render() {
    return (

      <div>
        <Line data={this.data}/>
        <div>
          <h4>{this.props.name}</h4>
        </div>

      </div>
    )
  }
}

export default MultiLineEx;
