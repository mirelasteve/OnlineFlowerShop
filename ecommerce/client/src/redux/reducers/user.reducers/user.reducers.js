import auth from '../../../firebase/firebase.utils';

import SET_USER from '../../actions/actions.types';
console.log(auth);
const userReducer = (state={user:null},action)=>{
    switch(action.type){
        case SET_USER: return state.user
        default: return state
    }
}
export default userReducer