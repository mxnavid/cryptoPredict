import React from "react";
import { Link } from "react-router-dom";
import LineEx from "../LineEx/LineEx";

export default function Card2(props) {
  return (
    <div className="column is-one-quarter">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Data Parameter</p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true" />
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            Data
          </div>
        </div>
      </div>
    </div>
  );
}
