import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

function User() {
    const [ user, setUser ] = useState([]);
    const [ userPicture, setUserPicture ] = useState([]);
    const [ playlists, setPlaylists ] = useState([]);

    const [ next, setNext ] = useState('');

    const [ load, setLoad ] = useState(true);

    const id = useParams().userId;

    function endpoint(url, data) {
        api.get(url).then(data)
        .finally(() => {
            setLoad(false)
        })
    }

    useEffect(() => {
        async function loadUser() {
            await endpoint(`/users/${id}`, (response) => {
                setUser(response.data);
                setUserPicture(response.data.images[0].url)
            })
        }

        async function loadPlaylists() {
            await endpoint(`/users/${id}/playlists?limit=50`, (response) => {
                setPlaylists(response.data.items)
                setNext(response.data.next);
            })
        }

        loadUser();
        loadPlaylists();
    }, [])

    async function loadMore() {
        const endpointURL = next.replace('https://api.spotify.com/v1', '');

        await api.get(endpointURL)
        .then((response) => {
            setPlaylists(playlists.concat(response.data.items))
            setNext(response.data.next);
        })
    }

    return(
        <>
            {load && <h2 className="loading">Carregando...</h2>}
            {!load &&
                <div id="profile" className="container">
                    <div className="header">
                        <div className="user-picture cover" style={{backgroundImage: `url(${userPicture == 0 ? defaultImage : userPicture})`}}></div>
                        <span className="username">{user.display_name}</span>
                    </div>
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

export default User;