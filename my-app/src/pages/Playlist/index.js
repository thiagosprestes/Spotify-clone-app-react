import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import { FaPlay, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';

import { MdMusicNote } from 'react-icons/md';

import SpotifyButton from '../../components/SpotifyButton';

import millisToMinutesAndSeconds from '../../utils/millisToMinutesAndSeconds';

function Playlist() {
    const [ playlist, setPlaylist ] = useState([]);
    const [ playlistImage, setPlaylistImage ] = useState([]);
    const [ owner, setOwner ] = useState({});
    const [ tracks, setTracks ] = useState([]);
    const [ save, setSave ] = useState('');

    const [ load, setLoad ] = useState(true)

    const id = useParams().playlistId;

    useEffect(() => {
        async function load() {
            await api.get(`/playlists/${id}?market=br&fields=images%2Chref%2Cname%2Cowner(!href%2Cexternal_urls)%2Ctracks.items(added_by.id%2Ctrack(artists%2Cduration_ms%2Cname%2Chref%2Calbum(name%2Chref%2Cid)))`)
            .then(response => {
                setPlaylist(response.data)
                setPlaylistImage(response.data.images[0].url);
                setOwner(response.data.owner)                
                setTracks(response.data.tracks.items)
            })
            .finally(() => {
                setLoad(false);
            })
        }

        async function verifySaved() {
            await api.get(`/playlists/${id}/followers/contains?ids=${localStorage.getItem('user')}`)
            .then((response) => {
                setSave(response.data[0])
            })
        }
        
        verifySaved();
        load()
    }, [])

    async function savePlaylist() {
        await api.put(`/playlists/${id}/followers`)
        .then(() => {
            setSave(true)
        })
    }

    async function removePlaylist() {
        await api.delete(`/playlists/${id}/followers`)
        .then(() => {
            setSave(false)
        })
    }

    return(
        <>
        {load && <h2 className="loading">Carregando...</h2>} 
        {!load && 
            <div id="album" className="container">            
                <div className="album-info">
                    <div className="album-image cover" style={{backgroundImage: `url(${playlistImage})`}}></div>
                    <h2 className="album-title">{playlist.name}</h2>
                    <div className="album-artists">
                        <Link to={`/user/${owner.id}`}>
                            <span>{owner.display_name}</span>
                        </Link>
                    </div>
                    <SpotifyButton id={id} type="playlist" />
                    <div className="album-options">
                        {!save && <FaRegHeart onClick={savePlaylist} size="1.8em" />}
                        {save && <FaHeart onClick={removePlaylist} size="1.8em" color="#1DB954" />}
                        <FaShareAlt size="1.8em" />
                    </div>
                    <div className="album-year">
                        <span>{tracks.length} músicas</span>
                    </div>
                </div>
                <div className="album-tracks tracks">
                    {tracks.map(data => (
                        <div key={data.track.name} className="track">
                        <div className="note-icon">
                            <MdMusicNote size="1em" />
                        </div>

                        <div className="play-icon">
                            <FaPlay size="1em" />
                        </div>
                        <div className="track-info">                                    
                            <span className="track-name">{data.track.name}</span>
                            <div className="track-artists">                                    
                                {data.track.artists.map(artist => (
                                    <Link to={`/artist/id=${artist.id}`} key={artist.id}>
                                        <span>{artist.name}</span>
                                    </Link>
                                ))}<Link to={`/album/id=${data.track.album.id}`}>
                                        <span className="track-album">{data.track.album.name}</span>
                                    </Link>
                            </div> 
                        </div>
                        <div className="track-duration">
                            <span>{millisToMinutesAndSeconds(data.track.duration_ms)}</span>
                        </div>                           
                    </div>
                    ))}
                </div>                        
            </div>
        }
        </>
    )
}

export default Playlist;