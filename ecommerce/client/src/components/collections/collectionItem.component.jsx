import React from 'react';
import { useRouteMatch } from 'react-router-dom';


const CollectionItem= ({_id,name,price,img,match}) => {
     let {path,url} = useRouteMatch();
     
     console.log(path,url);
   
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