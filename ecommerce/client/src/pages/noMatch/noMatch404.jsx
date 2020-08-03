import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from './notFoundLogo.png';

const NoMatch = () => {
    let location = useLocation();
    console.log(location);
    return(
             <div className="has-text-centered">
                
                <h6 className="title">We are sorry. we can't find <code>{location.pathname}</code></h6>
                
                <div className='ml-4'>
                    
                            <img src={logo} />
                       
                </div>
            </div>
        
   
    )
}

export default NoMatch