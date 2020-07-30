import firebase from 'firebase';
import 'firebase/firestore';
import config from '../config/firebaseKeys';

firebase.initializeApp(config)
export const firestore = firebase.firestore();
export const auth =  firebase.auth();
export default firebase