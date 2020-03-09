import React from 'react';

import { Link } from 'react-router-dom';

import { MdHome, MdLibraryMusic } from 'react-icons/md';

import { FiSearch } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/spotify-clone-app-logo-white.png';

function Sidebar() {
    return(
        <div id="sidebar">
            <img src={logo} alt="logo" />
            <ul>
                <Link to="/">
                    <li className="menu-item">
                        <div className="item-icon">
                            <MdHome size="2em" />
                        </div>
                        <div className="item-text">Início</div>
                    </li>
                </Link>
                <li className="menu-item">
                    <div className="item-icon">
                        <FiSearch size="2em" />
                    </div>
                    <div className="item-text">
                        Pesquisar
                    </div>
                </li>
                <li className="menu-item">
                    <div className="item-icon">
                        <MdLibraryMusic size="2em" />
                    </div>
                    <div className="item-text">
                        Sua biblioteca
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;