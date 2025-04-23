import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import introAnimation from "./assets/introAnimation.json";
import "./App.css";

function App({ setIsAuthenticated }) {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload an image first.");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5003/api/posture", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="upload-box">
      {/* ✅ Logout Button Top-Right */}
      <button className="top-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1>PosePerfect</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="centered-input"
        />
        <br />
        <button type="submit">Analyze</button>
      </form>

      {!file && (
        <div className="lottie-container">
          <Player
            autoplay
            loop
            src={introAnimation}
            style={{ height: "250px", width: "250px" }}
          />
        </div>
      )}

      {file && (
        <div className="image-preview">
          <img src={URL.createObjectURL(file)} alt="Preview" />
        </div>
      )}

      {response && (
        <div className="feedback">
          <p><strong>Pose:</strong> {response.pose}</p>
          <p><strong>Correct:</strong> {response.correct.toString()}</p>
          <p><strong>Suggestion:</strong> {response.suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default App;
