import React from 'react';
import {Line} from 'react-chartjs-2';
import Box from '@material-ui/core/Box';

class MultiLineEx extends React.Component {
  constructor(props) {
    super(props)
    var {hourly_data} = require("../../data/Bitcoin_hourly_output.js");
    var bitcoin_data = hourly_data
    var {hourly_data} = require("../../data/Litecoin_hourly_output.js");
    var litecoin_data = hourly_data
    var {hourly_data} = require("../../data/Ethereum_hourly_output.js");
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
      <Box border={1}>
        <Line data={this.data}/>
        <div>
          <h4>{this.props.name}</h4>
        </div>
      </Box>
    )
  }
}

export default MultiLineEx;
