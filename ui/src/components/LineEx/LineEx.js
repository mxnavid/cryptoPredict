import React from 'react';
import {Line} from 'react-chartjs-2';
import Box from '@material-ui/core/Box';

class LineEx extends React.Component {
  constructor(props) {
    super(props)
    if (props.name == 'Litecoin') {
      var {hourly_data} = require("../../Litecoin_hourly_output.js");
    }
    else if (props.name == 'Ethereum') {
      var {hourly_data} = require("../../Ethereum_hourly_output.js");
    }
    else {
      var {hourly_data} = require("../../Bitcoin_hourly_output.js");
    }

    const x = hourly_data.map(v => (eval(props.x)));
    const y = hourly_data.map(v => (eval(props.y)));

    this.data = {
      labels: x,
      datasets: [
        {
          label: props.label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: y
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
          <p>Future values.</p>
          <a href={this.props.name}>More Info</a>
        </div>
      </Box>
    )
  }
}

export default LineEx;
