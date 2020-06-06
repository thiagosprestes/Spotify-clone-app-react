import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import './styles.css';

import { FaPlay, FaRegHeart, FaShareAlt, FaHeart } from 'react-icons/fa';

import { MdMusicNote } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';

import api from '../../services/api';

import SpotifyButton from '../../components/SpotifyButton';

import defaultImage from '../../assets/default-image.jpg';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

import * as Player from '../../store/modules/player/actions';

function Album() {
    const [album, setAlbum] = useState([]);

    const [save, setSave] = useState('');

    const [load, setLoad] = useState(true);

    const id = useParams().albumId;

    const dispatch = useDispatch();

    const trackData = useSelector((state) => state.player.data);

    useEffect(() => {
        async function loadAlbum() {
            const response = await api.get(`albums/${id}`);

            setAlbum(response.data);

            console.log(response.data);

            setLoad(false);
        }

        async function verifySaved() {
            const response = await api.get(`/me/albums/contains?ids=${id}`);

            setSave(response.data[0]);
        }

        loadAlbum();
        verifySaved();
    }, [id]);

    const date = new Date(album.release_date);

    async function saveAlbum() {
        try {
            await api.put(`/me/albums?ids=${id}`);

            setSave(true);
        } catch (error) {
            alert('Ocorreu um erro ao salvar o àlbum.');
        }
    }

    async function removeAlbum() {
        try {
            await api.delete(`/me/albums?ids=${id}`);

            setSave(false);
        } catch (error) {
            alert('Ocorreu um erro ao remover o àlbum da sua biblioteca');
        }
    }

    return (
        <>
            {load ? (
                <h2 className="loading">Carregando...</h2>
            ) : (
                <>
                    <div id="album" className="container">
                        <div className="album-info">
                            <div
                                className="album-image cover"
                                style={{
                                    backgroundImage: `url(${
                                        album.images.length > 0 &&
                                        album.images[0].url !== ''
                                            ? album.images[0].url
                                            : defaultImage
                                    })`,
                                }}
                            />
                            <h2 className="album-title">{album.name}</h2>
                            <div className="album-artists">
                                {album.artists.map((artist) => (
                                    <Link
                                        to={`/artist/id=${artist.id}`}
                                        key={artist.id}
                                    >
                                        <span>{artist.name}</span>
                                    </Link>
                                ))}
                            </div>
                            <SpotifyButton id={album.id} type="album" />
                            <div className="album-options">
                                {!save && (
                                    <FaRegHeart
                                        onClick={saveAlbum}
                                        size="1.8em"
                                    />
                                )}
                                {save && (
                                    <FaHeart
                                        onClick={removeAlbum}
                                        size="1.8em"
                                        color="#1DB954"
                                    />
                                )}
                                <FaShareAlt size="1.8em" />
                            </div>
                            <div className="album-year">
                                <span>{String(date.getFullYear())}</span>
                                {album.total_tracks === 1 && (
                                    <span>{album.total_tracks} música</span>
                                )}
                                {album.total_tracks > 1 && (
                                    <span>{album.total_tracks} músicas</span>
                                )}
                            </div>
                        </div>
                        <div className="album-tracks tracks">
                            {album.tracks.items.map((data) => (
                                <div
                                    key={data.id}
                                    className={`track ${
                                        trackData.length !== 0 &&
                                        trackData.name === data.name
                                            ? 'track-active'
                                            : ''
                                    }`}
                                >
                                    <div className="note-icon">
                                        <MdMusicNote size="1em" />
                                    </div>

                                    <div
                                        className="play-icon"
                                        onClick={() =>
                                            dispatch(
                                                Player.playTrack({
                                                    id: data.id,
                                                    name: data.name,
                                                    preview_url:
                                                        data.preview_url,
                                                    album: {
                                                        id: album.id,
                                                        images: album.images,
                                                    },
                                                    artists: album.artists,
                                                })
                                            )
                                        }
                                    >
                                        <FaPlay size="1em" />
                                    </div>
                                    <div className="track-info">
                                        <span className="track-name">
                                            {data.name}
                                        </span>
                                        <div className="track-artists">
                                            {data.artists.map((artist) => (
                                                <Link
                                                    to={`/artist/id=${artist.id}`}
                                                    key={artist.id}
                                                >
                                                    <span>{artist.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="track-duration">
                                        {millisToMinutesAndSeconds(
                                            data.duration_ms
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="copyright">
                                {album.copyrights.map((copyright) => (
                                    <span key={copyright.text}>
                                        {copyright.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Album;
