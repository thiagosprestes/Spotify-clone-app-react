import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

function Profile() {
    const [ user, setUser ] = useState([]);
    const [ artists, setArtists ] = useState([]);
    const [ tracks, setTracks ] = useState([]);

    function endpoint () {}

    useEffect(() => {
        async function loadUser() {
            await api.get(`/me`)
            .then((response) => {
                setUser(response.data);
            })
        }

        async function loadArtists() {
            await api.get(`/me/top/artists`)
            .then((response) => {
                setArtists(response.data.items);
            })
        }

        loadUser();
        loadArtists();
    }, [])

    return(
        <div id="profile" className="container">
            <div className="header">
                <div className="user-picture cover" style={{backgroundImage: `url(${user.images == 0 ? defaultImage : user.images})`}}></div>
                <span className="username">{user.display_name}</span>
            </div>
        </div>
    )
}

export default Profile;