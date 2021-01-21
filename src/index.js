import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { SearchContextProvider } from "./components/searchContext";

ReactDOM.render(
  <>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </>,

  document.getElementById("root")
);
reportWebVitals();
