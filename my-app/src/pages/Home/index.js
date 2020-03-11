import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../../services/api';

function Home() {
    const [ newReleases, setNewReleases ] = useState([]);

    useEffect(() => {
        async function load() {
            const response = await api.get('/browse/new-releases')

            setNewReleases(response.data.albums.items)
        }

        load()
    }, [])
    
    return (
        <div>
            <h1>AAAAAA</h1>
        </div>
    )
}

export default Home;