import React, {Component} from 'react';


class CollectionsPreview extends Component { 
    constructor(props){
        super(props);
        this.state={
         
        }
    }
    render(){
        
        
        return(
            
            <div className='columns is-multiline'>
            <div className='column ml-5 is-size-1 is-12 has-background-warning-light'>{this.props.title.toUpperCase()}</div>
                {this.props.items.filter( (x,index)=> index<4).map(({id,name,price,imageUrl})=>
                
            
                <div key={id} className='column is-3'>
                    <div  className='card'>
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={imageUrl} alt={name}/>
                            </figure>
                        </div>
                        <div className='card-footer'>
                            <div className='card-footer-item'>{name}</div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        
        )	} 
 } 
 export default CollectionsPreview;