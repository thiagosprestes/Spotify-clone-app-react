import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

import { FaPlay } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';

import api from '../../services/api';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

import * as Player from '../../store/modules/player/actions';

function UserRecentlyPlayed() {
    const dispatch = useDispatch();
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);

    const trackData = useSelector((state) => state.player.data);

    async function handleLoad() {
        const response = await api.get('/me/player/recently-played?limit=10');

        setRecentlyPlayed(response.data.items);
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <div id="recently-played">
            <h2>Tocadas recentemente</h2>
            <table>
                <tbody>
                    {recentlyPlayed.map((data) => (
                        <tr
                            key={data.played_at}
                            className={
                                trackData.length !== 0 &&
                                trackData.name === data.track.name
                                    ? 'track-active'
                                    : ''
                            }
                        >
                            <td>
                                <span
                                    onClick={() =>
                                        dispatch(Player.playTrack(data.track))
                                    }
                                >
                                    <FaPlay />
                                </span>
                            </td>
                            <td>
                                <span
                                    onClick={() =>
                                        dispatch(Player.playTrack(data.track))
                                    }
                                >
                                    {data.track.name}
                                </span>
                            </td>
                            <td>
                                {data.track.artists.map((artist) => (
                                    <Link
                                        to={`/artist/id=${artist.id}`}
                                        key={artist.id}
                                    >
                                        <span>{artist.name}</span>
                                    </Link>
                                ))}
                            </td>
                            <td>
                                <span>
                                    {millisToMinutesAndSeconds(
                                        data.track.duration_ms
                                    )}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserRecentlyPlayed;
