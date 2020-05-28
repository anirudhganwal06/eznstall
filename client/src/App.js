import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Layout/Header/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main></main>
      </div>
    </Router>
  );
}

export default App;
