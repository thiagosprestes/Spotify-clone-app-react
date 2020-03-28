import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

function Header() {
    const [ user, setUser ] = useState('');

    async function loadUser() {
        const response = await api.get('/me');

        setUser(response.data.display_name);

        localStorage.setItem('user', response.data.display_name);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return(
        <div id="header">
            <div className="user">
                <NavLink to="/profile">
                    {user}
                </NavLink>
            </div>
        </div>
    )
}

export default Header;