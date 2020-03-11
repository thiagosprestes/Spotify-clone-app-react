import React from 'react';

function homeItems({ itemTitle, itemData, itemDataCategories}) {
    return(
        <>
            <h1>{itemTitle}</h1>
            <div className="categories items">
                {itemDataCategories !== undefined && itemDataCategories.map(data => (                    
                    <div key={data.name} className="category item-info">
                        <div className="category-cover item-cover" style={{backgroundImage: `url(${data.icons[0].url})`}}></div>
                        <span className="category-name item-name">{data.name}</span>
                    </div> 
                ))}
                {itemData !== undefined && itemData.map(data => (                    
                    <div key={data.name} className="category item-info">
                        <div className="category-cover item-cover" style={{backgroundImage: `url(${data.images[0].url})`}}></div>
                        <span className="category-name item-name">{data.name}</span>
                    </div> 
                ))}
            </div>
        </>
    )
}

export default homeItems;