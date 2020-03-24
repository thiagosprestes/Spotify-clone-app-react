import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

function UserPlaylists() {
    const [ playlists, setPlaylists ] = useState([]);
    const [ next, setNext ] = useState('');

    const [ load, setLoad ] = useState(true);

    useEffect(() => {
        async function loadPlaylists() {
            await api.get('/me/playlists?limit=50')
            .then((response) => {
                setPlaylists(response.data.items);
                setNext(response.data.next);
            })
            .finally(() => {
                setLoad(false)
            })
        }

        loadPlaylists();
    }, [])

    function loadMore() {
        const endpointURL = next.replace('https://api.spotify.com/v1', '');

        api.get(endpointURL)
        .then((response) => {
            setPlaylists(playlists.concat(response.data.items));
            setNext(response.data.next);
        })
    }

    return(
        <>
            {load && <h2 className="loading">Carregando...</h2>}
            {!load && 
                <div id="playlists" className="container">
                    <h2>Suas playlists</h2>
                    <div className="grid-template">
                        {playlists.map((playlist) => (
                            <div className="item" key={playlist.id}>
                                <Link to={`/playlist/id=${playlist.id}`}>
                                    <div className="cover" style={{backgroundImage: `url(${playlist.images == 0 ? defaultImage : playlist.images[0].url})`}}></div>                                
                                    <div className="name-and-description">
                                        <span className="name">{playlist.name}</span>
                                    </div>
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

export default UserPlaylists;