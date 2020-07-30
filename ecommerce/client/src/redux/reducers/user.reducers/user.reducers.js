
import {SET_USER} from '../../actions/actions.types';

const userReducer = (state={user:null},action)=>{
    switch(action.type){
        case SET_USER: return state.user
        default: return state
    }
}
export default userReducer