import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app-redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import evn from "dotenv";

evn.config();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
