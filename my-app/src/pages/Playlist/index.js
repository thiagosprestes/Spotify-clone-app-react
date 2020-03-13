import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import { FaSpotify, FaPlay, FaRegHeart, FaShareAlt } from 'react-icons/fa';

import { MdMusicNote } from 'react-icons/md';

function Playlist() {
    const [ album, setAlbum ] = useState([]);
    const [ albumImage, setAlbumImage ] = useState([]);
    const [ artists, setArtists ] = useState([]);
    const [ tracks, setTracks ] = useState([]);
    const [ copyrights, setCopyrights ] = useState([]);

    const [ load, setLoad ] = useState(true)

    const id = useParams().playlistId;    

    useEffect(() => {
        async function load() {
            await api.get(`/playlists/${id}?market=br&fields=images%2Chref%2Cname%2Cowner(!href%2Cexternal_urls)%2Ctracks.items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))`)
            .then(response => {
                setAlbum(response.data)
                setAlbumImage(response.data.images[0].url);
                setArtists(response.data.artists)
                setTracks(response.data.tracks.items)
                setCopyrights(response.data.copyrights)
            })
            .finally(() => {
                setLoad(false);
            })
        }
        
        load()
    }, [])

    const date = new Date(album.release_date)

    return(
        <>
        {load && <h2 className="loading">Carregando...</h2>} 
        {!load && 
            <div id="album">            
                <div className="album-info">
                    <div className="album-image" style={{backgroundImage: `url(${albumImage})`}}></div>
                    <h2 className="album-title">{album.name}</h2>
                    <div className="album-artists">
                        {artists.map(a => (
                            <span key={a.name}>{a.name}</span>
                        ))}
                    </div>
                    <div className="spotify-link">
                        <a href={`https://open.spotify.com/album/${album.id}`} target="_blank">
                            <FaSpotify size="1.5em" />
                            Spotify
                        </a>
                    </div>
                    <div className="album-options">
                        <FaRegHeart size="1.8em" />
                        <FaShareAlt size="1.8em" />
                    </div>
                    <div className="album-year">
                        <span>{String(date.getFullYear())}</span>
                        {album.total_tracks == 1 && 
                            <span>{album.total_tracks} música</span>
                        }
                        {album.total_tracks > 1 && 
                            <span>{album.total_tracks} músicas</span>
                        }
                    </div>
                </div>
                <div className="album-tracks">
                    {tracks.map(data => (
                        <div key={data.id} className="track">
                            <div className="note-icon">
                                <MdMusicNote size="1em" />
                            </div>

                            <div className="play-icon">
                                <FaPlay size="1em" />
                            </div>
                            <div className="track-info">                                    
                                <span className="track-name">{data.name}</span>
                                <div className="track-artists">                                    
                                    {data.artists.map(artist => (
                                        <span key={artist.id}>{artist.name}</span>
                                    ))}
                                </div> 
                            </div>
                            <div className="track-duration">
                                {`
                                    ${Math.floor(data.duration_ms / 60000)}:${((data.duration_ms % 60000) / 1000).toFixed(0) == 60 ? (((data.duration_ms % 60000) / 1000).toFixed(0) + 1) + ':00' : (((data.duration_ms % 60000) / 1000).toFixed(0) < 10 ? "0" : "") + ((data.duration_ms % 60000) / 1000).toFixed(0)} 
                                `}
                            </div>                           
                        </div>
                    ))}
                    <div className="copyright">
                        {copyrights.map(copyright => (
                            <span key={copyright.text}>{copyright.text}</span>
                        ))}
                    </div>
                </div>                        
            </div>
        }
        </>
    )
}

export default Playlist;