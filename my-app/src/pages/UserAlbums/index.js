import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

export default function UserAlbums() {
    const [albums, setAlbums] = useState([]);
    const [next, setNext] = useState('');

    const [load, setLoad] = useState(true);

    async function loadAlbums() {
        const response = await api.get('/me/albums?limit=50');

        setAlbums(response.data.items);
        setNext(response.data.next);

        setLoad(false);
    }

    useEffect(() => {
        loadAlbums();
    }, []);

    async function loadMore() {
        const endpointURL = next.replace('https://api.spotify.com/v1', '');

        const response = await api.get(endpointURL);

        setAlbums(albums.concat(response.data.items));
        setNext(response.data.next);
    }

    return (
        <>
            {load ? (
                <h2 className="loading">Carregando...</h2>
            ) : (
                <div id="albums" className="container">
                    <h2>Álbuns que você salvou</h2>
                    <div className="grid-template">
                        {albums.map((data) => (
                            <div className="item" key={data.album.id}>
                                <Link to={`/album/id=${data.album.id}`}>
                                    <div
                                        className="album-cover cover"
                                        style={{
                                            backgroundImage: `url(${
                                                data.album.images.length === 0
                                                    ? defaultImage
                                                    : data.album.images[0].url
                                            })`,
                                        }}
                                    />
                                    <span className="name">
                                        {data.album.name}
                                    </span>
                                </Link>
                                <Link
                                    to={`/artist/id=${data.album.artists[0].id}`}
                                >
                                    <span className="artist">
                                        {data.album.artists[0].name}
                                    </span>
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
