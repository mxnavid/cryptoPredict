import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Cryptocurrency from "../cryptocurrency/Cryptocurrency";
import Cryptocurrency2 from "../cryptocurrency/Cryptocurrency2";
import Sentiment from "../sentiment/Sentiment";

export default function Content() {
  return (
    <div className="columns is-fullheight">
      <div className="column is-main-content">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/cryptocurrency/:coin/"
            component={Cryptocurrency}
          />
          <Route
            exact
            path="/cryptocurrency/:coin/:model"
            component={Cryptocurrency2}
          />
          <Route exact path="/sentiment" component={Sentiment} />
        </Switch>
      </div>
    </div>
  );
}
