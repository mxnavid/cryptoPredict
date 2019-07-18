import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import "bulma/css/bulma.css";
import Sidebar from "./components/layout/Sidebar";

import Dashboard from './components/dashboard/Dashboard';
import Portfolio from "./components/portfolio/Portfolio";
import Cryptocurrency from './components/cryptocurrency/Cryptocurrency';
import Playground from "./components/tools/Playground";

const App = () => {
  return (
    <Router>
      <div className="app" style={{backgroundColor: '#f5f5f5', height: '100vh'}}>
        <Header />

        <div className="columns is-fullheight ">
          {/* <Sidebar textColor="#1DA1F2" /> */}

          <div className="column is-main-content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/portfolio" component={Portfolio} />
              <Route exact path="/cryptocurrency/:coin" component={Cryptocurrency} />
              <Route exact path="/tools/playground" component={Playground} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
