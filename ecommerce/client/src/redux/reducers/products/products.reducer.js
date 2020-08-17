// import productsData from '../../data/products';
import {  LOAD_STATE_PRODUCT, LOAD_STATE_PRODUCT_COLLECTION } from '../../actions/actions.types';

const INITIAL_PRODUCTS_STATE = {
    loading:false,
    products: []
};

const productReducer = (state=INITIAL_PRODUCTS_STATE,action) => {
    
    switch(action.type){
        case LOAD_STATE_PRODUCT: return {...state,loading:true}
        case LOAD_STATE_PRODUCT_COLLECTION: return {...state,products:action.payload}
        default: return state
    }
}

export default productReducer;