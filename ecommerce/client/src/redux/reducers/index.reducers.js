import userReducer from "./user.reducers/user.reducers";
import authReducer from "./auth/auth.reducer";
import productReducer from "./products/products.reducer";

import {combineReducers} from 'redux';




const rootReducer = combineReducers({
    user:userReducer,
    auth:authReducer,
    products:productReducer
});
export default rootReducer