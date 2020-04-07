import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import { FaSpotify } from 'react-icons/fa';

import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';

export default function Player() {

    const trackData = useSelector(state => state.data)

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
            {trackData != '' &&  (
                <>
                    <div className="track-data">
                        <div className="track-cover cover" style={{backgroundImage: `url(${trackData.image})`}}></div>
                        <div className="track-info">
                            <span className="track-name">{trackData.track.name}</span>
                            {trackData.artists.map(artist => (
                                <Link to={`/artist/id=${artist.id}`} key={artist.id}>
                                    <span className="track-artist">{artist.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="track-slider">
                        <AudioPlayer src={trackData.track.preview} customAdditionalControls={[]} layout="stacked-reverse" autoPlay volume={0.5} showDownloadProgress={false} />
                    </div>
                    <div className="options">
                        <a className="spotify" href={`https://open.spotify.com/track/${trackData.track.id}`} target="_blank" rel="noopener noreferrer">
                            <FaSpotify size="1.5rem" />Ouvir no spotify
                        </a>
                        <div className="spotify-icon">
                            <a href={`https://open.spotify.com/track/${trackData.track.id}`} target="_blank" rel="noopener noreferrer">
                                <FaSpotify size="2rem" />
                            </a>
                        </div>
                    </div>
                </>
            )}
            {trackData == '' && lastPlayed.map(data => (
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
                        <AudioPlayer src={data.track.preview_url} customAdditionalControls={[]} layout="stacked-reverse" volume={0.5} showDownloadProgress={false} />
                    </div>
                    <div className="options">
                        <a className="spotify" href={`https://open.spotify.com/track/${data.track.id}`} target="_blank" rel="noopener noreferrer">
                            <FaSpotify size="1.5rem" />Ouvir no spotify
                        </a>
                        <div className="spotify-icon">
                            <a href={`https://open.spotify.com/track/${data.track.id}`} target="_blank" rel="noopener noreferrer">
                                <FaSpotify size="2rem" />
                            </a>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}