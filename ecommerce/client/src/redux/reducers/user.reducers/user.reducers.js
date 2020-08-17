
import {SET_USER, START_LOAD_USER} from '../../actions/actions.types';

const INITIAL_STATE = {
    user:null,
    loadingUser:false
}
const userReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case START_LOAD_USER : return {...state,loading:true}
        case SET_USER: return {...state,loading:false,user:action.user}
        default: return state
    }
}
export default userReducer