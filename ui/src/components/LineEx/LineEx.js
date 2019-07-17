import React from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom"


class LineEx extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.name);
    if (props.name == "Litecoin") {
      var { hourly_data } = require("../../Litecoin_hourly_output.js");
    } else if (props.name == "Ethereum") {
      var { hourly_data } = require("../../Ethereum_hourly_output.js");
    } else {
      var { hourly_data } = require("../../Bitcoin_hourly_output.js");
    }

    const x = hourly_data.map(v => eval(props.x));
    const y = hourly_data.map(v => eval(props.y));

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
          pointBorderColor: this.props.color,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: this.props.color,
          pointHoverBorderColor: this.props.color,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: y
        }
      ]
    };

    this.options = {
      scales: {
        yAxes:[{
          ticks: {
            min: -0.3,
            max: 0.3,
          }
        }]
      }
    }
  }

  render() {
    return (
      <div>

        <Line data={this.data} options ={this.options} />
        {this.props.show === true ? (<div>
          <h4>{this.props.name}</h4>
          <p>Future values.</p>
          <Link to={"/cryptocurrency/" + this.props.name.toLowerCase()} >More Info</Link>
        </div>) : null
        }

      </div>
    );
  }
}



export default LineEx;
