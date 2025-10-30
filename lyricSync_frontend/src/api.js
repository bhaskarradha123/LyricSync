import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const search = (q) => axios.get(`${API_BASE}/search`, { params: { q } }).then(r => r.data);
export const getLyrics = (artist, title) => axios.get(`${API_BASE}/lyrics`, { params: { artist, title } }).then(r => r.data);
export const getToken = () => axios.get(`${API_BASE}/token`).then(r => r.data);
export const saveSync = (syncObj) => axios.post(`${API_BASE}/sync`, syncObj).then(r => r.data);
