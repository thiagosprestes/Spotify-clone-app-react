import React from 'react';

import './styles.css';

import { FaSpotify } from 'react-icons/fa';

function SpotifyButton({ type, id }) {
    return (
        <div className="spotify-link">
            <a
                href={`https://open.spotify.com/${type}/${id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaSpotify size="1.5em" />
                Spotify
            </a>
        </div>
    );
}

export default SpotifyButton;
