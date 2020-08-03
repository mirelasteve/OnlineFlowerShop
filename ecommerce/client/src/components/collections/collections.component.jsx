import products from '../../redux/data/products';

import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Collections extends Component { 
    constructor(props){
        super(props);
        this.state={
            products:products,
            collections:Object.keys(products),
            
            // paramName:this.props.match.params.collectionName
        }
    }
    render(){
        
        return(
            <React.Fragment>
               
                {
                    this.state.collections.map(productKey =>
                    <div className="columns is-multiline is-mobile">
                    <div className="column is-12 has-text-success-dark" >
                        <Link to={this.props.match.url+''+productKey} >{productKey}</Link>
                    </div>
                    {this.state.products[productKey].
                            filter( (pi,productIndex) => productIndex < 4)
                            .map( ({_id,name,price,img}) =>
                            <div className="column is-3 hover-hand" onClick={()=>this.props.history.push(`${this.props.match.url}${productKey}${_id}`)}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image is-1by1">
                                            <img src={img}/>
                                        </figure>
                                    </div>
                                    <div className='content'>
                                        {name}
                                    </div>
                            </div> 
                           </div>    
                            )
                        }
                    </div> )
                   
                }
            </React.Fragment>
        )	} 
 } 
 export default Collections;