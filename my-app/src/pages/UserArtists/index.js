import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

export default function UserArtists() {
    const [artists, setArtists] = useState([]);
    const [next, setNext] = useState('');

    const [load, setLoad] = useState(true);

    async function loadArtists() {
        const response = await api.get('/me/following?type=artist&limit=50');

        setArtists(response.data.artists.items);
        setNext(response.data.artists.next);

        setLoad(false);
    }

    useEffect(() => {
        loadArtists();
    }, []);

    async function loadMore() {
        const endpointURL = next.replace('https://api.spotify.com/v1', '');

        const response = await api.get(endpointURL);

        setArtists([...artists, ...response.data.artists.items]);
        setNext(response.data.artists.next);
    }

    return (
        <>
            {load ? (
                <h2 className="loading">Carregando...</h2>
            ) : (
                <div id="artists" className="container">
                    <h2>Artistas que você segue</h2>
                    <div className="grid-template">
                        {artists.map((artist) => (
                            <div className="item" key={artist.id}>
                                <Link to={`/artist/id=${artist.id}`}>
                                    <div
                                        className="artist-cover cover"
                                        style={{
                                            backgroundImage: `url(${
                                                artist.images.length === 0
                                                    ? defaultImage
                                                    : artist.images[0].url
                                            })`,
                                        }}
                                    />
                                    <div className="name-and-description">
                                        <span className="name">
                                            {artist.name}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {next && (
                        <div className="load-more">
                            <button type="button" onClick={loadMore}>
                                Carregar mais
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
