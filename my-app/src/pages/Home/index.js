import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../../services/api';

import HomeItems from '../../components/HomeItems';

import UserRecentlyPlayed from '../../components/UserRecentlyPlayed';

import UserTopArtists from '../../components/UserTopArtists';

function Home() {
    const [newReleases, setNewReleases] = useState([]);
    const [categories, setCategories] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    const [load, setLoad] = useState(true);

    async function loadReleases() {
        const response = await api.get(
            '/browse/new-releases?country=BR&limit=5'
        );

        setNewReleases(response.data.albums.items);

        setLoad(false);
    }

    async function loadCategories() {
        const response = await api.get('/browse/categories?country=br&limit=5');

        setCategories(response.data.categories.items);

        setLoad(false);
    }

    async function loadPlaylists() {
        const response = await api.get(
            'browse/featured-playlists?country=br&limit=5'
        );

        setPlaylists(response.data.playlists.items);

        setLoad(false);
    }

    useEffect(() => {
        loadReleases();
        loadCategories();
        loadPlaylists();
    }, []);

    return (
        <div id="home" className="container">
            {load ? (
                <h1 className="loading">Carregando...</h1>
            ) : (
                <>
                    <HomeItems
                        itemType="album"
                        itemTitle="Novos lançamentos"
                        itemData={newReleases}
                    />
                    <HomeItems
                        itemType="category"
                        itemTitle="Gêneros em alta"
                        itemDataCategories={categories}
                    />
                    <HomeItems
                        itemType="playlist"
                        itemTitle="Playlists em alta"
                        itemData={playlists}
                    />
                    <div className="user-top-lists">
                        <UserRecentlyPlayed />
                        <UserTopArtists />
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
