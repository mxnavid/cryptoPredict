import React, { Component } from 'react'




export default class Sentiment extends Component {

componentDidMount() {
   fetch('http://127.0.0.1:8080/needScore', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      //   'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        "textFromUI": "I hate trump",
      })})
    .then((response) => response.json())
    .then((responseJson) => {

      console.log(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
}

   render() {
      return (
         <div>
            <section class="hero has-background-link">
            <div class="hero-body columns">
               <div className="column" >
                  <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
                     Sentiment
                  </h1>
                  <h2 class="subtitle has-text-white" style={{ fontSize: "28px" }}>
                     Cryptocurrently
                  </h2>
               </div>
          </div>
         </section>
            <div class="field">
               <div align="center">
                  <label class="label" style={{ fontSize: "28px" }}>Enter Text for Sentiment Scoring</label>
                  <textarea rows="10" cols="100" placeholder="Type here"></textarea>
               </div>
            </div>
         </div>
         
      )
   }
}
