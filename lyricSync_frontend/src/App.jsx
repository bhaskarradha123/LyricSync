import React, {useState, useEffect} from "react";
import { search, getLyrics } from "./api";
import SearchBar from "./components/SearchBar";
import Player from "./components/Player";
import LyricsDisplay from "./components/LyricsDisplay";
import KaraokeSync from "./components/KarokeSync";

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

  const saveSync = (syncArray) => {
    setSyncMap(syncArray);
    // optionally POST to backend to persist: saveSync(syncArray)
  };

  return (
    <div className="app">
      <h1>Music Player</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="results">
        {results.map(r => (
          <div key={r.id} onClick={() => selectTrack(r)}>
            {r.name} — {r.artists?.map(a => a.name).join(", ")}
          </div>
        ))}
      </div>

      <div className="player-area">
        <Player track={track} onProgress={handleProgress} />
        <div>
          <label>
            Mode:
            <select value={mode} onChange={e => setMode(e.target.value)}>
              <option value="auto">Auto-sync</option>
              <option value="manual">Karaoke (manual)</option>
            </select>
          </label>
          <KaraokeSync onSave={saveSync} />
          <LyricsDisplay lyricsText={lyrics} mode={mode} duration={duration} syncMap={syncMap} />
        </div>
      </div>
    </div>
  );
}

export default App;
