import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaPlay } from 'react-icons/fa';

import api from '../../services/api';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

import './styles.css';

function Liked() {
    const [ tracks, setTracks ] = useState([]);

    const [ next, setNext ] = useState('');

    const [ load, setLoad ] = useState(true);

    useEffect(() => {
        async function loadTracks() {
            await api.get('/me/tracks?market=br&limit=50')
            .then((response) => {
                setTracks(response.data.items);
                setNext(response.data.next);
            })
            .finally(() => {
                setLoad(false);
            })
        }

        loadTracks();
    }, [])

    async function loadMore() {
        const removeEndpointURL = next.replace('https://api.spotify.com/v1', '')

        await api.get(removeEndpointURL)
        .then((response) => {
            setTracks(tracks.concat(response.data.items));            
        })

    }

    return (
        <>
            {load && <h2 className="loading">Carregando...</h2>}
            {!load &&
                <div id="liked-tracks" className="container">
                    <h2>Músicas que você curtiu</h2>
                    <div className="tracks-list">
                        <table className="tracks-table">
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
                                {tracks.map(data => (
                                    <tr className="track-info" key={data.track.id}>
                                        <td>
                                            <FaPlay />
                                        </td>
                                        <td>{data.track.name}</td>
                                        <td>
                                            <Link to={`/artist/id=${data.track.artists[0].id}`}>{data.track.artists[0].name}</Link>
                                        </td>
                                        <td>
                                            <Link to={`/album/id=${data.track.album.id}`}>{data.track.album.name}</Link>
                                        </td>
                                        <td>{millisToMinutesAndSeconds(data.track.duration_ms)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>     
                    <div className="load-more">
                        <button onClick={loadMore}>Carregar mais</button> 
                    </div>
                </div>
            }
        </>
    )
}

export default Liked;