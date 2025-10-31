import React, { useEffect, useState } from "react";

function LyricsDisplay({ lyricsText, audioRef, isPlaying }) {
  if (!lyricsText) return <p>No lyrics to display.</p>;

  const lines = lyricsText.split("\n").filter(line => line.trim() !== "");
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev < lines.length - 1 ? prev + 1 : prev));
    }, 2000); // simulate every 2 seconds per line

    return () => clearInterval(interval);
  }, [isPlaying, lines.length]);

  return (
    <div style={{ whiteSpace: "pre-line", textAlign: "center", marginTop: "20px" }}>
      {lines.map((line, index) => (
        <p
          key={index}
          style={{
            color: index === currentLine ? "#007bff" : "#333",
            fontWeight: index === currentLine ? "bold" : "normal",
            transition: "all 0.3s ease",
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export default LyricsDisplay;
