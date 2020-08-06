// import productsData from '../../data/products';
import {  LOAD_STATE_PRODUCT, LOAD_STATE_PRODUCT_COLLECTION } from '../../actions/actions.types';

const INITIAL_PRODUCTS_STATE = [];

const productReducer = (state=INITIAL_PRODUCTS_STATE,action) => {
    
    switch(action.type){
        case LOAD_STATE_PRODUCT: return [...state,...action.payload]
        case LOAD_STATE_PRODUCT_COLLECTION: return state
        default: return state
    }
}

export default productReducer;