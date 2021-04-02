import React from 'react'

function Player(props) {
  return (
    <iframe
      src={props.embedded}
      allow="encrypted-media"
      title="Spotify-Embedded-Player"
      width="300"
      height="380"
    >
    </iframe>
  );
}

export default Player
