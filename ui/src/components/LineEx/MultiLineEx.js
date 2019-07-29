import React from "react";
import { Line } from "react-chartjs-2";

class MultiLineEx extends React.Component {
  constructor(props) {
    super(props)
    // var {hourly_data} = require("../../scraped/ethereum/Ethereum_model_output.js");
    // var ethereum_data = hourly_data

    // const x = bitcoin_data.map(v => (eval(props.x)));
    // const y = bitcoin_data.map(v => (eval(props.y)));
    // const y2 = litecoin_data.map(v => (eval(props.y)));
    // const y3 = ethereum_data.map(v => (eval(props.y)));
    console.log(props.x);
    const x = props.modelData.slice(-12).map(v => eval(props.x));
    const y = props.modelData.slice(-12).map(v => eval(props.y));
    const y2 = props.modelData.slice(-12).map(v => eval(props.y2));
    // const y3 = ethereum_data.map(v => eval(props.y));

    this.data = {
      labels: x,
      datasets: [
        {
          label: "Market Return",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "indigo",
          borderColor: "indigo",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "indigo",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "indigo",
          pointHoverBorderColor: "indigo",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: y
        },
        {
          label: "Model Return",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "gold",
          borderColor: "gold",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "gold",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "gold",
          pointHoverBorderColor: "gold",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: y2
        },
        // {
        //   label: "Ethereum",
        //   fill: false,
        //   lineTension: 0.1,
        //   backgroundColor: "rgba(20,20,120,1)",
        //   borderColor: "rgba(20,20,120,1)",
        //   borderDash: [],
        //   borderDashOffset: 0.0,
        //   borderJoinStyle: "miter",
        //   pointBorderColor: "rgba(20,20,120,1)",
        //   pointBackgroundColor: "#fff",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(20,20,120,1)",
        //   pointHoverBorderColor: "rgba(20,20,120,1)",
        //   pointHoverBorderWidth: 2,
        //   pointRadius: 1,
        //   data: y3
        // }
      ]
    };

    this.options = {
      legend: {
        labels: {
          fontSize: 16
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: this.props.yMin,
              max: this.props.yMax
            },
            gridLines: {
              zeroLineWidth: 2
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              fontColor: "#fff"
            },
            gridLines: {
              display: false,
            }
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <Line data={this.data} options={this.options} />
          {/* <div>
            <h4>{this.props.name}</h4>
          </div> */}
      </div>
    );
  }
}

export default MultiLineEx;
