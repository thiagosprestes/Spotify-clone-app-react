import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import './styles.css';

import SpotifyButton from '../../components/SpotifyButton';

import api from '../../services/api';

import { FaPlay } from 'react-icons/fa';

import { MdMusicNote } from 'react-icons/md';

import defaultImage from '../../assets/default-image.jpg';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

function Artist() {
    const [ artist, setArtist ] = useState([]);
    const [ artistImage, setArtistImage ] = useState([]);
    const [ artistFollowers, setArtistFollowers ] = useState('');
    const [ relatedArtists, setRelatedArtists ] = useState([]);

    const [ topTracks, setTopTracks ] = useState([]);

    const [ albums, setAlbums ] = useState([]);

    const [ following, setFollowing ] = useState('');

    const [ load, setLoad ] = useState(true);

    const id = useParams().artistId;

    const album = albums.filter(data => data.album_group == 'album');

    const single = albums.filter(data => data.album_group == 'single');

    const appears_on = albums.filter(data => data.album_group == 'appears_on');

    const compilation = albums.filter(data => data.album_group == 'compilation');
    
    const artistsFilter = relatedArtists.slice(0, 10);

    function endpoint(url, data) {
        api.get(url).then(data).finally(() => {
            setLoad(false);
        }) 
    }

    useEffect(() => {
        async function loadArtist() {
            await endpoint(`/artists/${id}`, (response) => {
                setArtist(response.data);                
                setArtistFollowers(response.data.followers.total);

                if (response.data.images != 0) {
                    setArtistImage(response.data.images[0].url);   
                } else {
                    setArtistImage(defaultImage);
                }
            })
        }

        async function loadTopTracks() {
            await endpoint(`/artists/${id}/top-tracks?country=br&limit=50`, (response) => {
                setTopTracks(response.data.tracks);
            })
        }

        async function loadAlbums() {
            await endpoint(`/artists/${id}/albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation&market=br&limit=50`, (response) => {
                setAlbums(response.data.items);
            })
        }

        async function loadRelatedArtists() {
            await endpoint(`/artists/${id}/related-artists`, (response) => {
                setRelatedArtists(response.data.artists);
            })
        }

        async function verifyFollowing() {
            await endpoint(`/me/following/contains?type=artist&ids=${id}`, (response) => {
                setFollowing(response.data[0]);
            })
        }

        loadArtist();
        loadTopTracks();
        loadAlbums();
        loadRelatedArtists();

        verifyFollowing()

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        setLoad(true);
    }, [id])

    async function follow() {
        await api.put(`/me/following?type=artist&ids=${id}`)
        .then(() => {
            setFollowing(true);
        })
    }

    async function unfollow() {
        await api.delete(`/me/following?type=artist&ids=${id}`)
        .then(() => {
            setFollowing(false);
        })
    }

    return(
        <div id="artist">
            {load && <h1 className="loading">Carregando...</h1>}
            {!load && 
                <>
                    <header style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), #121212), url(${artistImage == null ? defaultImage : artistImage})`}}>
                        <div className="artist-info">
                            <div className="artist-image cover" style={{backgroundImage: `url(${artistImage})`}}></div>
                            <div className="artist-bio">
                                <div className="type">{artist.type}</div>
                                <div className="artist-name">
                                    {artist.name}
                                </div>           
                                <div className="artist-followers">
                                    {artistFollowers.toLocaleString('pt-BR')} seguidores
                                </div>    
                            </div>             
                        </div>
                        <div className="options">
                            <SpotifyButton id={artist.id} type="artist" />  
                            {!following && 
                                <button className="follow" onClick={follow}>
                                    Seguir
                                </button>
                            }
                            {following && 
                                <button className="unfollow" onClick={unfollow}>
                                    Deixar de seguir
                                </button>
                            }
                        </div>
                    </header>
                    <div className="container">
                        <div className="tracks-artists">
                            <div className="top-tracks tracks">
                            <h2>Populares</h2>
                            {topTracks.map(data => (
                                <div key={data.id} className="track top-tracks-item">
                                    <div className="note-icon">
                                        <MdMusicNote size="1em" />
                                    </div>
                                    <div className="play-icon">
                                        <FaPlay size="1em" />
                                    </div>
                                    <div className="track-image cover" style={{backgroundImage: `url(${data.album.images[0].url})`}}></div>
                                    <div className="track-info">                                    
                                        <span className="track-name">{data.name}</span>
                                    </div>
                                    <div className="track-duration">
                                        {millisToMinutesAndSeconds(data.duration_ms)}
                                    </div>                       
                                </div>
                            ))}
                        </div>
                            <div className="related-artists">
                                <h2>Artistas relacionados</h2>
                                {artistsFilter.map(data => (
                                    <div className="related-artist" key={data.id}>
                                        <Link to={`/artist/id=${data.id}`}>
                                            <div className="related-artist-cover" style={{backgroundImage: `url(${data.images[0].url})`}}></div>
                                            <span className="related-artist-name">{data.name}</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {album != 0 &&
                            <div className="albums">
                            <h2>Álbuns</h2>
                            <div className="album-info">
                                {album.map(data => (
                                    <Link to={`/album/id=${data.id}`} key={data.id}>
                                        <div className="album-cover cover" style={{backgroundImage: `url(${data.images[0].url})`}}></div>                                
                                        <span>{data.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        }
                        {single != 0 &&
                            <div className="singles albums">
                                <h2>Singles e EPs</h2>
                                <div className="album-info">
                                    {single.map(data => (
                                        <Link to={`/album/id=${data.id}`} key={data.id}>
                                            <div className="album-cover cover" style={{backgroundImage: `url(${data.images[0].url})`}}></div>                                
                                            <span>{data.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        }
                        {compilation != 0 &&
                            <div className="compilations albums">
                                <h2>Compilações</h2>
                                <div className="album-info">
                                    {compilation.map(data => (
                                        <Link to={`/album/id=${data.id}`} key={data.id}>
                                            <div className="album-cover cover" style={{backgroundImage: `url(${data.images[0].url})`}}></div>                                
                                            <span>{data.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        }
                        {appears_on != 0 &&
                            <div className="appears_on albums">
                                <h2>Aparece em</h2>
                                <div className="album-info">
                                    {appears_on.map(data => (
                                        <Link to={`/album/id=${data.id}`} key={data.id}>
                                            <div className="album-cover cover" style={{backgroundImage: `url(${data.images[0].url})`}}></div>                                
                                            <span>{data.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>  
                        }                      
                    </div>  
                </>
            }
        </div>
    )
}

export default Artist;