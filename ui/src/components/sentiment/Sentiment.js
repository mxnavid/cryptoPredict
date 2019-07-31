import React, { Component } from "react";
import curl from "curlrequest";
import axios from "axios";
export default class Sentiment extends Component {
  state = {
    inputText: ""
  };

  handleSubmit = event => {
    // const options = {
    //   url: "http://060f4bd8.ngrok.io/sentimentScore",
    //   include: true
    // };

    // curl.request(options, function(err, data) {
    //   console.log(data);
    //   console.log("well that didn't work...");
<<<<<<< HEAD
    // });

    const inputText = document.querySelector("textarea").value; 
=======
    var postMan = axios.post("https://00f529c3.ngrok.io/needScore", {
      textFromUI: "Faceboook"
    });
>>>>>>> 2b3608aa09a0eb13614bc7f7543d72272573844c

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
  };

  componentDidMount() {
    var text = axios
      .get("https://00f529c3.ngrok.io/sentimentScore/text")
      .then(response => console.log(response.data));
    var polarity = axios
      .get("https://00f529c3.ngrok.io/sentimentScore/polarity")
      .then(response => console.log(response.data));
    var subjectivity = axios
      .get("https://00f529c3.ngrok.io/sentimentScore/subjectivity")
      .then(response => console.log(response.data));

    var postMan = axios.post("https://00f529c3.ngrok.io/needScore", {
      textFromUI: "facevook"
    });
  }

  handleChange = text => {
    this.setState({ inputText: text.target.value.substr(0, 100) });


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
        <section className="section columns">
          <div
            className="card column is-half
is-offset-one-quarter"
          >
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
                    name="hi"
                    id=""
                    placeholder="What's happening?"
                    cols="30"
                    rows="10"
                    className="textarea"
                  />
                  <br />
                  <div className="columns is-vcentered">
                    <div className="column ">
                      <a href="#">#PositiveImpact</a> <a href="#">#Sentiment</a>
                      <br />
                      <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                    <div className="column has-text-right">
                      <input
                        type="submit"
                        value="Submit"
                        className="button is-link is-rounded"
                        onClick={this.handleSubmit}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
