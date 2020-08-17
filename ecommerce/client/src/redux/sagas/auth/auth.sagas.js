import { firestore,auth } from "firebase";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { GOOGLE_SIGN_IN_START, GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_FAILURE, ADD_ID_TO_CART } from "../../actions/actions.types";


function* createUser(userRef,userAuth,data){
        console.log(userAuth)
            if(!userAuth){
                return;
            }  else {
                    const {displayName,email,uid}= userAuth
                    const createdAt = new Date();
                    yield userRef.set({
                                        displayName,
                                        email,
                                        uid,
                                        createdAt,
                                        ...data
                                     })
                    yield put({type:GOOGLE_SIGN_IN_SUCCESS,user:userAuth})
                    yield put({type:ADD_ID_TO_CART,user:userAuth})
                    }
                    
                    
     
}
function* googleSignIn(){
    let provider = new auth.GoogleAuthProvider();
    console.log('googlesign in')
   try{
        const authObject = yield auth().signInWithPopup(provider);
        const user = yield authObject.user;
        console.log(user)
        if(user){
            const userRef = yield firestore().doc(`/users/${user.uid}`);
            const result = yield userRef.get();
            const exist = yield result.exists;
            console.log(exist)
            if(result.exists){
                yield put({type:GOOGLE_SIGN_IN_SUCCESS,user:result.data()})
                yield put({type:ADD_ID_TO_CART,user:result.data()})
                    
            } else {
                yield createUser(userRef,user)
                
                // yield put({type:GOOGLE_SIGN_IN_SUCCESS,user:result.data()})
                // yield put({type:ADD_ID_TO_CART,user:result.data()})
            }

            
        }
   } catch(error){
        console.log(error);
        yield put({type:GOOGLE_SIGN_IN_FAILURE,error:error})
   }
   
   
}

export function* googleSignInStartSaga(){
    yield takeLatest(GOOGLE_SIGN_IN_START,googleSignIn)
}

export function* authSagas(){
    yield all([call(googleSignInStartSaga)])
} 
    
