import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

function UserAlbums() {
    const [ albums, setAlbums ] = useState([]);
    const [ next, setNext ] = useState('');

    const [ load, setLoad ] = useState(true);

    useEffect(() => {
        async function loadAlbums() {
            await api.get('/me/albums?limit=50')
            .then((response) => {
                setAlbums(response.data.items);
                setNext(response.data.next);
            })
            .finally(() => {
                setLoad(false)
            })
        }

        loadAlbums();
    }, [])

    function loadMore() {
        const endpointURL = next.replace('https://api.spotify.com/v1', '');

        api.get(endpointURL)
        .then((response) => {
            setAlbums(albums.concat(response.data.items));
            setNext(response.data.next);
        })
    }

    return(
        <>
            {load && <h2 className="loading">Carregando...</h2>}
            {!load && 
                <div id="albums" className="container">
                    <h2>Álbuns que você salvou</h2>
                    <div className="grid-template">
                        {albums.map((data) => (
                            <div className="item" key={data.album.id}>
                                <Link to={`/album/id=${data.album.id}`}>
                                    <div className="album-cover cover" style={{backgroundImage: `url(${data.album.images == 0 ? defaultImage : data.album.images[0].url})`}}></div>    
                                    <span className="name">{data.album.name}</span>      
                                </Link>     
                                <Link to={`/artist/id=${data.album.artists[0].id}`}>                 
                                    <span className="artist">{data.album.artists[0].name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {next && 
                        <div className="load-more">
                            <button onClick={loadMore}>Carregar mais</button> 
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default UserAlbums;