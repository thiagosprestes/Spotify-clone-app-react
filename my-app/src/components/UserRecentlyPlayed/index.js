import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../../services/api';

function UserRecentlyPlayed() {
    const [ recentlyPlayed, setRecentlyPlayed ] = useState([]);

    const [ load, setLoad ] = useState(true)

    useEffect(() => {
        async function handleLoad() {
            await api.get('/me/player/recently-played?limit=10')
            .then(response => {
                setRecentlyPlayed(response.data.items)
            })
            .finally(() => {
                setLoad(false)
            })
        }

        handleLoad()
    }, [])

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
                                    <span key={artist.id}>{artist.name}</span>                            
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