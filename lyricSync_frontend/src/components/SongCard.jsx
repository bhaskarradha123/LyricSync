import React from "react";
import { Card, Button } from "react-bootstrap";

/**
 * SongCard
 * Props:
 *  - track: Spotify track object (expects id, name, artists[], preview_url)
 *  - isPlaying: boolean whether this card's track is currently playing
 *  - onPlay: () => void
 *  - onPause: () => void
 */
export default function SongCard({ track, isPlaying, onPlay, onPause }) {
  const artistNames = (track.artists || []).map(a => a.name).join(", ");

  const previewAvailable = !!track.preview_url;

  return (
    <Card className="mb-3 song-card h-100">
      {track.album && track.album.images && track.album.images[0] && (
        <Card.Img
          variant="top"
          src={track.album.images[0].url}
          alt={`${track.name} cover`}
          style={{ objectFit: "cover", height: 180 }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: "1rem", fontWeight: 600 }}>{track.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: ".9rem" }}>
          {artistNames}
        </Card.Subtitle>

        <div className="mt-auto d-flex align-items-center">
          {previewAvailable ? (
            <>
              {!isPlaying ? (
                <Button variant="primary" size="sm" onClick={onPlay}>
                  ▶ Play
                </Button>
              ) : (
                <Button variant="danger" size="sm" onClick={onPause}>
                  ❚❚ Pause
                </Button>
              )}
              <small className="text-muted ms-2">Preview</small>
            </>
          ) : (
            <a
              className="btn btn-outline-secondary btn-sm"
              href={track.external_urls?.spotify || "#"}
              target="_blank"
              rel="noreferrer"
            >
              Open in Spotify
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
