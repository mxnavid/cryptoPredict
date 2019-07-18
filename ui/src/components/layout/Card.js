import React from "react";
import { Link } from "react-router-dom";
import LineEx from "../LineEx/LineEx";

export default function Card(props) {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <LineEx
              name={props.title}
              label="Sentiment"
              x="v.Time"
              y="v.Polarity"
              color={props.color}
              className="column"
              show="false"
            />

          </div>
          {/* <div className="content">
            <LineEx
              name={props.title}
              label="Sentiment"
              x="v.Time"
              y="v.Close"
              color="rgba(120,20,20,1)"
              className="column"
              show="false"
            />

          </div> */}
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src={"" + props.imageUrl + ""} alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{props.title}</p>
              <p class="subtitle is-6">Cryptocurrency</p>
            </div>
          </div>

          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{" "}
            <a href="#">#responsive</a>
          </div>
        </div>

        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              <a href="#">Expand Graph</a>
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              <Link to={"/cryptocurrency/" + props.title}>More Info</Link>
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
