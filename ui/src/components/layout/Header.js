import React from "react";
import { Link } from "react-router-dom";

const handleClick = (event) => {
  document.querySelector(".navbar-start .is-active").classList.remove("is-active");
  event.target.classList.add("is-active");
}

const handleClick2 = (e) => {
  e.target.classList.remove("is-active");
  document.querySelector(".navbar-start .is-active").classList.remove("is-active");
  document.querySelector("#dashboard").classList.add("is-active");
}

const Header = () => {
  return (
    <nav className="navbar is-link" style={{height: '60px'}}>
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" onClick={(e) => handleClick2(e)}>
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "24px"
            }}
          >
            Cryptowatch
          </p>
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link
            to="/dashboard"
            className="navbar-item is-active" id="dashboard"
            onClick={(e) => {handleClick(e)}}
          >
            Dashboard
          </Link>
          <Link to="/portfolio" className="navbar-item" onClick={(e) => {handleClick(e)}}>
            Portfolio
          </Link>
          <Link to="/sentiment" className="navbar-item" onClick={(e) => {handleClick(e)}}>
            Sentiment
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* <a className="button is-primary">
                <strong>Sign up</strong>
              </a> */}
              {/* <a className="button is-light">Dark Mode</a> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
