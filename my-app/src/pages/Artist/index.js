import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import './styles.css';

import { FaPlay } from 'react-icons/fa';

import { MdMusicNote } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';

import SpotifyButton from '../../components/SpotifyButton';

import api from '../../services/api';

import defaultImage from '../../assets/default-image.jpg';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

import * as Player from '../../store/modules/player/actions';

function Artist() {
    const [artist, setArtist] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);

    const [topTracks, setTopTracks] = useState([]);

    const [albums, setAlbums] = useState([]);

    const [following, setFollowing] = useState('');

    const [load, setLoad] = useState(true);

    const id = useParams().artistId;

    const album = albums.filter((data) => data.album_group === 'album');

    const single = albums.filter((data) => data.album_group === 'single');

    const appearsOn = albums.filter(
        (data) => data.album_group === 'appears_on'
    );

    const compilation = albums.filter(
        (data) => data.album_group === 'compilation'
    );

    const artistsFilter = relatedArtists.slice(0, 10);

    const dispatch = useDispatch();

    const trackData = useSelector((state) => state.player.data);

    useEffect(() => {
        async function loadArtist() {
            const response = await api.get(`/artists/${id}`);

            setArtist(response.data);

            setLoad(false);
        }

        async function loadTopTracks() {
            const response = await api.get(
                `/artists/${id}/top-tracks?country=br&limit=50`
            );

            setTopTracks(response.data.tracks);

            setLoad(false);
        }

        async function loadAlbums() {
            const response = await api.get(
                `/artists/${id}/albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation&market=br&limit=50`
            );

            setAlbums(response.data.items);

            setLoad(false);
        }

        async function loadRelatedArtists() {
            const response = await api.get(`/artists/${id}/related-artists`);

            setRelatedArtists(response.data.artists);

            setLoad(false);
        }

        async function verifyFollowing() {
            const response = await api.get(
                `/me/following/contains?type=artist&ids=${id}`
            );

            setFollowing(response.data[0]);

            setLoad(false);
        }

        loadArtist();
        loadTopTracks();
        loadAlbums();
        loadRelatedArtists();

        verifyFollowing();

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        setLoad(true);
    }, [id]);

    async function follow() {
        await api.put(`/me/following?type=artist&ids=${id}`);

        setFollowing(true);
    }

    async function unfollow() {
        await api.delete(`/me/following?type=artist&ids=${id}`);

        setFollowing(false);
    }

    return (
        <div id="artist">
            {load ? (
                <h1 className="loading">Carregando...</h1>
            ) : (
                <>
                    <header
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), #121212), url(${
                                artist.images.length > 0 &&
                                artist.images[0].url !== ''
                                    ? artist.images[0].url
                                    : defaultImage
                            })`,
                        }}
                    >
                        <div className="artist-info">
                            <div
                                className="artist-image cover"
                                style={{
                                    backgroundImage: `url(${
                                        artist.images.length > 0 &&
                                        artist.images[0].url !== ''
                                            ? artist.images[0].url
                                            : defaultImage
                                    })`,
                                }}
                            />
                            <div className="artist-bio">
                                <div className="type">{artist.type}</div>
                                <div className="artist-name">{artist.name}</div>
                                <div className="artist-followers">
                                    {artist.followers.total.toLocaleString(
                                        'pt-BR'
                                    )}{' '}
                                    seguidores
                                </div>
                            </div>
                        </div>
                        <div className="options">
                            <SpotifyButton id={artist.id} type="artist" />
                            {!following ? (
                                <button
                                    type="button"
                                    className="follow"
                                    onClick={follow}
                                >
                                    Seguir
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="unfollow"
                                    onClick={unfollow}
                                >
                                    Deixar de seguir
                                </button>
                            )}
                        </div>
                    </header>
                    <div className="container">
                        <div className="tracks-artists">
                            <div className="top-tracks tracks">
                                <h2>Populares</h2>
                                {topTracks.map((data) => (
                                    <div
                                        key={data.id}
                                        className={`track top-tracks-item ${
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
                                                dispatch(Player.playTrack(data))
                                            }
                                        >
                                            <FaPlay size="1em" />
                                        </div>
                                        <div
                                            className="track-image cover"
                                            style={{
                                                backgroundImage: `url(${data.album.images[0].url})`,
                                            }}
                                        />
                                        <div className="track-info">
                                            <span className="track-name">
                                                {data.name}
                                            </span>
                                        </div>
                                        <div className="track-duration">
                                            {millisToMinutesAndSeconds(
                                                data.duration_ms
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="related-artists">
                                <h2>Artistas relacionados</h2>
                                {artistsFilter.map((data) => (
                                    <div
                                        className="related-artist"
                                        key={data.id}
                                    >
                                        <Link to={`/artist/id=${data.id}`}>
                                            <div
                                                className="related-artist-cover"
                                                style={{
                                                    backgroundImage: `url(${
                                                        data.images.length === 0
                                                            ? defaultImage
                                                            : data.images[0].url
                                                    })`,
                                                }}
                                            />
                                            <span className="related-artist-name">
                                                {data.name}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {album.length > 0 && (
                            <div className="albums">
                                <h2>Álbuns</h2>
                                <div className="album-info">
                                    {album.map((data) => (
                                        <Link
                                            to={`/album/id=${data.id}`}
                                            key={data.id}
                                        >
                                            <div
                                                className="album-cover cover"
                                                style={{
                                                    backgroundImage: `url(${data.images[0].url})`,
                                                }}
                                            />
                                            <span>{data.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {single.length > 0 && (
                            <div className="singles albums">
                                <h2>Singles e EPs</h2>
                                <div className="album-info">
                                    {single.map((data) => (
                                        <Link
                                            to={`/album/id=${data.id}`}
                                            key={data.id}
                                        >
                                            <div
                                                className="album-cover cover"
                                                style={{
                                                    backgroundImage: `url(${data.images[0].url})`,
                                                }}
                                            />
                                            <span>{data.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {compilation.length > 0 && (
                            <div className="compilations albums">
                                <h2>Compilações</h2>
                                <div className="album-info">
                                    {compilation.map((data) => (
                                        <Link
                                            to={`/album/id=${data.id}`}
                                            key={data.id}
                                        >
                                            <div
                                                className="album-cover cover"
                                                style={{
                                                    backgroundImage: `url(${data.images[0].url})`,
                                                }}
                                            />
                                            <span>{data.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {appearsOn.length > 0 && (
                            <div className="appears_on albums">
                                <h2>Aparece em</h2>
                                <div className="album-info">
                                    {appearsOn.map((data) => (
                                        <Link
                                            to={`/album/id=${data.id}`}
                                            key={data.id}
                                        >
                                            <div
                                                className="album-cover cover"
                                                style={{
                                                    backgroundImage: `url(${data.images[0].url})`,
                                                }}
                                            />
                                            <span>{data.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Artist;
