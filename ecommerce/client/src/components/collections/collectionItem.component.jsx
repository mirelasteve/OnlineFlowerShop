import React, { useReducer, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import productReducer from '../../redux/reducers/products/products.reducer';
import {connect} from 'react-redux';
import { LOAD_STATE_PRODUCT, ADD_PRODUCT_TO_CART } from '../../redux/actions/actions.types';

const CollectionItem= ({productItem, addProductToTheCart}) => {
    
    const [state,setState] = useState(productItem);
   
    useEffect(()=>{
        if(productItem){
            setState(productItem)
        }
    },productItem._id)
    const {name,description,price,img,_id} = state;
    
    return (
        <div className='columns'>
            <div className='column is-4 ml-4'>
                <figure className=''>
                    <img className='image is-5by3 pt-1' src={img}/>
                </figure>
                
            </div>

            <div className='column is-6'>
                <div className='card'>
                    <div className='content'>
                        Name: {name}
                    </div>

                    <div className='content'>
                        Description: {description}
                    </div>

                    <div className='content'>
                        ${price}
                    </div>

                    <div className='footer'>
                        <button className='button is-danger is-light' onClick={()=>addProductToTheCart({id:_id,count:1,name:name,price:price})}>Add to cart</button>
                        <button className='button is-info is-light is-right '>Check</button>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

const mapStateToProps = (state,ownProps) => {
    const {collectionName,id} = ownProps.match.params;

    let setCurrentItem = {}
    state.products.products.map(x=>{
        const {[collectionName] :value} = x;
        if(typeof value === 'object' && Array.isArray(value)){
           let currentItem = value.filter(item=> item._id === id)
            setCurrentItem = currentItem[0]
        }
    })
    if(typeof setCurrentItem === 'object'){
        return ({
            productItem:setCurrentItem
        })
    }
    
}
const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      
      addProductToTheCart: (product) => dispatch({type: ADD_PRODUCT_TO_CART,product})
      
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(CollectionItem)