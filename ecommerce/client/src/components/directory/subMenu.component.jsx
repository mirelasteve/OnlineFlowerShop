import React from 'react'
import {withRouter} from 'react-router-dom';

const SubMenu = ({link,id,name,img,history,match}) => {
    
    return (
        <div className='card' onClick={()=>history.push(`${match.url}products${link}`)}>
            <div className='card-container'>
            <div className="card-image">
                <figure className="image is-4by3">
                <img src={img} alt={name}/>
                </figure>
            </div>
                <h3 className='title has-text-centered'>{name}</h3>
            </div>
            
        </div>
    )
}

export default withRouter(SubMenu)
