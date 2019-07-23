import React, { Component } from "react";
import { Link } from "react-router-dom";
import LineEx from "../LineEx/LineEx";
import LineExNoScale from "../LineEx/LineExNoScale";
// import MultiLineEx from "../LineEx/MultiLineEx";

export default class Card extends Component {
  state = {
    hours: 1,
    showSentiment: false,
  };

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

    // console.log(e.target);
  };

  render() {
    return (
      <div className="column is-one-third">
        <div className={"card" + " card" + this.props.num}>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src={"" + this.props.imageUrl + ""} alt="Thing" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{this.props.cardTitle}</p>
                <p class="subtitle is-6">Price</p>
              </div>
            </div>

            {/* <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{" "}
            <a href="#">#responsive</a>
          </div> */}
          </div>

          <div className="card-content">
            <div className="content">
              {this.props.showStuff
                ? (<div>
                    <div className="columns">
                      <div className="column">
                        <p onClick={() => this.setState({showSentiment: !this.state.showSentiment})}>
                          Sentiment: <i class="far fa-frown" />
                        </p>
                      </div>
                      <div className="column">
                        <p>Price: $free.99</p>
                      </div>
                      <div className="column">
                        <p>
                          Prediction: <i class="fas fa-angle-double-up" />
                        </p>
                      </div>
                    </div>
                    </div>
                  )
                : null}
                {this.state.showSentiment ? 
              <LineEx 
              name={this.props.title}
              label="Price"
              x="v.Time"
              y="v.Polarity"
              color={this.props.color}
              className="column"
              show="false"
              yMin={this.props.yMin}
              yMax={this.props.yMax}
            /> : null}
              

              <div class="tabs is-centered is-fullwidth">
                <ul>
                  <li onClick={e => this.handleClick(e, 1)}>
                    <a className="is-active-anchor">Past Hour</a>
                  </li>
                  <li onClick={e => this.handleClick(e, 6)}>
                    <a>Past 6 Hours</a>
                  </li>
                  <li onClick={e => this.handleClick(e, 24)}>
                    <a>Past Day</a>
                  </li>
                  <li onClick={e => this.handleClick(e, 24 * 3)}>
                    <a>Past 3 Days</a>
                  </li>
                  {/* <li>
                  <a>Documents</a>
                </li> */}
                </ul>
              </div>
              <div className="chart active-chart first-chart">
                <LineExNoScale
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

          <footer class="card-footer">
            <p class="card-footer-item">
              <span>
                <a href="#">Expand Graph</a>
              </span>
            </p>
            <p class="card-footer-item">
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
