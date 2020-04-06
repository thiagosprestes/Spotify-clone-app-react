import React from 'react';

import { NavLink } from 'react-router-dom';

import { MdHome, MdPerson, MdPlaylistPlay, MdMusicNote, MdAlbum } from 'react-icons/md';

import { FiSearch, FiClock } from 'react-icons/fi';

import { FaHeart } from 'react-icons/fa';

import './styles.css';

import logo from '../../assets/spotify-clone-app-logo-white.png';

function Sidebar() {
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
                    <NavLink className="item-link" to="/profile">
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
                    <NavLink exact className="item-link" to="/recently-played">
                        <div className="item-icon">
                            <FiClock size="2em" />
                        </div>
                        <div className="item-text">Recentes</div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink exact className="item-link" to="/collection/tracks">
                        <div className="item-icon">
                            <FaHeart size="2em" />
                        </div>
                        <div className="item-text">Músicas curtidas</div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink exact className="item-link" to="/collection/playlists">
                        <div className="item-icon">
                            <MdPlaylistPlay size="2em" />
                        </div>
                        <div className="item-text">Playlists</div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="item-link" to="/collection/artists">
                        <div className="item-icon">
                            <MdMusicNote size="2em" />
                        </div>
                        <div className="item-text">
                            Artistas
                        </div>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink className="item-link" to="/collection/albums">
                        <div className="item-icon">
                            <MdAlbum size="2em" />
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