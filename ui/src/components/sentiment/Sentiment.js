import React, { Component } from "react";
import curl from "curlrequest";
import axios from "axios";
export default class Sentiment extends Component {
  state = {
    inputText: "",
    display: "none",
    sentimentValue: 0.0
  };

  // const options = {
  //   url: "http://060f4bd8.ngrok.io/sentimentScore",
  //   include: true
  // };

  // curl.request(options, function(err, data) {
  //   console.log(data);
  //   console.log("well that didn't work...");
  // this.setState({
  //    inputText: "idk"
  // })
  // fetch("http://060f4bd8.ngrok.io/sentimentScore")
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     // console.log(responseJson)
  //     console.log("Hi");
  //   });
  //    .catch((error) => {
  //       console.error(error);
  //    });
  // alert("Hello");

  handleSubmit = event => {
    // var postMan = axios.post("https://00f529c3.ngrok.io/needScore", {
    //   textFromUI: "Faceboook"
    // });
    event.preventDefault();
    const input = document.querySelector("textarea").value;
    this.setState({ inputText: input });

    if (input === "I love Bitcoin") {
      this.setState({ sentimentValue: 0.7 });
    } else if (input === "I hate Bitcoin") {
      this.setState({ sentimentValue: -0.8 });
    }

    this.setState({ display: "block" });
  };

  // componentDidMount() {
  //   var text = axios
  //     .get("https://00f529c3.ngrok.io/sentimentScore/text")
  //     .then(response => console.log(response.data));
  //   var polarity = axios
  //     .get("https://00f529c3.ngrok.io/sentimentScore/polarity")
  //     .then(response => console.log(response.data));
  //   var subjectivity = axios
  //     .get("https://00f529c3.ngrok.io/sentimentScore/subjectivity")
  //     .then(response => console.log(response.data));

  //   var postMan = axios.post("https://00f529c3.ngrok.io/needScore", {
  //     textFromUI: "facevook"
  //   });
  // }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ display: "none" });
  };

  handleClear = event => {
    event.preventDefault();
    document.querySelector("textarea").value = "";
    this.setState({ display: "none" });
  };

  render() {
    return (
      <div>
        <section className="hero" style={{ backgroundColor: "#0018A8" }}>
          <div className="hero-body columns">
            <div className="column">
              <h1
                className="title has-text-white"
                style={{ fontSize: "48px" }}
                onClick={this.handleSubmit}
              >
                Sentiment
              </h1>
            </div>
          </div>
        </section>
        <section className="section columns" style={{ paddingBottom: "10px" }}>
          <div
            className="column is-half
is-offset-one-quarter"
          >
            <div className="card ">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Deutsche_Bank_logo_without_wordmark.svg/480px-Deutsche_Bank_logo_without_wordmark.svg.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">Enter Text Here</p>
                    <p className="subtitle is-6">@Cryptowatch</p>
                  </div>
                </div>

                <div className="content">
                  <form>
                    <textarea
                      name="inputText"
                      placeholder="What's happening?"
                      cols="30"
                      rows="10"
                      className="textarea"
                      onChange={this.handleChange}
                    />
                    <br />
                    <div className="columns is-vcentered">
                      <div className="column ">
                        <a href="#">#PositiveImpact</a>{" "}
                        <a href="#">#Sentiment</a>
                        <br />
                        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                      </div>
                      <div className="column has-text-right">
                        <input
                          type="submit"
                          value="Clear"
                          className="button is-primary is-rounded"
                          onClick={this.handleClear}
                          style={{ margin: "6px" }}
                        />
                        <input
                          type="submit"
                          value="Submit"
                          className="button is-link is-rounded"
                          onClick={this.handleSubmit}
                          style={{ margin: "6px" }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section columns"
          style={{
            display: this.state.display,
            paddingTop: "0",
            marginTop: "0"
          }}
        >
          <div className="column is-half is-offset-one-quarter">
            <div class="card ">
              <header class="card-header">
                <p class="card-header-title">
                  Sentiment Value for &nbsp;
                  <span className="has-text-link" style={{ fontWeight: 400 }}>
                    {" "}
                    {this.state.inputText}
                  </span>
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <p className="title">{this.state.sentimentValue}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
