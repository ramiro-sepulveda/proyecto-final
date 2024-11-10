import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import MarketProvider from "./context/ContextMarket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MarketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MarketProvider>
  </React.StrictMode>
);
