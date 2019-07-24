import React, { Component } from 'react'

export default class Portfolio extends Component {
   render() {
      return (
         <div>
            <section class="hero has-background-link">
               <div class="hero-body columns">
                  <div className="column" >
                     <h1 class="title has-text-white" style={{ fontSize: "48px" }}>
                        Portfolio
                     </h1>
                     <h2 class="subtitle has-text-white" style={{ fontSize: "28px" }}>
                        Cryptocurrently
                     </h2>
                  </div>
               </div>
            </section>
         </div>
      )
   }
}