import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../../services/api';

function UserTopArtists() {
    const [ topArtists, setTopArtists ] = useState([]);

    const [ load, setLoad ] = useState(true)

    useEffect(() => {
        async function handleLoad() {
            await api.get('/me/top/artists?limit=5')
            .then(response => {
                setTopArtists(response.data.items)
            })
            .finally(() => {
                setLoad(false)
            })
        }

        handleLoad()
    }, [])

    return (
        <div id="top-artists">
            <h2>Seus artistas favoritos</h2>
            <ul>
                {topArtists.map(data => (
                    <li>
                        <div className="artist-image" style={{backgroundImage: `url(${data.images[2].url})`}}></div>
                        <span>{data.name}</span>
                    </li>      
                ))}
            </ul>
        </div>
    )
}

export default UserTopArtists;