import React, { useEffect } from 'react';

import './styles.css';

import logo from '../../assets/spotify-clone-app-logo.png';

import api from '../../services/api';

import getHashParams from '../../utils/getHashParams';

function Login() {
    const token = getHashParams().access_token;

    localStorage.setItem('acess_token', token);

    useEffect(() => {
        async function load() {
            const response = await api.get("/artists/163tK9Wjr9P9DmM0AVK7lm/top-tracks?country=BR")

            console.log(response.data.tracks[0].name)
        }

        load()
    }, [])

    return (
        <>
            <div className="header">
                <a href="#" className="spotify-logo">
                    <img src={logo} alt="Logo" />
                </a>
            </div>
            <div className="content">
                <button>
                    <a href="http://localhost:8888/login">Fazer login no Spotify</a>
                </button>
                <div className="login-info">
                    Ao clicar no botão acima você será redirecionado para a página de Login do Spotify
                </div>
            </div>
        </>
    )
}

export default Login;