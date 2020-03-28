import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

function UserRecentlyPlayed() {
    const [ recentlyPlayed, setRecentlyPlayed ] = useState([]);

    async function handleLoad() {
        const response = await api.get('/me/player/recently-played?limit=10');

        setRecentlyPlayed(response.data.items);
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <div id="recently-played">
            <h2>Tocadas recentemente</h2>
            <table>
                <tbody>
                    {recentlyPlayed.map(data => (
                        <tr key={data.played_at}>
                            <td>{data.track.name}</td>
                            <td>
                                {data.track.artists.map(artist => (    
                                    <Link to={`/artist/id=${artist.id}`} key={artist.id}>                        
                                        <span>{artist.name}</span>    
                                    </Link>                        
                                ))}
                            </td>
                        </tr>      
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserRecentlyPlayed;