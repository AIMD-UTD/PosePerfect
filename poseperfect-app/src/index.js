import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage";
import "./App.css";

function RouterWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/app"
        element={
          isAuthenticated ? (
            <App setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RouterWrapper />
  </BrowserRouter>
);
