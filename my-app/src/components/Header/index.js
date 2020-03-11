import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

function Header() {
    const [ user, setUser ] = useState('')

    useEffect(() => {
        async function load() {
            const response = await api.get('/me')

            setUser(response.data.display_name)
        }

        load()
    }, [])

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