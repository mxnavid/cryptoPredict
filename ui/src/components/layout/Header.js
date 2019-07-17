import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar"
      style={{ backgroundColor: "#141d26", height: "70px" }}
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <p
            className="has-text-white"
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
          {/* <a class="navbar-item">Dashboard</a> */}

          <Link
            to="/dashboard"
            className="navbar-item has-text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/portfolio"
            className="navbar-item has-text-white"
          >
            Portfolio
          </Link>

          {/* <a class="navbar-item">Portfolio</a> */}
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
