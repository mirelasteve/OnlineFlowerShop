import React from 'react'
import {withRouter} from 'react-router-dom';

const SubMenu = ({link='/shop',id,name,img,history,match}) => {

    
    return (
        <div className='card' onClick={()=>history.push(`${match.url}${link}`)}>
            <div className='card-container'>
            <div className="card-image">
                <figure className="image is-128x128">
                <img src={img} alt={name}/>
                </figure>
            </div>
                <h3 className='title'>{name}</h3>
            </div>
            
        </div>
    )
}

export default withRouter(SubMenu)
