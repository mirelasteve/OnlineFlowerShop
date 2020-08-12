import firebase from 'firebase';
import 'firebase/firestore';
import config from '../config/firebaseKeys';
import products from '../redux/data/products';

firebase.initializeApp(config)
export const db = firebase.firestore();
export const auth =  firebase.auth();

// Adding to firebase cloud
// const addProducts = async () => {
   
//    const productKeys = Object.keys(products);
//    productKeys.forEach( prKey => {
//     db.collection('products').doc(prKey).set({[prKey]:products[prKey]})
//    })
   
// }

// addProducts()
export default firebase

