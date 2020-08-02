import React from "react";
import ReactDOM from "react-dom";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Battle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
