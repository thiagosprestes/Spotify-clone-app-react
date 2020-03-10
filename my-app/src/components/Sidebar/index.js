import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import { MdHome, MdLibraryMusic, MdPerson } from 'react-icons/md';

import { FiSearch } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/spotify-clone-app-logo-white.png';

import api from '../../services/api';

function Sidebar() {
    const [ recently, setRecently ] = useState([])

    useEffect(() => {
        async function load() {
            const response = await api.get('/me/player/recently-played?limit=10')

            setRecently(response.data.items)
        }

        load()
    }, [])

    return(
        <div id="sidebar">
            <img src={logo} alt="logo" />
            <ul>
                <li className="menu-item">
                    <NavLink exact className="item-link" to="/">
                        <div className="item-icon">
                            <MdHome size="2em" />
                        </div>
                        <div className="item-text">Início</div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="item-link" to="/search">
                        <div className="item-icon">
                            <FiSearch size="2em" />
                        </div>
                        <div className="item-text">
                            Buscar
                        </div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="item-link" to="/collection">
                        <div className="item-icon">
                            <MdPerson size="2em" />
                        </div>
                        <div className="item-text">
                            Seu perfil
                        </div>
                    </NavLink>
                </li>
            </ul>
            <div className="user-playlists">
                <span>Sua biblioteca</span>
                <ul>
                <li className="menu-item">
                    <NavLink exact className="item-link" to="/">
                        <div className="item-icon">
                            <MdHome size="2em" />
                        </div>
                        <div className="item-text">Recentes</div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink exact className="item-link" to="/">
                        <div className="item-icon">
                            <MdHome size="2em" />
                        </div>
                        <div className="item-text">Músicas curtidas</div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink exact className="item-link" to="/">
                        <div className="item-icon">
                            <MdHome size="2em" />
                        </div>
                        <div className="item-text">Playlists</div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="item-link" to="/search">
                        <div className="item-icon">
                            <FiSearch size="2em" />
                        </div>
                        <div className="item-text">
                            Podcasts
                        </div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="item-link" to="/collection">
                        <div className="item-icon">
                            <MdPerson size="2em" />
                        </div>
                        <div className="item-text">
                            Artistas
                        </div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="item-link" to="/collection">
                        <div className="item-icon">
                            <MdPerson size="2em" />
                        </div>
                        <div className="item-text">
                            Álbuns
                        </div>
                    </NavLink>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default Sidebar;