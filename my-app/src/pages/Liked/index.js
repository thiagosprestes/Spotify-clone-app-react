import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaPlay } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';

import api from '../../services/api';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

import './styles.css';

import * as Player from '../../store/modules/player/actions';

function Liked() {
    const [tracks, setTracks] = useState([]);

    const [next, setNext] = useState('');

    const [load, setLoad] = useState(true);

    const dispatch = useDispatch();

    const trackData = useSelector((state) => state.player.data);

    async function loadTracks() {
        const response = await api.get('/me/tracks?market=br&limit=50');

        setTracks(response.data.items);
        setNext(response.data.next);

        setLoad(false);
    }

    useEffect(() => {
        loadTracks();
    }, []);

    async function loadMore() {
        const removeEndpointURL = next.replace(
            'https://api.spotify.com/v1',
            ''
        );

        const response = await api.get(removeEndpointURL);

        setTracks([...tracks, ...response.data.items]);
    }

    return (
        <>
            {load ? (
                <h2 className="loading">Carregando...</h2>
            ) : (
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
                                {tracks.map((data) => (
                                    <tr
                                        className={`track-info ${
                                            trackData.length !== 0 &&
                                            trackData.name === data.track.name
                                                ? 'track-active'
                                                : ''
                                        }`}
                                        key={data.track.id}
                                    >
                                        <td
                                            onClick={() =>
                                                dispatch(
                                                    Player.playTrack(data.track)
                                                )
                                            }
                                        >
                                            <FaPlay />
                                        </td>
                                        <td
                                            onClick={() =>
                                                dispatch(
                                                    Player.playTrack(data.track)
                                                )
                                            }
                                        >
                                            <span>{data.track.name}</span>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/artist/id=${data.track.artists[0].id}`}
                                            >
                                                {data.track.artists[0].name}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/album/id=${data.track.album.id}`}
                                            >
                                                {data.track.album.name}
                                            </Link>
                                        </td>
                                        <td>
                                            {millisToMinutesAndSeconds(
                                                data.track.duration_ms
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {next != null && (
                        <div className="load-more">
                            <button type="button" onClick={loadMore}>
                                Carregar mais
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Liked;
