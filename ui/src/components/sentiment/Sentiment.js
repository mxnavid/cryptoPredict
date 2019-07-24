import React, { Component } from "react";

export default class Sentiment extends Component {
  componentDidMount() {
     let requestThing = {"textFromUI": "I hate trump"};
    fetch("http://127.0.0.1:8080/needScore", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(requestThing),
      headers: {
        'Content-Type': 'application/json'
        //   'Access-Control-Allow-Credentials': true
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <p>Sentiment Yo</p>
      </div>
    );
  }
}
