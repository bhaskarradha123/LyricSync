import React, { useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

/**
 * SongCard Component
 * -------------------
 * Displays song info with album art, artist names, and playback controls.
 *
 * Props:
 *  - track: Spotify track object (expects id, name, artists[], preview_url)
 *  - isPlaying: boolean whether this card's track is currently playing
 *  - onPlay: (trackId) => void
 *  - onPause: () => void
 */
export default function SongCard({ track, isPlaying, onPlay, onPause }) {
  const audioRef = useRef(null);
  const artistNames = (track.artists || []).map(a => a.name).join(", ");
  const previewAvailable = Boolean(track.preview_url);

  // Sync audio play/pause when state changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.warn("Autoplay blocked:", err));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <Card className="mb-3 song-card h-100 shadow-sm border-0">
      {track.album?.images?.[0]?.url && (
        <Card.Img
          variant="top"
          src={track.album.images[0].url}
          alt={`${track.name} cover`}
          style={{
            objectFit: "cover",
            height: 180,
            borderRadius: "10px 10px 0 0",
          }}
        />
      )}

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title style={{ fontSize: "1rem", fontWeight: 600 }}>
            {track.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: ".9rem" }}>
            {artistNames}
          </Card.Subtitle>
        </div>

        <div className="mt-auto d-flex align-items-center justify-content-between">
          <div>
            {previewAvailable ? (
              !isPlaying ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onPlay(track.id, track.preview_url)}
                >
                  ▶ Play
                </Button>
              ) : (
                <Button variant="danger" size="sm" onClick={onPause}>
                  ❚❚ Pause
                </Button>
              )
            ) : (
              <>
                <Button variant="secondary" size="sm" disabled>
                  No Preview
                </Button>
                <small className="text-muted ms-2">(Preview not available)</small>
              </>
            )}

            {previewAvailable && (
              <audio ref={audioRef} src={track.preview_url} onEnded={onPause} />
            )}
          </div>

          <a
            className="btn btn-outline-success btn-sm"
            href={track.external_urls?.spotify || "#"}
            target="_blank"
            rel="noreferrer"
            title="Open in Spotify"
          >
            Spotify ↗
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}
