import React from 'react';

import './styles.css';

import logo from '../../assets/spotify-clone-app-logo.png';

function Login() {
    return (
        <div id="login">
            <div className="header">
                <a href="#" className="spotify-logo">
                    <img src={logo} alt="Logo" />
                </a>
            </div>
            <div className="content">
                <a href="http://localhost:8888/login">
                    <button>
                        Fazer login no Spotify
                    </button>
                </a>
                <div className="login-info">
                    Ao clicar no botão acima você será redirecionado para a página de Login do Spotify
                </div>
            </div>
        </div>
    )
}

export default Login;