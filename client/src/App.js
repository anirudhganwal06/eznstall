import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Layout/Header/Header";
import Landing from "./components/Landing/Landing";
import Installations from "./components/Installations/Installations";
import Installation from "./components/Installation/Installation";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Route exact path="/" component={Landing} />
          <Route exact path="/installations" component={Installations} />
          <Route exact path="/installation" component={Installation} />
        </main>
      </div>
    </Router>
  );
}

export default App;
