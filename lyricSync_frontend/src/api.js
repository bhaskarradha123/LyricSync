import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const search = (q) =>
  axios.get(`${API_BASE}/search?q=${q}`).then((r) => r.data);
export const getLyrics = (artist, title) =>
  axios.get(`${API_BASE}/lyrics?artist=${artist}&title=${title}`).then((r) => {
    console.log(r.data);
    return r.data;
  });
export const getToken = () =>
  axios.get(`${API_BASE}/token`).then((r) => r.data);
