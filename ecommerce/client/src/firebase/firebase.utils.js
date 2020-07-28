import firebase from 'firebase';
import 'firebase/firestore';
import config from '../config/firebaseKeys';

firebase.initializeApp(config)
export const firestore = firebase.firestore();
export const auth =  firebase.auth();
// const database = firebase.datebase();
const provider = new firebase.auth.GoogleAuthProvider();


  export const SignInWithGoogle = ()=>{
      
    auth.signInWithPopup(provider).then(function(result) {
       
        // ...
      }).catch(function(error) {
        
      });
  }

  export const createUser = async (userAuth,data) => {
    if(!userAuth) return;
   
    const userRef = firestore.doc(`/users/${userAuth.uid}`);
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

  export const SignOut = ()=> {
    auth.signOut()
  }

  export default firebase