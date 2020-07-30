import { SIGN_UP, SIGN_OUT } from "../../actions/actions.types";

const INITIAL_STATE_AUTH  = {
    user : null
};

const authReducer = (state = INITIAL_STATE_AUTH,action) => {
    switch(action.type){
        case SIGN_UP : return action.user ?  {...state,user:action.user} : ''
        case SIGN_OUT: return { user : null }
        default: return state
    }


}
export default authReducer