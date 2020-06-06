import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import './styles.css';

import { FaSpotify } from 'react-icons/fa';

import { IoMdCloseCircleOutline } from 'react-icons/io';

import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';

export default function Player() {
    const [togglePlayer, setTogglePlayer] = useState(false);

    const trackData = useSelector((state) => state.player.data);

    useEffect(() => {
        setTogglePlayer(true);
    }, [trackData]);

    return (
        <div
            id="player"
            style={togglePlayer ? { display: 'flex' } : { display: 'none' }}
        >
            {trackData.length !== 0 && (
                <>
                    <div className="track-data">
                        <div
                            className="close-player"
                            onClick={() => setTogglePlayer(false)}
                        >
                            <IoMdCloseCircleOutline size="1.5rem" />
                        </div>
                        <Link to={`/album/id=${trackData.album.id}`}>
                            <div
                                className="track-cover cover"
                                style={{
                                    backgroundImage: `url(${trackData.album.images[0].url})`,
                                }}
                            />
                        </Link>
                        <div className="track-info">
                            <Link to={`/album/id=${trackData.album.id}`}>
                                <span className="track-name">
                                    {trackData.name}
                                </span>
                            </Link>
                            {trackData.artists.map((artist) => (
                                <Link
                                    to={`/artist/id=${artist.id}`}
                                    key={artist.id}
                                >
                                    <span className="track-artist">
                                        {artist.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="track-slider">
                        <AudioPlayer
                            src={trackData.preview_url}
                            customAdditionalControls={[]}
                            layout="stacked-reverse"
                            autoPlay
                            volume={0.5}
                            showDownloadProgress={false}
                        />
                    </div>
                    <div className="options">
                        <a
                            className="spotify"
                            href={`https://open.spotify.com/track/${trackData.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaSpotify size="1.5rem" />
                            Ouvir no spotify
                        </a>
                        <div className="spotify-icon">
                            <a
                                href={`https://open.spotify.com/track/${trackData.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaSpotify size="2rem" />
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
