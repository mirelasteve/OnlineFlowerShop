import { SIGN_UP, SIGN_OUT, START_LOAD_USER, GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_FAILURE } from "../../actions/actions.types";

const INITIAL_STATE_AUTH  = {
    user : null,
    loadingUser:false,
    errorMessage:''
};

const authReducer = (state = INITIAL_STATE_AUTH,action) => {
    console.log(action)
    switch(action.type){
        case START_LOAD_USER : return {...state,loadingUser:true}
        case GOOGLE_SIGN_IN_SUCCESS : return {...state,loadingUser:false,user:action.user}
        case GOOGLE_SIGN_IN_FAILURE : return {...state,loadingUser:false,user:'',errorMessage:action.error}
        case SIGN_UP : return action.user ?  {...state,user:action.user,loadingUser:false} : { user : '',loadingUser:false}
        case SIGN_OUT: return INITIAL_STATE_AUTH 
        default: return state
    }


}
export default authReducer