import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

function UserTopArtists() {
    const [topArtists, setTopArtists] = useState([]);

    async function handleLoad() {
        const response = await api.get('/me/top/artists?limit=5');

        setTopArtists(response.data.items);
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <div id="top-artists">
            <h2>Seus artistas favoritos</h2>
            <ul>
                {topArtists.map((data) => (
                    <li key={data.id}>
                        <div
                            className="artist-image"
                            style={{
                                backgroundImage: `url(${data.images[2].url})`,
                            }}
                        />
                        <Link to={`artist/id=${data.id}`}>
                            <span>{data.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserTopArtists;
