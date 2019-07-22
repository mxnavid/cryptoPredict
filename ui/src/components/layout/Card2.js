import React from "react";
import { Link } from "react-router-dom";
import LineEx from "../LineEx/LineEx";

export default function Card2(props) {
  return (
    <div className="column">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{props.title}</p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true" />
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
          ${props.data}
          </div>
        </div>
      </div>
    </div>
  );
}

