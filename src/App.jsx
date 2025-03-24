import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [mediaLinks, setMediaLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setMediaLinks([]);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setMediaLinks(data.urls);
      } else {
        setError(data.message || "Failed to fetch media.");
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Instagram Post Downloader</h2>
      <input
        type="text"
        placeholder="Enter Instagram Post URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload} disabled={loading || !url}>
        {loading ? "Loading..." : "Download"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="media-container">
        {mediaLinks.map((link, index) => (
          <div key={index} className="media-item">
            {link.includes(".mp4") ? (
              <video controls src={link}></video>
            ) : (
              <img src={link} alt="Instagram media" />
            )}
            <a href={link} download target="_blank" rel="noopener noreferrer">
              ⬇ Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
