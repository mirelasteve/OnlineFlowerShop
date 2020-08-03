import React, {Component} from 'react';
import {withRouter, useParams} from 'react-router-dom';

const CollectionsPreview = ({id,img,match,history,name}) => { 
    
    let nameP= useParams();
    console.log(nameP);
    
        
        return(
            
            <div className='columns is-multiline'>
            <div className='column  is-size-1 is-4 has-background-warning-light'>{name.toUpperCase()}</div>
                <div key={id} className='column is-3' onClick={()=>history.push(`${match.url}/${id}`)}>
                    <div  className='card'>
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={img} alt={name}/>
                            </figure>
                        </div>
                        <div className='card-footer'>
                            <div className='card-footer-item'>{name}</div>
                        </div>
                    </div>
                </div>
            
            </div>
        
        )
 } 
 export default withRouter(CollectionsPreview);