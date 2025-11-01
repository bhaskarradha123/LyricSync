import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export default function Player({ track, onProgress }) {
  const playerRef = useRef();

  useEffect(() => {
  }, [track]);

  if (!track) return <div>Select a track</div>;

  const preview = track.preview_url;
  const spotifyUrl = track.external_urls?.spotify;

  return (
    <div className="player">
      {preview ? (
        <ReactPlayer
          ref={playerRef}
          url={preview}
          controls  
          onProgress={onProgress} 
        />
      ) : spotifyUrl ? (
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
