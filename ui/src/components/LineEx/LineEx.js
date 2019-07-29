import React from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

class LineEx extends React.Component {
  constructor(props) {
    super(props);

    // console.log(props.name);
    if (props.name === "Litecoin") {
      var { hourly_data } = require("../../scraped/litecoin/Litecoin_model_output.js");
    } else if (props.name === "Ethereum") {
      var { hourly_data } = require("../../scraped/ethereum/Ethereum_model_output.js");
    } else {
      var { hourly_data } = require("../../scraped/bitcoin/Bitcoin_model_output.js");
    }

    const x = hourly_data.slice(-12).map(v => eval(props.x));
    const y = hourly_data.slice(-12).map(v => eval(props.y));

    this.data = {
      labels: x,
      datasets: [
        {
          label: props.label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: this.props.color,
          borderColor: this.props.color,
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#000",
          pointBackgroundColor: "#000",
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: this.props.color,
          pointHoverBorderColor: this.props.color,
          pointHoverBorderWidth: 1,
          pointRadius: 4.5,
          data: y
        }
      ]
    };

    this.options = {
      legend: {
        labels: {
          fontColor: "#000",
          fontSize: 16
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#000",
              min: this.props.yMin,
              max: this.props.yMax
            },
            gridLines: {
              color: "#696969",
              zeroLineColor: "#696969",
              zeroLineWidth: 2
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              // autoSkip: true,
              maxTicksLimit: 10,
              fontColor: "#000"
            },
            gridLines: {
              display: false,
              color: "#696969"
            }
          }
        ]
      }
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState()
    }, 1000)
  }

  render() {
    return (
      <div>
        <Line data={this.data} options={this.options} />
        {this.props.show === true ? (
          <div>
            <h4>{this.props.name}</h4>
            <p>Future values.</p>
            <Link to={"/cryptocurrency/" + this.props.name.toLowerCase()}>
              More Info
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default LineEx;
