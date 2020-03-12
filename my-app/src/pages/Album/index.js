import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

function Album() {
    const [ album, setAlbum ] = useState([]);
    const [ albumImage, setAlbumImage ] = useState([]);
    const [ artists, setArtists ] = useState([]);

    const [ load, setLoad ] = useState(true)

    const id = useParams().albumId;    

    useEffect(() => {
        async function load() {
            await api.get(`albums/${id}`)
            .then(response => {
                setAlbum(response.data)
                setAlbumImage(response.data.images[0].url);
                setArtists(response.data.artists)
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
                <>
                    <div className="album-info">
                        <div className="album-image" style={{backgroundImage: `url(${albumImage})`}}></div>
                        <h2 className="album-title">{album.name}</h2>
                        <div className="album-artists">
                            {artists.map(a => (
                                <span key={a.name}>{a.name}</span>
                            ))}
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
                    </div>
                </>
            </div>
        }
        </>
    )
}

export default Album;