import userReducer from "./user.reducers/user.reducers";
import authReducer from "./auth/auth.reducer";
import {combineReducers} from 'redux';



const rootReducer = combineReducers({
    user:userReducer,
    auth:authReducer
});
export default rootReducer