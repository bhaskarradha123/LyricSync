import React, { useEffect, useState, useRef } from "react";
export default function LyricsDisplay({ lyricsText = "", mode = "auto", duration = 30, syncMap }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const full = (lyricsText || "").replace(/\r/g, "");

  useEffect(() => {
    setVisibleCount(0);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (mode === "manual" && syncMap && syncMap.length > 0) {
      const startTime = performance.now();
      let idx = 0;
      function tick(now) {
        const elapsed = (now - startTime) / 1000;
        while (idx < syncMap.length && syncMap[idx].time <= elapsed) {
          setVisibleCount(syncMap[idx].index);
          idx++;
        }
        rafRef.current = requestAnimationFrame(tick);
      }
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (!duration || duration <= 0) return;
      const total = full.length || 1;
      const msPerChar = (duration * 1000) / total;
      let i = 0;
      function step() {
        i++;
        setVisibleCount(i);
        if (i < total) {
          timerRef.current = setTimeout(step, msPerChar);
        }
      }
      timerRef.current = setTimeout(step, msPerChar);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [lyricsText, mode, duration, syncMap, full]);

  return (
    <pre className="lyrics whitespace-pre-wrap text-sm text-black/90 leading-relaxed">
      {full.slice(0, visibleCount)}
      <span className="cursor">|</span>
    </pre>
  );
}
