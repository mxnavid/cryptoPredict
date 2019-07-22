import React from "react";
import { Link } from "react-router-dom";
import LineEx from "../LineEx/LineEx";
<<<<<<< HEAD
import MultiLineEx from "../LineEx/MultiLineEx";
=======
import LineExNoScale from "../LineEx/LineExNoScale";
>>>>>>> 23693343b01e5631637d467e8c4c6e8aa2ba3151

export default function Card(props) {
  return (
    <div className="column is-one-third">
      <div className="card" style={{ backgroundColor: "#1B2737"}}>
        <div className="card-content">
          <div className="content">
<<<<<<< HEAD
          {!props.multiLine ?
            <LineEx
              name={props.title}
              label={props.label}
              x="v.Time"
              y={"v." + props.label}
=======
            <LineExNoScale
              name={props.title}
              label="Price"
              x="v.Time"
              y="v.Open"
>>>>>>> 23693343b01e5631637d467e8c4c6e8aa2ba3151
              color={props.color}
              className="column"
              show="false"
              yMin={props.yMin}
              yMax={props.yMax}
            />: 
            <MultiLineEx
              name={props.label}
              label={props.label}
              x="v.Time"
              y={"v." + props.label}
              yMin={props.yMin}
              yMax={props.yMax}
              className="column"
            />
          }

          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src={"" + props.imageUrl + ""} alt="Thing" />
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
