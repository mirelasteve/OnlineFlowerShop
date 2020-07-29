import firebase from '../../../firebase/firebase.utils';
import auth from '../../../firebase/firebase.utils';
import { SIGN_UP, SIGN_OUT } from '../actions.types';


export const SignInWithProvider = (providerName)=>{
   return async (dispatch) =>{
    
       let provider = new firebase.auth.GoogleAuthProvider() ;
      
       const user = await firebase.auth().signInWithPopup(provider);
       dispatch(signUp(user))
       }
       
   }

 export const signUp = (user) => {
      return {
          type:SIGN_UP,
          user:user
      }
  }



export const loadCreateUser = () => {
    return async(dispatch) => {
    firebase.auth().onAuthStateChanged(async (user)=>{
        
            if(user){
                const userRef = await createUser(user);
                userRef.onSnapshot(snapshot => {
                  
                   dispatch(signUp(snapshot.data()))
                   
                 })
                 
               } else {
                 
               }
             })
        }
        

}

export const createUser = async (userAuth,data) => {
    if(!userAuth) return;
   
    const userRef = firebase.firestore().doc(`/users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(snapShot.exists){

    } else {
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
    return userRef
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