import React, { Component } from "react";

export default class Sentiment extends Component {

   state = {
      inputText: "",
   }

   componentDidMount() {
      
   }

   handleSubmit = () => {
      // this.setState({
      //    inputText: "idk"
      // })
      fetch('http://060f4bd8.ngrok.io/sentimentScore')
         .then((response) => response.json())
         .then((responseJson) => {

            // console.log(responseJson)
            console.log("Hi")
         })
      //    .catch((error) => {
      //       console.error(error);
      //    });
   }

   handleChange = (text) => {
      this.setState({ inputText: text.target.value.substr(0, 100) });
   }


   render() {
      return (
         <div>
            <section class="hero" style={{backgroundColor: "#0018A8"}}>
               <div class="hero-body columns">
                  <div className="column" >
                     <h1 class="title has-text-white" style={{ fontSize: "48px" }} onClick={this.handleSubmit}>
                        Sentiment
                  </h1>
                     <h2 class="subtitle has-text-white" style={{ fontSize: "28px" }}>
                        Cryptocurrently
                  </h2>
                  </div>
               </div>
            </section>
            <form onSubmit={this.handleSubmit}>
                  <div class="field">
                     <div align="center">
                        <label class="label" style={{ fontSize: "32px" }}>Enter Text for Sentiment Scoring</label>
                        <textarea rows="6" cols="75" style={{ fontSize: "24px" }} placeholder="Type here" value={this.state.value} onChange={this.handleChange} ></textarea>
                     </div>
                  </div>
                  <div class="control">
                     <div align="center">
                        <input type="submit" value="Submit" style={{ height: 75, marginTop: 5, width: 300, fontSize: "30px" }}  class="button is-link"/>
                     </div>
                  </div>
               
            </form>
         </div>

      )
   }
}
