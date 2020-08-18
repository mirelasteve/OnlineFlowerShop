import { firestore,auth } from "firebase";
import { all, takeLatest, call, put, takeEvery } from "redux-saga/effects";
import { GOOGLE_SIGN_IN_START, GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_FAILURE, ADD_ID_TO_CART, CHECK_CURRENT_USER, SIGN_IN, START_SIGN_OUT, SIGN_OUT_FAILURE, SIGN_OUT_SUCCESS } from "../../actions/actions.types";
import { checkCurrentUser } from "../../../utils/onAuthChanged";


function* createUser(userRef,userAuth,data){
       
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
    
   try{
        const authObject = yield auth().signInWithPopup(provider);
        const user = yield authObject.user;
       
        if(user){
            const userRef = yield firestore().doc(`/users/${user.uid}`);
            const result = yield userRef.get();
            const exist = yield result.exists;
            
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

 
    
export function* inCheckCurrentUser(){
    
    try{
      const user =  yield call(checkCurrentUser);        
        yield put({type:SIGN_IN,user:user})
        yield put({type:ADD_ID_TO_CART,user:user})
        
    }
    catch(error){
        yield put({type:GOOGLE_SIGN_IN_FAILURE,error:error})
    }
}
export function* onCheckCurrentUser(){
    yield takeLatest(CHECK_CURRENT_USER,inCheckCurrentUser)
}

export function* signOutUser(){
    try{
        yield auth().signOut();
        yield put({type:SIGN_OUT_SUCCESS})
    } catch(error){
        console.log(error)
        yield put({type:SIGN_OUT_FAILURE,error})
    }
}
export function* onStartSignOut(){
   
    yield takeLatest(START_SIGN_OUT,signOutUser)
}
export function* authSagas(){
    yield all([
        call(googleSignInStartSaga),
        call(onCheckCurrentUser),
        call(onStartSignOut)
    ])
}