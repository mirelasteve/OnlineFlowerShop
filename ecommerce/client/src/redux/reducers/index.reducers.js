import userReducer from "./user.reducers/user.reducers";
import authReducer from "./auth/auth.reducer";
import productReducer from "./products/products.reducer";

import {combineReducers} from 'redux';
import cartReducer from "./cart/cart.reducers";




const rootReducer = combineReducers({
    user:userReducer,
    auth:authReducer,
    products:productReducer,
    cart:cartReducer
});
export default rootReducer