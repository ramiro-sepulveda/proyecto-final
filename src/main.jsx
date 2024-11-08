import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import PizzasProvider from "./context/ContextPizzas.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PizzasProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PizzasProvider>
  </React.StrictMode>
);
