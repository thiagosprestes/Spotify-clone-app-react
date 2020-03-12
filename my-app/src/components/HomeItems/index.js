import React from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

function homeItems({ itemTitle, itemData, itemDataCategories}) {
    return(
        <>
            <h2>{itemTitle}</h2>
            <div className="items">
                {itemDataCategories !== undefined && itemDataCategories.map(data => (                    
                    <div key={data.name} className="item-info">
                        <div className="item-cover" style={{backgroundImage: `url(${data.icons[0].url})`}}></div>
                        <span className="item-name">{data.name}</span>
                    </div> 
                ))}
                {itemData !== undefined && itemData.map(data => (                    
                    <div key={data.name} className="item-info">
                        <Link to={`/album/id=${data.id}`}>   
                            <div className="item-cover" style={{backgroundImage: `url(${data.images[0].url})`}}></div>
                            <span className="item-name">{data.name}</span>
                        </Link>
                        {data.artists !== undefined && 
                            <div className="artists-name">
                                {data.artists.map(artist => (
                                    <span key={artist.id}>{artist.name}</span>
                                ))}
                            </div>
                        }
                    </div> 
                ))}
            </div>
        </>
    )
}

export default homeItems;