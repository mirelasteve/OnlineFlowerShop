import productsData from '../../data/products';

const INITIAL_PRODUCTS_STATE = productsData;

const productReducer = (state=INITIAL_PRODUCTS_STATE,action) => {
    switch(action.type){
        case 'LOAD_STATE': return state
        default: return state
    }
}

export default productReducer;