import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "bulma/css/bulma.css";

import Header from "./components/layout/Header";
import MyRouter from "./components/layout/MyRouter";

const App = () => {
  return (
    <Router>
      <Header />
      <MyRouter />
    </Router>
  );
};

export default App;
