import React from "react";
import ReactDOM from "react-dom";
import "../src/style/index.css";
import App from "./view/src/table/tableEplex/index.jsx";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
