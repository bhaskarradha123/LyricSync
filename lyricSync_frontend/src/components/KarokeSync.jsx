import React, {useState} from "react";

/**
 * Props:
 *  - onCapture(time, index) -> called when user captures a timestamp
 *  - onSave(syncArray) -> saves final mapping
 */
export default function KaraokeSync({ onCapture, onSave }) {
  const [captures, setCaptures] = useState([]);
  function capture(time, index) {
    const newC = [...captures, {time, index}];
    setCaptures(newC);
    if (onCapture) onCapture(time, index);
  }
  return (
    <div className="karaoke-sync">
      <p>Manual sync tool (press capture at each lyric chunk)</p>
      <button onClick={() => {
         // example: capture current player time via window or a ref (you'll wire this)
         const time = window.__CURRENT_PLAYER_TIME || 0;
         const index = captures.length === 0 ? 0 : captures[captures.length-1].index + 10; // example
         capture(time, index);
      }}>Capture</button>
      <button onClick={() => onSave && onSave(captures)}>Save sync</button>
      <ul>
        {captures.map((c,i) => <li key={i}>{i+1}: {c.time}s{'->'} idx {c.index}</li>)}
      </ul>
    </div>
  );
}
