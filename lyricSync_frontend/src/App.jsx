import React, { useState, useEffect } from "react";
import { search, getLyrics } from "./api";
import SearchBar from "./components/SearchBar";
import Player from "./components/Player";
import LyricsDisplay from "./components/LyricsDisplay";

function App() {
  const [results, setResults] = useState([]);
  const [track, setTrack] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [duration, setDuration] = useState(30); // fallback duration
  const [mode, setMode] = useState("auto");
  const [syncMap, setSyncMap] = useState(null);

  const handleSearch = async (q) => {
    try {
      const json = await search(q);
      // Spotify search JSON — parse to tracks (this is raw JSON)
      const parsed = typeof json === "string" ? JSON.parse(json) : json;
      const tracks = parsed.tracks?.items || [];
      setResults(tracks);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  const selectTrack = async (t) => {
    setTrack(t);
    // try fetch lyrics using simple heuristics
    const artist = t.artists?.[0]?.name || "";
    const title = t.name || "";
    try {
      const l = await getLyrics(artist, title);
      // lyrics.ovh returns { lyrics: "..." }
      const parsed = typeof l === "string" ? JSON.parse(l) : l;
      setLyrics(parsed.lyrics || "");
    } catch (e) {
      setLyrics("Lyrics not found.");
    }
    // duration fallback: use track.duration_ms / 1000 if present
    if (t.duration_ms) setDuration(t.duration_ms / 1000);
  };

  const handleProgress = (state) => {
    // state.playedSeconds available from ReactPlayer preview
    window.__CURRENT_PLAYER_TIME = state.playedSeconds;
  };


  return (
    <div className="app">
      <h1>Music Player</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="player-area">
        <Player track={track} onProgress={handleProgress} />
        <div>
          <LyricsDisplay lyricsText={lyrics} mode={mode} duration={duration} syncMap={syncMap} />
        </div>
      </div>

      <div className="results">
        {/* {results.map(r => (
          <div key={r.id} onClick={() => selectTrack(r)}>
            {r.name} — {r.artists?.map(a => a.name).join(", ")} 
          </div>
        ))} */}

        {/* {results.map(r => (
          <div
            key={r.id}
            className="flex flex-col sm:flex-row justify-between items-center gap-2 p-2 border-b border-gray-700 hover:bg-gray-800 rounded-md cursor-pointer transition"
            onClick={() => selectTrack(r)}
          >
            <div className="text-left flex-1">
              <span className="font-semibold">{r.name}</span> —{" "}
              <span className="text-gray-400">{r.artists?.map(a => a.name).join(", ")}</span>
            </div>

            {r.external_urls?.spotify && (
              <a
                href={r.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // prevent triggering selectTrack
                className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
              >
                🎧 Open in Spotify
              </a>
            )}
          </div>
        ))} */}





        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {results.map((r) => (
    <div
      key={r.id}
      className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 shadow-md transition duration-200 flex flex-col items-center text-center"
    >
      {/* Album image — clicking this will start playback */}
      <img
        src={r.album?.images?.[0]?.url}
        alt={r.name}
        onClick={() => selectTrack(r)}
        className="w-40 h-40 object-cover rounded-lg mb-3 cursor-pointer hover:scale-105 transition-transform duration-200"
      />

      {/* Song + artist info */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold">{r.name}</h3>
        <p className="text-gray-400 text-sm mb-3">
          {r.artists?.map((a) => a.name).join(", ")}
        </p>
      </div>

      {r.external_urls?.spotify && (
        <a
          href={r.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Prevent triggering selectTrack
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md mt-auto"
        >
          🎧 Open in Spotify
        </a>
      )}
    </div>
  ))}
</div>


      </div>


    </div>
  );
}

export default App;
