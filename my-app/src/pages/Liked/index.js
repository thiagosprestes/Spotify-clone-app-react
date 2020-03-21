import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaPlay } from 'react-icons/fa';

import api from '../../services/api';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

function Liked() {
    const [ tracks, setTracks ] = useState([]);

    const [ load, setLoad ] = useState(true);

    useEffect(() => {
        async function loadTracks() {
            await api.get('/me/tracks?market=br&limit=50')
            .then((response) => {
                setTracks(response.data.items);
            })
            .finally(() => {
                setLoad(false);
            })
        }

        loadTracks();
    }, [])

    return (
        <>
            {!load && <h2 className="loading">Carregando...</h2>}
            {load &&
                <div id="liked-tracks container">
                    <h2>Músicas que você curtiu</h2>
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
            }
        </>
    )
}

export default Liked;