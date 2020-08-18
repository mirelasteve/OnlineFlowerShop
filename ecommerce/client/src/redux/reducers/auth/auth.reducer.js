import { SIGN_UP, SIGN_OUT, START_LOAD_USER, GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_FAILURE, SIGN_IN, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE, START_SIGN_OUT } from "../../actions/actions.types";

const INITIAL_STATE_AUTH  = {
    user : null,
    loadingUser:false,
    errorMessage:''
};

const authReducer = (state = INITIAL_STATE_AUTH,action) => {
    // console.log(action)
    switch(action.type){
        case START_LOAD_USER : return {...state,loadingUser:true,user:''}
        case GOOGLE_SIGN_IN_SUCCESS : return {...state,loadingUser:false,user:action.user}
        case GOOGLE_SIGN_IN_FAILURE : return {...state,loadingUser:false,user:null,errorMessage:action.error}
        case SIGN_IN : return {...state,loadingUser:false,user:action.user}
        case SIGN_UP : return action.user ?  {...state,user:action.user,loadingUser:false} : { user : '',loadingUser:false}
        case START_SIGN_OUT: return  {...state,loadingUser:true,user:''}
        case SIGN_OUT: return INITIAL_STATE_AUTH 
        case SIGN_OUT_SUCCESS : return {...state,user:null}
        case SIGN_OUT_FAILURE : return {...state, user:null, errorMessage:action.error}
        default: return state
    }


}
export default authReducer