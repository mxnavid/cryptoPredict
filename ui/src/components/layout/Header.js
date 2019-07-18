import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav class="navbar"
      style={{ backgroundColor: "#1B2737", height: "70px" }}
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item-mine" id="idk">
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "24px",
              fontFamily: "Arial"
            }}
          >
            Cryptowatch
          </p>
        </Link>
      </div>
      <div className="navbar-menu">
        <div class="navbar-start">
          {/* <a class="navbar-item-mine">Dashboard</a> */}

          <Link to="/dashboard" className="navbar-item-mine">
            Dashboard
          </Link>
          <Link
            to="/portfolio"
            className="navbar-item-mine"
            
          >
            Portfolio
          </Link>
          <Link to="/sentiment" className="navbar-item-mine">
            Sentiment
          </Link>

          {/* <a class="navbar-item">Portfolio</a> */}
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              {/* <a class="button is-primary">
                <strong>Sign up</strong>
              </a> */}
              {/* <a class="button is-light">Dark Mode</a> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
