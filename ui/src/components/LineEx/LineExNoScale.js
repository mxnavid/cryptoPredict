import React from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

class LineEx extends React.Component {
  constructor(props) {
    super(props);

    const {
      model_data
    } = require("../../scraped/" + props.coin.toLowerCase() + "/" + props.coin + "_model_output.js");

    // if (props.name === "Litecoin") {
    //   var {
    //     model_data
    //   } = require("../../scraped/litecoin/Litecoin_model_output.js");
    // } else if (props.name === "Ethereum") {
    //   var {
    //     model_data
    //   } = require("../../scraped/ethereum/Ethereum_model_output.js");
    // } else {
    //   var {
    //     model_data
    //   } = require("../../scraped/bitcoin/Bitcoin_model_output.js");
    // }

    const x = model_data.slice(-12 * props.time).map(v => eval(props.x));
    const y = model_data.slice(-12 * props.time).map(v => eval(props.y));

    this.data = {
      labels: x,
      datasets: [
        {
          label: this.props.label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: this.props.color,
          borderColor: this.props.color,
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: this.props.color,
          pointBackgroundColor: this.props.color,
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: this.props.color,
          pointHoverBorderColor: this.props.color,
          pointHoverBorderWidth: 0,
          pointRadius: 1,
          data: y
        }
      ]
    };

    this.options = {
      scales: {
        xAxes: [
          {
            ticks: {
              // autoSkip: true,
              display: false
              // userCallback: function(item, index) {
              //   if (index % 4) return "";
              //   return item;
              // },
              // autoSkip: false
            },
            gridLines: {
              display: false
            }
          }
        ],
      }
    };
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
