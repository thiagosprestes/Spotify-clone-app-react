import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import { FaSpotify, FaPlay, FaRegHeart, FaShareAlt } from 'react-icons/fa';

import { MdMusicNote } from 'react-icons/md';

function Playlist() {
    const [ playlist, setPlaylist ] = useState([]);
    const [ playlistImage, setPlaylistImage ] = useState([]);
    const [ artists, setArtists ] = useState({});
    const [ owner, setOwner ] = useState({});
    const [ tracks, setTracks ] = useState([]);
    const [ copyrights, setCopyrights ] = useState([]);

    const [ load, setLoad ] = useState(true)

    const id = useParams().playlistId;    

    useEffect(() => {
        async function load() {
            await api.get(`/playlists/${id}?market=br&fields=images%2Chref%2Cname%2Cowner(!href%2Cexternal_urls)%2Ctracks.items(added_by.id%2Ctrack(artists%2Cduration_ms%2Cname%2Chref%2Calbum(name%2Chref)))`)
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
        
        load()
    }, [])

    const date = new Date(playlist.release_date)

    return(
        <>
        {load && <h2 className="loading">Carregando...</h2>} 
        {!load && 
            <div id="album">            
                <div className="album-info">
                    <div className="album-image" style={{backgroundImage: `url(${playlistImage})`}}></div>
                    <h2 className="album-title">{playlist.name}</h2>
                    <div className="album-artists">
                        <span>{artists.display_name}</span>
                    </div>
                    <div className="spotify-link">
                        <a href={`https://open.spotify.com/playlist/${id}`} target="_blank">
                            <FaSpotify size="1.5em" />
                            Spotify
                        </a>
                    </div>
                    <div className="album-options">
                        <FaRegHeart size="1.8em" />
                        <FaShareAlt size="1.8em" />
                    </div>
                    <div className="album-year">
                        <span>{tracks.length} músicas</span>
                    </div>
                </div>
                <div className="album-tracks">
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
                                    <span>{artist.name}</span>
                                ))} - <span className="track-album">{data.track.album.name}</span>
                            </div> 
                        </div>
                        <div className="track-duration">
                            <span>
                                {`
                                    ${Math.floor(data.track.duration_ms / 60000)}:${((data.track.duration_ms % 60000) / 1000).toFixed(0) == 60 ? (((data.track.duration_ms % 60000) / 1000).toFixed(0) + 1) + ':00' : (((data.track.duration_ms % 60000) / 1000).toFixed(0) < 10 ? "0" : "") + ((data.track.duration_ms % 60000) / 1000).toFixed(0)} 
                                `}
                            </span>
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