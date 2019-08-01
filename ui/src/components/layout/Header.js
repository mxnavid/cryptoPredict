import React, { Component } from "react";
import { Link } from "react-router-dom";

const handleClick = event => {
  document.querySelector(".navbar .is-active").classList.remove("is-active");
  event.target.classList.add("is-active");
};

// const handleClick2 = e => {
//   e.target.classList.remove("is-active");
//   document
//     .querySelector(".navbar-start .is-active")
//     .classList.remove("is-active");
//   document.querySelector("#dashboard").classList.add("is-active");
// };

class Header extends Component {
  defaultAsIs = () => {
    const currentPage = document.querySelector(".title").innerHTML;
    document.querySelector("#" + currentPage).classList.add("is-active");
  };

  componentDidMount() {
    let time = document.querySelector("#refresh_time");

    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    let m2 = "";
    if (m < 10) m2 = "0" + m;
    else m2 = m;
    let s2 = "";
    if (s < 10) s2 = "0" + s;
    else s2 = s;
    // add a zero in front of numbers<10
    time.innerHTML = h + ":" + m2 + ":" + s2;

    this.defaultAsIs();
  }

  render() {
    return (
      <nav className="navbar is-link" style={{ height: "60px", backgroundColor: "#0018A8"}}>
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-item"
            onClick={e => handleClick(e)}
            id="Dashboard"
            style={{
              textTransform: "uppercase",
              fontSize: "24px"
            }}
          >
            {/* <p
              style={{
                textTransform: "uppercase",
                fontSize: "24px"
              }}
            > */}
              Cryptowatch
            {/* </p> */}
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {/* <Link
              to="/dashboard"
              className="navbar-item is-active"
              id="dashboard"
              onClick={e => {
                handleClick(e);
              }}
            >
              Dashboard
            </Link> */}

            <Link
              to="/cryptocurrency/Bitcoin"
              className="navbar-item"
              onClick={e => {
                handleClick(e);
              }}
              id="Bitcoin"
            >
              Bitcoin
            </Link>

            <Link
              to="/cryptocurrency/Ethereum"
              className="navbar-item"
              onClick={e => {
                handleClick(e);
              }}
              id="Ethereum"
            >
              Ethereum
            </Link>
            <Link
              to="/cryptocurrency/Litecoin"
              className="navbar-item"
              onClick={e => {
                handleClick(e);
              }}
              id="Litecoin"
            >
              Litecoin
            </Link>

            <Link
              to="/sentiment"
              className="navbar-item"
              onClick={e => {
                handleClick(e);
              }}
              id="Sentiment"
            >
              Sentiment Demo
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {/* <div className="loader">Loading...</div> */}
              <p className="has-text-white">
                <i className="fas fa-sync" />
                &nbsp;&nbsp; Last refreshed at <span id="refresh_time">12</span>
              </p>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
