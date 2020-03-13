import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../../services/api';

import HomeItems from '../../components/HomeItems';

import UserRecentlyPlayed from '../../components/UserRecentlyPlayed';

import UserTopArtists from '../../components/UserTopArtists';

function Home() {
    const [ newReleases, setNewReleases ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ playlists, setPlaylists ] = useState([]);

    const [ load, setLoad ] = useState(true);

    function endpoint(url, data) {
        api.get(url).then(data).finally(() => {
            setLoad(false)
        }) 
    }

    useEffect(() => {
        async function loadReleases() {
            await endpoint('/browse/new-releases?country=BR&limit=5', (response) => {
                setNewReleases(response.data.albums.items)
            })
        }

        async function loadCategories() {
            await endpoint('/browse/categories?country=br&limit=5', (response) => {
                setCategories(response.data.categories.items)
            })
        }

        async function loadPlaylists() {
            await endpoint('browse/featured-playlists?country=br&limit=5', (response) => {
                setPlaylists(response.data.playlists.items)
            }) 
        }

        loadReleases()
        loadCategories()
        loadPlaylists()
    }, [])

    return (
        <div id="home">
            {load && <h1 className="loading">Carregando...</h1>}
            {!load && (
                <>
                    <HomeItems itemType="album" itemTitle="Novos lançamentos" itemData={newReleases} />
                    <HomeItems itemType="category" itemTitle="Categorias em alta" itemDataCategories={categories} />
                    <HomeItems itemType="playlist" itemTitle="Playlists em alta" itemData={playlists} />
                    <div className="user-top-lists">
                        <UserRecentlyPlayed />
                        <UserTopArtists />
                    </div>                    
                </>
            )}
        </div>
    )
}

export default Home;