import productsData from '../../data/products';
import {  LOAD_STATE_PRODUCT } from '../../actions/actions.types';

const INITIAL_PRODUCTS_STATE = productsData;

const productReducer = (state=INITIAL_PRODUCTS_STATE,action) => {
    
    switch(action.type){
        case LOAD_STATE_PRODUCT: return state
        default: return state
    }
}

export default productReducer;