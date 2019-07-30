import React, { Component } from "react";
import { Link } from "react-router-dom";
import LineExNoScale from "../LineEx/LineExNoScale";
// import MultiLineEx from "../LineEx/MultiLineEx";

export default class Card extends Component {
  state = {
    hours: 1,
    showSentiment: false
  };

  constructor(props) {
    super(props);

    const {
      model_data
    } = require("../../scraped/" + props.cardTitle.toLowerCase() + "/" + props.cardTitle + "_model_output.js");

    this.state.crypto_data = model_data;
  }

  handleClick = (e, num) => {
    this.setState({ hours: num });
    document
      .querySelector(".card" + this.props.num + " .is-active-anchor")
      .classList.remove("is-active-anchor");
    e.target.classList.add("is-active-anchor");

    const newGraph = e.target.innerHTML;

    let graph = document.querySelector(
      ".card" + this.props.num + " .active-chart"
    );
    graph.classList.remove("active-chart");

    if (newGraph === "Past Hour") {
      document
        .querySelector(".card" + this.props.num + " .first-chart")
        .classList.add("active-chart");
    } else if (newGraph === "Past 6 Hours") {
      document
        .querySelector(".card" + this.props.num + " .second-chart")
        .classList.add("active-chart");
    } else if (newGraph === "Past Day") {
      document
        .querySelector(".card" + this.props.num + " .third-chart")
        .classList.add("active-chart");
    } else if (newGraph === "Past 3 Days") {
      document
        .querySelector(".card" + this.props.num + " .fourth-chart")
        .classList.add("active-chart");
    }
  };

  render() {
    return (
      <div className="column">
        <div className={"card card" + this.props.num}>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={"" + this.props.imageUrl + ""} alt="Thing" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{this.props.cardTitle}</p>
                <p className="subtitle is-6">Price</p>
              </div>
            </div>
          </div>

          <div className="card-content">
            <div className="content">
              {this.props.showStuff ? (
                <div>
                  <div className="columns">
                    <div className="column">
                      <p>
              Sentiment: {this.state.crypto_data[this.state.crypto_data.length - 1].Polarity < 0 ? <i className="far fa-frown" /> : <i className="far fa-smile" /> }
                      </p>
                    </div>
                    <div className="column">
                      <p>Price: ${this.state.crypto_data[this.state.crypto_data.length - 1].Open}</p>
                    </div>
                    <div className="column">
                      <p>
                        Prediction:{" "}
                        {this.state.crypto_data[this.state.crypto_data.length - 1]
                          .Pred_Signal === -1 ? (
                          <i className="fas fa-angle-double-down" />
                        ) : (
                          <i className="fas fa-angle-double-up" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="tabs is-centered is-fullwidth">
                <ul>
                  <li onClick={e => this.handleClick(e, 1)}>
                    <a href={null} className="is-active-anchor">Past Hour</a>
                  </li>
                  <li onClick={e => this.handleClick(e, 6)}>
                    <a href={null}>Past 6 Hours</a>
                  </li>
                  <li onClick={e => this.handleClick(e, 24)}>
                    <a href={null}>Past Day</a>
                  </li>
                  <li onClick={e => this.handleClick(e, 24 * 3)}>
                    <a href={null}>Past 3 Days</a>
                  </li>
                  {/* <li>
                  <a>Documents</a>
                </li> */}
                </ul>
              </div>
              <div className="chart active-chart first-chart">
                <LineExNoScale

              modelData={this.state.crypto_data}
                  coin={this.props.cardTitle}
                  time={1}
                  name={this.props.title}
                  label="Price"
                  x="v.Time"
                  y={"v." + this.props.label}
                  color={this.props.color}
                  className="column"
                  show="false"
                  yMin={this.props.yMin}
                  yMax={this.props.yMax}
                />
              </div>

              <div className="chart second-chart">
                <LineExNoScale
              modelData={this.state.crypto_data}
                  coin={this.props.cardTitle}
                  time={6}
                  name={this.props.title}
                  label="Price"
                  x="v.Time"
                  y={"v." + this.props.label}
                  color={this.props.color}
                  className="column"
                  show="false"
                  yMin={this.props.yMin}
                  yMax={this.props.yMax}
                />
              </div>

              <div className="chart third-chart">
                <LineExNoScale
              modelData={this.state.crypto_data}
                  coin={this.props.cardTitle}
                  time={24}
                  name={this.props.title}
                  label="Price"
                  x="v.Time"
                  y={"v." + this.props.label}
                  color={this.props.color}
                  className="column"
                  show="false"
                  yMin={this.props.yMin}
                  yMax={this.props.yMax}
                />
              </div>

              <div className="chart fourth-chart">
                <LineExNoScale
              modelData={this.state.crypto_data}
                  coin={this.props.cardTitle}
                  time={24 * 3}
                  name={this.props.title}
                  label="Price"
                  x="v.Time"
                  y={"v." + this.props.label}
                  color={this.props.color}
                  className="column"
                  show="false"
                  yMin={this.props.yMin}
                  yMax={this.props.yMax}
                />
              </div>
            </div>
          </div>

          <footer className="card-footer">
            {/* <p className="card-footer-item">
              <span>
                <a href="#">Expand Graph</a>
              </span>
            </p> */}
            <p className="card-footer-item">
              <span>
                <Link to={"/cryptocurrency/" + this.props.title}>
                  More Info
                </Link>
              </span>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}
