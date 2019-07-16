import React from "react";

const Cryptocurrency = props => {
  return (
    <div className="section has-background-light ">
      <div className="columns is-multiline is-mobile">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title title">{props.match.params.coin}</p>
          </header>
        </div>

        {/* <h1 className="title">{props.match.params.coin}</h1> */}
      </div>
    </div>
  );
};

export default Cryptocurrency;
