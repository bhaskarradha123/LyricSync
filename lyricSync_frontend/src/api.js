// simple backend API wrapper
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export async function searchTracks(q) {
  const res = await axios.get(`${API_BASE}/search`, { params: { q } });
  // backend returns raw spotify search JSON string or object
  return typeof res.data === "string" ? JSON.parse(res.data) : res.data;
}

export async function getLyrics(artist, title) {
  const res = await axios.get(`${API_BASE}/lyrics`, { params: { artist, title } });
  // backend returns { lyrics: "..."} or { error: "..." } or raw string
  return res.data;
}
