import React, { useState } from "react";
import ReactPlayer from "react-player";

function App() {
  const [query, setQuery] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:8080/api/music/search?query=${query}`);
    
    const data = await res.json();    
    setVideoId(data.videoId);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎵 Music Player with Spring Boot + React</h2>
      <input
        type="text"
        placeholder="Enter song name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "8px" }}>
        Search
      </button>

      {videoId && (
        <div style={{ marginTop: "30px" }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls />
        </div>
      )}
    </div>
  );
}

export default App;
