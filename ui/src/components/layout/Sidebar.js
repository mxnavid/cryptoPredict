import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {



  render() {
    return (
      <div style={{ backgroundColor: "#141d26", height: "100vh" }}>
        <div
          className="column is-narrow is-sidebar-menu"
          style={{ padding: "40px" }}
        >
          <aside className="menu ">
            <p className="menu-label cool" >Views</p>
            <ul className="menu-list">
              <li >
                <Link to="/dashboard" className="has-text-white link-thing">Dashboard</Link>
              </li>
              <li>
                <Link to="/portfolio" className="has-text-white">Portfolio</Link>
                <ul>
                  <li>
                    <a className="has-text-white">Profile</a>
                  </li>
                  <li>
                    <a className="has-text-white">Analytics</a>
                  </li>
                  <li>
                    <a className="has-text-white">Customize</a>
                  </li>
                </ul>
              </li>
            </ul>

            <p className="menu-label cool" >Cryptocurrencies</p>
            <ul className="menu-list">
              <li>
                <Link to="/cryptocurrency/Bitcoin" className="has-text-white">Bitcoin</Link>
              </li>
              <li>
                <Link to="/cryptocurrency/Ethereum" className="has-text-white">Ethereum</Link>
              </li>
              <li>
                <Link to="/cryptocurrency/Litecoin" className="has-text-white">Litecoin</Link>
              </li>
            </ul>

            <p className="menu-label cool">Tools</p>
            <ul className="menu-list">
              <li>
                <a className="has-text-white">Sentiment Analysis</a>
              </li>
              <li>
                <a className="has-text-white">Charts Galore</a>
              </li>
              <li>
                <Link to="/tools/playground" className="has-text-white">Playground (to be removed)</Link>
              </li>
              <li>
                <a className="has-text-white">Settings</a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    );
  }
}
