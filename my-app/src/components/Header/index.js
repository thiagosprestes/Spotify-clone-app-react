import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import { GiHamburgerMenu } from 'react-icons/gi';

import api from '../../services/api';

function Header() {
    const [ user, setUser ] = useState('');

    const history = useHistory();

    async function loadUser() {
        const response = await api.get('/me');

        setUser(response.data.display_name);

        localStorage.setItem('user', response.data.display_name);
    }

    useEffect(() => {
        loadUser();
    }, []);

    function logout() {
        localStorage.removeItem('user');
        history.push('/login');
    }

    return(
        <div id="header">
            <div className="sidebar-toggle">
                <GiHamburgerMenu />
            </div>
            <div className="user-menu">
                <div className="user">
                    {user}
                </div>
                <div className="user-content">
                    <ul>
                        <li>
                            <Link to="/profile">Perfil</Link>
                        </li>
                        <li onClick={logout}>
                            <Link>Sair</Link>
                        </li>
                    </ul>
                </div>
            </div>            
        </div>
    )
}

export default Header;