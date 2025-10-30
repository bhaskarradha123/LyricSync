import React, {useEffect, useState, useRef} from "react";

/**
 * props:
 *  - lyricsText: string (full lyrics)
 *  - mode: "auto" | "manual"
 *  - duration: song duration in seconds (for auto mode)
 *  - syncMap: optional array of { time: seconds, index: charIndex } for manual karaoke
 */
export default function LyricsDisplay({ lyricsText="", mode="auto", duration=30, syncMap }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const rafRef = useRef();
  const startRef = useRef();

  // flatten lyrics to single string
  const full = lyricsText.replace(/\r/g,"");

  useEffect(() => {
    setVisibleCount(0);
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    if (mode === "manual" && syncMap && syncMap.length>0) {
      // use syncMap to drive visibleCount via setInterval/RAF
      const startTime = performance.now();
      let idx = 0;
      function tick(now) {
        const elapsed = (now - startTime)/1000;
        // find highest mapping time <= elapsed
        while (idx < syncMap.length && syncMap[idx].time <= elapsed) {
          setVisibleCount(syncMap[idx].index);
          idx++;
        }
        rafRef.current = requestAnimationFrame(tick);
      }
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // auto distribute duration across chars
      if (!duration || duration <= 0) return;
      const total = full.length || 1;
      const msPerChar = (duration*1000) / total;
      let i = 0;
      function step() {
        i++;
        setVisibleCount(i);
        if (i < total) {
          rafRef.current = setTimeout(step, msPerChar);
        }
      }
      rafRef.current = setTimeout(step, msPerChar);
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(rafRef.current);
    };
  }, [lyricsText, mode, duration, syncMap]);

  return (
    <pre className="lyrics">
      {full.slice(0, visibleCount)}
      <span className="cursor">|</span>
    </pre>
  );
}
