import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div
        className="column is-narrow is-sidebar-menu"
        style={{ padding: "40px" }}
      >
        <aside className="menu ">
          <p className="menu-label">Views</p>
          <ul className="menu-list">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
              <ul>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Analytics</a>
                </li>
                <li>
                  <a>Customize</a>
                </li>
              </ul>
            </li>
          </ul>

          <p className="menu-label">Cryptocurrencies</p>
          <ul className="menu-list">
            <li>
              <Link to="/cryptocurrency/bitcoin">Bitcoin</Link>
            </li>
            <li>
              <Link to="/cryptocurrency/ethereum">Ethereum</Link>
            </li>
            <li>
              <Link to="/cryptocurrency/litecoin">Litecoin</Link>
            </li>
          </ul>

          <p className="menu-label">Tools</p>
          <ul className="menu-list">
            <li>
              <a>Sentiment Analysis</a>
            </li>
            <li>
              <a>Charts Galore</a>
            </li>
            <li>
              <a>Playground (To Be Removed)</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
