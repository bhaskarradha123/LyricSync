import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Spinner, Alert } from "react-bootstrap";

import { searchTracks, getLyrics } from "./api";
import "./index.css";
import SongCard from "./components/SongCard";
import LyricsDisplay from "./components/LyricsDisplay";

/**
 * App.js
 * - Search bar to call backend search endpoint
 * - Displays results as cards (SongCard)
 * - Single audio element controlled from here (ensures only one track plays)
 * - Fetches lyrics when a track is played and displays via LyricsDisplay
 */

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // list of track objects
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState("");

  const audioRef = useRef(new Audio()); // single audio element for app
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [lyricsText, setLyricsText] = useState("");
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [lyricsError, setLyricsError] = useState("");

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTrackId(null);
    };
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // When selected audio changes, attach source and play/pause handling
  async function handlePlay(track) {
    // If same track is already playing -> pause it
    if (currentTrackId === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // Stop previous audio and reset
    audioRef.current.pause();
    audioRef.current.src = ""; // clear
    setIsPlaying(false);
    setLyricsText("");
    setLyricsError("");

    // If preview URL not available: open external link
    if (!track.preview_url) {
      window.open(track.external_urls?.spotify, "_blank");
      return;
    }

    // Set new source and play
    audioRef.current.src = track.preview_url;
    audioRef.current.load();

    try {
      // Play (browser may block autoplay until user gesture — our button click is a gesture)
      await audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrackId(track.id);
    } catch (err) {
      console.error("Playback failed:", err);
      setIsPlaying(false);
      return;
    }

    // Fetch lyrics (background)
    setLoadingLyrics(true);
    try {
      const res = await getLyrics(track.artists?.[0]?.name || "", track.name || "");
      // Expected to return { lyrics: "..." } or { error: "..." } or string
      let data = res;
      if (typeof res === "string") {
        try {
          data = JSON.parse(res);
        } catch (e) {
          // maybe backend returns raw text: treat as lyrics
          data = { lyrics: res };
        }
      }
      if (data.lyrics) {
        setLyricsText(data.lyrics);
      } else if (data.error) {
        setLyricsError(data.error);
      } else {
        // Fallback: if res has nested structure
        setLyricsText(JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
      setLyricsError("Failed to load lyrics");
    } finally {
      setLoadingLyrics(false);
    }
  }

  function handlePause(track) {
    if (currentTrackId === track.id) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  async function doSearch(e) {
    e?.preventDefault();
    if (!query || !query.trim()) return;
    setLoadingSearch(true);
    setSearchError("");
    setResults([]);
    setLyricsText("");
    setLyricsError("");
    try {
      const json = await searchTracks(query);
      // spotify API response has tracks.items
      const tracks = (json.tracks && json.tracks.items) ? json.tracks.items : [];
      setResults(tracks);
    } catch (err) {
      console.error(err);
      setSearchError("Search failed. Try again.");
    } finally {
      setLoadingSearch(false);
    }
  }

  return (
    <Container className="py-4">
      <h2 className="mb-3">LyricSync</h2>

      <Form onSubmit={doSearch}>
        <Form.Group className="d-flex gap-2">
          <Form.Control
            placeholder="Search for a song or artist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            {loadingSearch ? <Spinner animation="border" size="sm" /> : "Search"}
          </button>
        </Form.Group>
      </Form>

      <hr />

      {searchError && <Alert variant="danger">{searchError}</Alert>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {results.map(track => (
          <Col key={track.id}>
            <SongCard
              track={track}
              isPlaying={currentTrackId === track.id && isPlaying}
              onPlay={() => handlePlay(track)}
              onPause={() => handlePause(track)}
            />
          </Col>
        ))}
      </Row>

      <hr />

      <div>
        <h4>Lyrics</h4>
        {loadingLyrics && <div><Spinner animation="border" size="sm" /> Loading lyrics...</div>}
        {lyricsError && <Alert variant="warning">{lyricsError}</Alert>}
        <LyricsDisplay lyricsText={lyricsText} audioRef={audioRef} isPlaying={isPlaying} />
      </div>
    </Container>
  );
}

export default App;
