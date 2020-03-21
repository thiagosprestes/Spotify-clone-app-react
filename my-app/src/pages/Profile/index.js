import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

import { FaPlay, FaRegHeart, FaShareAlt } from 'react-icons/fa';

function Profile() {
    const [ user, setUser ] = useState([]);
    const [ artists, setArtists ] = useState([]);
    const [ tracks, setTracks ] = useState([]);

    const [ recently, setRecently ] = useState([]);

    const [ tracksTerm, setTracksTerm ] = useState('long_term');
    const [ artistsTerm, setArtistsTerm ] = useState('long_term');

    const [ load, setLoad ] = useState(true);

    function endpoint(url, data) {
        api.get(url).then(data)
        .finally(() => {
            setLoad(false)
        })
    }

    useEffect(() => {
        async function loadUser() {
            await endpoint(`/me`, (response) => {
                setUser(response.data);
            })
        }

        async function loadRecently() {
            await endpoint('/me/player/recently-played?limit=10', (response) => {
                setRecently(response.data.items)
            })
        }

        loadUser();
        loadRecently();
    }, [])

    useEffect(() => {
        async function loadTracks() {
            await endpoint(`/me/top/tracks?time_range=${tracksTerm}&limit=10`, (response) => {
                setTracks(response.data.items);
            })
        }

        loadTracks()
    }, [tracksTerm])

    useEffect(() => {
        async function loadArtists() {
            await endpoint(`/me/top/artists?time_range=${artistsTerm}&limit=10`, (response) => {
                setArtists(response.data.items);
            })
        }

        loadArtists()
    }, [artistsTerm])

    return(
        <>
            {load && <h2 className="loading">Carregando...</h2>}
            {!load &&
                <div id="profile" className="container">
                    <div className="header">
                        <div className="user-picture cover" style={{backgroundImage: `url(${user.images == 0 ? defaultImage : user.images})`}}></div>
                        <span className="username">{user.display_name}</span>
                    </div>
                    <div className="tracks">
                        <div className="options-header">
                            <h2>Músicas mais escutadas por você</h2>
                            <div className="options">
                                <span onClick={() => setTracksTerm('long_term')} style={{ color: tracksTerm == 'long_term' ? '#FFF' : ''}}>Todos os tempos</span>
                                <span onClick={() => setTracksTerm('medium_term')} style={{ color: tracksTerm == 'medium_term' ? '#FFF' : ''}}>6 meses</span>
                                <span onClick={() => setTracksTerm('short_term')} style={{ color: tracksTerm == 'short_term' ? '#FFF' : ''}}>4 semanas</span>
                            </div>
                        </div>
                        <div className="tracks-list">
                            <table>
                                <thead align="left">
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Artista</th>
                                        <th>Album</th>
                                        <th>Duração</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tracks.map(track => (
                                        <tr className="track-info" key={track.id}>
                                            <td>
                                                <FaPlay />
                                            </td>
                                            <td>{track.name}</td>
                                            <td>
                                                <Link to={`/artist/id=${track.artists[0].id}`}>{track.artists[0].name}</Link>
                                            </td>
                                            <td>
                                                <Link to={`/album/id=${track.album.id}`}>{track.album.name}</Link>
                                            </td>
                                            <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>                
                    </div>
                    <div className="artists-and-recently">
                        <div className="artists">
                            <div className="options-header">
                                <h2>Artistas mais escutados por você</h2>
                                <div className="options">
                                    <span onClick={() => setArtistsTerm('long_term')} style={{ color: artistsTerm == 'long_term' ? '#FFF' : ''}}>Todos os tempos</span>
                                    <span onClick={() => setArtistsTerm('medium_term')} style={{ color: artistsTerm == 'medium_term' ? '#FFF' : ''}}>6 meses</span>
                                    <span onClick={() => setArtistsTerm('short_term')} style={{ color: artistsTerm == 'short_term' ? '#FFF' : ''}}>4 semanas</span>
                                </div>
                            </div>
                            <div className="artists-list">
                                {artists.map(artist => (
                                    <div className="artist" key={artist.id}>
                                        <div className="artist-cover cover" style={{backgroundImage: `url(${artist.images[0].url})`}}></div>
                                        <span>
                                            <Link to={`/artist/id=${artist.id}`}>{artist.name}</Link>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="recently-played">
                            <div className="options-header">
                                <h2>Tocadas recentemente</h2>
                            </div>
                            <div className="recently-list">
                                {recently.map(data => (
                                    <div className="track" key={data.track.id}>
                                        <div className="track-cover cover" style={{backgroundImage: `url(${data.track.album.images[0].url})`}}></div>
                                        <span>{data.track.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Profile;