import React, {useState} from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="search-bar">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search artist or song"
      />
      <button onClick={() => onSearch(q)}>Search</button>
    </div>
  );
}
