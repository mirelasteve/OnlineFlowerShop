import React from 'react';

const HeroBanner = () => {
    
    return ( 
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                
                <div className='field'>
                    <label>Search for a product</label>
                    <input className='input is-primary' type='search' placeholder='roses'/>
                </div>
                
                </div>
            </div>
        </section>
    )
}

export default HeroBanner