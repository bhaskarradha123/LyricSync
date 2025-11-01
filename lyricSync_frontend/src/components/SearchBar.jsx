import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-3 w-full p-4 rounded-2xl
                 bg-white/25 backdrop-blur-lg 
                 shadow-[0_0_25px_rgba(169,16,121,0.35)]
                 border border-white/30 transition-all duration-300"
    >
      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song or artist..."
        className="flex-1 p-3 rounded-xl bg-white/50 focus:outline-none text-gray-900 placeholder-gray-600
                   shadow-inner focus:ring-2 focus:ring-[#A91079]/50 transition-all duration-300"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-[#A91079] to-[#570A57] text-white px-6 py-2 rounded-xl font-semibold
                   shadow-[0_4px_20px_rgba(169,16,121,0.4)] 
                   hover:scale-105 transition-transform duration-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
