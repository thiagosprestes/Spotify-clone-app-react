import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import { FaPlay } from 'react-icons/fa';

import api from '../../services/api';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

import { useDispatch } from 'react-redux';

function UserRecentlyPlayed() {
    const [ recentlyPlayed, setRecentlyPlayed ] = useState([]);

    const dispatch = useDispatch();

    async function handleLoad() {
        const response = await api.get('/me/player/recently-played?limit=10');

        setRecentlyPlayed(response.data.items);
    }

    useEffect(() => {
        handleLoad();
    }, []);

    function previewPlayerData(track, albumImage, artists) {
        dispatch({ type: 'PLAY_TRACK',  trackInfo: [track], trackImage: albumImage , trackArtists: artists})
    }

    return (
        <div id="recently-played">
            <h2>Tocadas recentemente</h2>
            <table>
                <tbody>
                    {recentlyPlayed.map(data => (
                        <tr key={data.played_at}>
                            <td>
                                <span onClick={() => previewPlayerData(data.track, data.track.album.images[0].url, data.track.artists)}>
                                    <FaPlay />
                                </span>
                            </td>
                            <td>
                                <span onClick={() => previewPlayerData(data.track, data.track.album.images[0].url, data.track.artists)}>
                                    {data.track.name}
                                </span>
                            </td>
                            <td>
                                {data.track.artists.map(artist => (    
                                    <Link to={`/artist/id=${artist.id}`} key={artist.id}>                        
                                        <span>{artist.name}</span>    
                                    </Link>                        
                                ))}
                            </td>
                            <td>
                                {millisToMinutesAndSeconds(data.track.duration_ms)}
                            </td>
                        </tr>      
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserRecentlyPlayed;