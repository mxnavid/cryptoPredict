import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bulma/css/bulma.css";

import Header from "./components/layout/Header";
import UIRouter from "./components/layout/UIRouter";

const App = () => {
  return (
    <Router>
      <Header />
      <UIRouter />
      
    </Router>
  );
};

export default App;
