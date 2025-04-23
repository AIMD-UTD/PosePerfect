import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import introAnimation from "./assets/introAnimation.json";
import "./App.css";

function LoginPage({ setIsAuthenticated }) {
  const [successMsg, setSuccessMsg] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    setSuccessMsg(true);
    setTimeout(() => {
      navigate("/app");
    }, 2000);
  };

  return (
    <div className="upload-box">
      <div className="lottie-container">
        <Player
          autoplay
          loop
          src={introAnimation}
          style={{ height: "180px", width: "180px" }}
        />
      </div>

      <h2>Create an Account</h2>
      {successMsg && (
        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px" }}>
          ✅ Registration successful! Redirecting...
        </p>
      )}

      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default LoginPage;
