import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
