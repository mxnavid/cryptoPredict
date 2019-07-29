import React, { Component } from "react";
import axios from "axios";
export default class Sentiment extends Component {
  //   componentDidMount() {
  //     fetch("http://127.0.0.1:8080/needScore", {
  //       method: "POST",
  //       mode: "no-cors",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*"
  //         //   'Access-Control-Allow-Credentials': true
  //       },
  //       body: JSON.stringify({
  //         textFromUI: "I hate trump"
  //       })
  //     })
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         console.log(responseJson);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }

  render() {
    return (
      <div>
        <p>Sentiment Yo</p>
      </div>
    );
  }
}
