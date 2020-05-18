import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/">
          {/* <Navbar /> */}
          <Route exact path="/" component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
