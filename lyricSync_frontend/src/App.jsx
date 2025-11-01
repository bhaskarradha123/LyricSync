import React, { useState } from "react";
import { search, getLyrics } from "./api";
import SearchBar from "./components/SearchBar";
import Player from "./components/Player";
import LyricsDisplay from "./components/LyricsDisplay";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const [results, setResults] = useState([]);
  const [track, setTrack] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [duration, setDuration] = useState(30);
  const [mode, setMode] = useState("auto");
  const [syncMap, setSyncMap] = useState(null);
  const [theme, setTheme] = useState("light");

  const handleSearch = async (q) => {
    try {
      const json = await search(q);
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
    const artist = t.artists?.[0]?.name || "";
    const title = t.name || "";
    try {
      const l = await getLyrics(artist, title);
      const parsed = typeof l === "string" ? JSON.parse(l) : l;
      setLyrics(parsed.lyrics || "");
    } catch (e) {
      setLyrics("Lyrics not found.");
    }
    if (t.duration_ms) setDuration(t.duration_ms / 1000);
  };

  const handleProgress = (state) => {
    window.__CURRENT_PLAYER_TIME = state.playedSeconds;
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-6 transition-all duration-700 font-modern ${
        theme === "light"
          ? "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 text-gray-900"
          : "bg-gradient-to-br from-[#2E0249] via-[#570A57] to-[#A91079] text-white bg-[length:400%_400%] animate-gradient"
      }`}
    >
      {/* Theme toggle */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 transition"
        >
          {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
        </button>
      </div>

      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`text-5xl md:text-6xl font-extrabold mb-8 tracking-wider select-none 
          text-transparent bg-clip-text transition-all duration-700 ease-in-out
          ${
            theme === "light"
              ? "bg-gradient-to-r from-[#570A57] via-[#A91079] to-[#2E0249] drop-shadow-[0_0_20px_rgba(169,16,121,0.4)]"
              : "bg-gradient-to-r from-[#A91079] via-[#570A57] to-[#F806CC] drop-shadow-[0_0_35px_rgba(248,6,204,0.9)]"
          }`}
        style={{
          backgroundSize: "400% 400%",
          animation: "gradient 10s ease infinite, textPulse 4s ease-in-out infinite",
        }}
      >
        🎵 LyricSync
      </motion.h1>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="w-full max-w-xl mb-8 bg-white/25 backdrop-blur-lg rounded-2xl shadow-lg p-4 hover:bg-white/30 transition-all duration-500"
      >
        <SearchBar onSearch={handleSearch} />
      </motion.div>

      {/* Player + Lyrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-4xl bg-white/15 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between transition-transform duration-500 hover:scale-[1.02]"
      >
        <Player track={track} onProgress={handleProgress} />
        <div className="flex-1">
          <LyricsDisplay
            lyricsText={lyrics}
            mode={mode}
            duration={duration}
            syncMap={syncMap}
          />
        </div>
      </motion.div>

      {/* Results grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="mt-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {results.map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white/25 backdrop-blur-lg rounded-2xl p-5 shadow-xl flex flex-col items-center text-center 
              hover:bg-white/30 hover:shadow-pink-500/30 transition-all duration-500"
          >
            <img
              src={r.album?.images?.[0]?.url}
              alt={r.name}
              onClick={() => selectTrack(r)}
              className="w-40 h-40 object-cover rounded-xl mb-3 cursor-pointer hover:opacity-90 transition"
            />
            <div>
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <p className="opacity-80 text-sm mb-3">
                {r.artists?.map((a) => a.name).join(", ")}
              </p>
            </div>
            {r.external_urls?.spotify && (
              <a
                href={r.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-r from-[#A91079] to-[#570A57] text-white text-sm px-4 py-2 rounded-full mt-auto hover:shadow-lg hover:scale-105 transition"
              >
                🎧 Open in Spotify
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default App;
