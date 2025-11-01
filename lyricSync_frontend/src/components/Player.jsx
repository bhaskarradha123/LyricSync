import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export default function Player({ track, onProgress }) {
  // track: object from Spotify search (contains external_urls.spotify or preview_url etc)
  const playerRef = useRef();

  useEffect(() => {
    // nothing required here, but you can handle setup for Web Playback SDK if you'd do full Spotify playback.
  }, [track]);

  if (!track) return <div>Select a track</div>;

  // Use preview_url if available; otherwise use Spotify embed
  const preview = track.preview_url;
  const spotifyUrl = track.external_urls?.spotify;

  return (
    <div className="player">
      {preview ? (
        <ReactPlayer
          ref={playerRef}
          url={preview}
          controls
          onProgress={onProgress} // receives {playedSeconds, played}
        />
      ) : spotifyUrl ? (
        // embed Spotify player
        <iframe
          title="spotify-embed"
          src={`https://open.spotify.com/embed/track/${track.id}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        />
      ) : (
        <div>No playable preview. Open in Spotify: <a href={spotifyUrl}>{spotifyUrl}</a></div>
      )}
    </div>
  );
}
