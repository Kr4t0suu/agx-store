import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";

import Login from "./pages/Login";
import Admin from "./pages/Admin";

import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={<App />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);