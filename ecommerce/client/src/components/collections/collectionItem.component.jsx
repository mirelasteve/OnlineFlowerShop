import React from 'react';


const CollectionItem= ({id,name,price,imageUrl}) => {
    return (
        <div className='card'>
        <div className='card-header'>
            <div className='card-header-title'>{name}</div>
        </div>
            <div className='card-content'>

            </div>
            <div className='card-footer'>
                <span className='çard-footer-item'>${price}</span>
            </div>
            
        </div>
    )
}
export default CollectionItem