import React from 'react';

import { NavLink } from 'react-router-dom';

import {
    MdHome,
    MdPerson,
    MdPlaylistPlay,
    MdMusicNote,
    MdAlbum,
} from 'react-icons/md';

import { FiSearch, FiClock } from 'react-icons/fi';

import { FaHeart } from 'react-icons/fa';

import './styles.css';

import logo from '../../assets/spotify-clone-app-logo-white.png';

function Sidebar({ sidebarState }) {
    const menuItems = [
        {
            label: 'Início',
            path: '/',
            icon: <MdHome size="2rem" />,
        },
        {
            label: 'Buscar',
            path: '/search',
            icon: <FiSearch size="2rem" />,
        },
        {
            label: 'Perfil',
            path: '/profile',
            icon: <MdPerson size="2rem" />,
        },
    ];

    const libraryItems = [
        {
            label: 'Recentes',
            path: '/recently-played',
            icon: <FiClock size="2rem" />,
        },
        {
            label: 'Músicas curtidas',
            path: '/collection/tracks',
            icon: <FaHeart size="2rem" />,
        },
        {
            label: 'Playlists',
            path: '/collection/playlists',
            icon: <MdPlaylistPlay size="2rem" />,
        },
        {
            label: 'Artistas',
            path: '/collection/artists',
            icon: <MdMusicNote size="2rem" />,
        },
        {
            label: 'Álbuns',
            path: '/collection/albums',
            icon: <MdAlbum size="2rem" />,
        },
    ];

    return (
        <div id="sidebar">
            <img src={logo} alt="logo" />
            <ul>
                {menuItems.map((data) => (
                    <li
                        key={data.path}
                        className="menu-item"
                        onClick={window.innerWidth <= 810 ? sidebarState : null}
                    >
                        <NavLink exact className="item-link" to={data.path}>
                            <div className="item-icon">{data.icon}</div>
                            <div className="item-text">{data.label}</div>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="user-playlists">
                <span>Sua biblioteca</span>
                <ul>
                    {libraryItems.map((data) => (
                        <li
                            key={data.path}
                            className="menu-item"
                            onClick={
                                window.innerWidth <= 810 ? sidebarState : null
                            }
                        >
                            <NavLink exact className="item-link" to={data.path}>
                                <div className="item-icon">{data.icon}</div>
                                <div className="item-text">{data.label}</div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
