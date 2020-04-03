import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import { FaSpotify } from 'react-icons/fa';

import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';

export default function Player() {
    const [ lastPlayed, setLastPlayed ] = useState([]);

    const [ load, setLoad ] = useState(true);

    async function loadLastPlayed() {
        const response = await api.get(`https://api.spotify.com/v1/me/player/recently-played?limit=1`);

        setLastPlayed(response.data.items);

        setLoad(false);
    }

    useEffect(() => {
        loadLastPlayed();
    }, []);

    return(
        <div id="player">
            {lastPlayed.map(data => (
                <React.Fragment key={data.track.id}>
                    <div className="track-data">
                        <Link to={`/album/id=${data.track.album.id}`}>
                            <div className="track-cover cover" style={{backgroundImage: `url(${data.track.album.images[0].url})`}}></div>
                        </Link>
                        <div className="track-info">
                            <Link to={`/album/id=${data.track.album.id}`}>
                                <span className="track-name">{data.track.name}</span>
                            </Link>
                            {data.track.artists.map(artist => (
                                <Link to={`/artist/id=${artist.id}`} key={artist.id}>
                                    <span className="track-artist">{artist.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="track-slider">
                        <AudioPlayer src={data.track.preview_url} customAdditionalControls={[]} layout="stacked-reverse" />
                    </div>
                    <div className="options">
                        <a className="spotify" href={`https://open.spotify.com/album/${data.track.album.id}`} target="_blank" rel="noopener noreferrer">
                            <FaSpotify size="1.5rem" />Ouvir no spotify
                        </a>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}