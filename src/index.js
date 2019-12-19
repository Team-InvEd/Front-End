import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";



ReactDOM.render(
  <HashRouter>
    <Route path="/" component={App} />
  </HashRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
