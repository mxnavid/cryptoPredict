import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import "bulma/css/bulma.css";

import Dashboard from './components/dashboard/Dashboard';
import Portfolio from "./components/portfolio/Portfolio";
import Cryptocurrency from './components/cryptocurrency/Cryptocurrency';
import Playground from "./components/tools/Playground";
import Sentiment from "./components/sentiment/Sentiment";

const App = () => {
  return (
    <Router>
      <div style={{ height: '100vh', backgroundColor: '#151E29'}}>
        <Header />

        <div className="columns is-fullheight ">

          <div className="column is-main-content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/portfolio" component={Portfolio} />
              <Route exact path="/cryptocurrency/:coin" component={Cryptocurrency} />
              <Route exact path="/tools/playground" component={Playground} />
              <Route exact path="/sentiment" component={Sentiment} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
