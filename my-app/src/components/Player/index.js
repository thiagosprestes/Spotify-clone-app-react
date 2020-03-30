import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import { FaRegPlayCircle } from 'react-icons/fa';

import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io';

import { MdDevicesOther } from 'react-icons/md';

import { AiOutlineSound } from 'react-icons/ai';

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
                <>
                <div className="track" key={data.track.id}>
                    <Link to={`/album/id=${data.track.album.id}`}>
                        <div className="cover track-cover" style={{backgroundImage: `url(${data.track.album.images[0].url})`}}></div>
                    </Link>
                    <div className="track-info">
                        <Link to={`/album/id=${data.track.album.id}`}>
                            <span className="track-name">{data.track.name}</span>
                        </Link>
                        <Link to={`/artist/id=${data.track.artists[0].id}`}>
                            <span className="track-artist">{data.track.artists[0].name}</span>
                        </Link>                    
                    </div>
                </div>
                <div className="player-control">
                <div className="player-controls">
                    <IoIosSkipBackward size="1.2rem" />
                    <FaRegPlayCircle size="1.8rem" className="play-pause" />
                    <IoIosSkipForward size="1.2rem" />
                </div>
                <div className="progress-bar">
                    
                </div>
            </div>
            
            <div className="options">
                <MdDevicesOther size="1.5rem" />
                <AiOutlineSound size="1.2rem" />
            </div>
            </>
            ))}
            
        </div>
    );
}