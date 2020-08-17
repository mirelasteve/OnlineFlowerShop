import firebase from '../../../utils/firebase.utils';
// import auth from '../../../firebase/firebase.utils';
import { SIGN_UP, SIGN_OUT, ADD_ID_TO_CART, GOOGLE_SIGN_IN_START } from '../actions.types';


export const SignInWithProvider = (providerName)=>{
   return async (dispatch) =>{

       let provider = '';

        switch(providerName){
            case 'google' : provider = new firebase.auth.GoogleAuthProvider(); break;
            case 'facebook' : provider = new firebase.auth.FacebookAuthProvider(); break;
            default: return ''
        }
       
      
       const user = await firebase.auth().signInWithPopup(provider);
       if(user){
         
       }
       }
       
   }

 export const signUp = (user) => {
      return {
          type:SIGN_UP,
          user:user
      }
  }

  export const addId = (user) => {
      return {
          type:ADD_ID_TO_CART,
          id:user.uid
      }
  }


export const loadCreateUser = () => {
    return async(dispatch) => {
    firebase.auth().onAuthStateChanged(async (user)=>{
      
            if(user){
                dispatch(checkDatebaseForCurrentUser(user))
            } else {
                //@TODO
                //  dispatch(error)
            }})
        }
}
const checkDatebaseForCurrentUser = (user,data) =>{
    return async (dispatch) =>{
        const userRef = await firebase.firestore().doc(`/users/${user.uid}`);
        const result = await userRef.get();
        if(result.exists){
            dispatch(signUp(result.data()))
            dispatch(addId(result.data()))
        } else {
           dispatch(createUser(userRef,user,data))
          }
    }
    
}
export const createUser =  (userRef,userAuth,data) => {
    return async(dispatch)=>{
        if(!userAuth){
            return;
        }  else {
                const {displayName,email,uid}= userAuth
                const createdAt = new Date();
                await userRef.set({
                                    displayName,
                                    email,
                                    uid,
                                    createdAt,
                                    ...data
                                 })
                }
                dispatch(signUp(userAuth))
                dispatch(addId(userAuth))
                return userRef
    }
    
}
  
  export const loadSignOut =  () => {
    return async (dispatch) => {
       await firebase.auth().signOut().then(function(){
           dispatch(signOut())
       }).catch((error)=>console.log(error))
       
    }

}

export const signOut = () => {
    return {
        type:SIGN_OUT
    }
}
export const googleSignInStart = () => {
    return {
        type:GOOGLE_SIGN_IN_START
    }
}