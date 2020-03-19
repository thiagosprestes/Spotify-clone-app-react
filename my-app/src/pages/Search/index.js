import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

function Search() {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ artists, setArtists ] = useState([]);
    const [ tracks, setTracks ] = useState([]);
    const [ albums, setAlbums ] = useState([]);
    const [ playlists, setPlaylists ] = useState([]);

    useEffect(() => {
        async function load() {
            await api.get(`/search?q=${searchTerm}&type=album%2Cartist%2Cplaylist%2Ctrack&market=br`)
            .then((response) => {
                setArtists(response.data.artists.items);
                setTracks(response.data.tracks.items);
                setAlbums(response.data.albums.items);
                setPlaylists(response.data.playlists.items);
            })
        }

        if (searchTerm) {
            load();
        }
    }, [searchTerm])

    return(
        <div id="search" className="container">
            <FiSearch size="1.5em" className="icon" />
            <input type="text" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Busque artistas, músicas ou podcasts" />
            <div className="search-results">
                {artists != 0 &&
                    <div className="artists">
                        <h2>Artistas</h2>
                        <div className="grid-template">
                            {artists.map(artist => (
                                <div className="artist-info" key={artist.id}>
                                    <Link to={`/artist/id=${artist.id}`}>
                                        <div className="artist-cover cover" style={{backgroundImage: `url(${artist.images == 0 ? defaultImage : artist.images[0].url })`}}></div>
                                        <span className="artist-name">{artist.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {artists != 0 &&
                    <div className="albums">
                        <h2>Albums</h2>
                        <div className="grid-template">
                            {albums.map(data => (
                                <div className="album-info" key={data.id}>
                                    <Link to={`/album/id=${data.id}`}>
                                        <div className="album-cover cover" style={{backgroundImage: `url(${data.images == 0 ? defaultImage : data.images[0].url })`}}></div>
                                        <span className="album-name">{data.name}</span>
                                    </Link>
                                    <Link to={`/artist/id=${data.artists[0].id}`}>
                                        <span className="album-artist">{data.artists[0].name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {playlists != 0 &&
                    <div className="playlists">
                        <h2>Playlists</h2>
                        <div className="grid-template">
                            {playlists.map(data => (
                                <div className="album-info" key={data.id}>
                                    <Link to={`/playlist/id=${data.id}`}>
                                        <div className="album-cover cover" style={{backgroundImage: `url(${data.images == 0 ? defaultImage : data.images[0].url })`}}></div>
                                        <span className="album-name">{data.name}</span>
                                    </Link>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Search;