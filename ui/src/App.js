import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import "bulma/css/bulma.css";
import Sidebar from "./components/layout/Sidebar";

import Dashboard from './components/dashboard/Dashboard';
import Portfolio from "./components/portfolio/Portfolio";
import Cryptocurrency from './components/cryptocurrency/Cryptocurrency';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />

        <div className="columns is-fullheight ">
          <Sidebar />

          <div className="column is-main-content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/portfolio" component={Portfolio} />
              <Route exact path="/cryptocurrency/:coin" component={Cryptocurrency} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
