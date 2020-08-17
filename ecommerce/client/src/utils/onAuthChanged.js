import { auth } from "firebase"

export function checkCurrentUser(){
    // console.log('CHECKING FOR CURRENT USER')
    return new Promise((resolve,reject)=>{
        const unsubscribe = auth().onAuthStateChanged(user =>{
            // console.log(user)
            if(user){
                unsubscribe()
                resolve(user)
            } else {
                reject()
            }
        })
       
    })
   
}