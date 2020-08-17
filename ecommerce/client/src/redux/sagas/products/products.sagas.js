import {takeEvery , put, call, takeLatest} from 'redux-saga/effects';
import { LOAD_STATE_PRODUCT, LOAD_STATE_PRODUCT_COLLECTION } from '../../actions/actions.types';
import { db } from '../../../utils/firebase.utils';
import { getStateProducts } from '../../actions/products/products.actions';


export function* fetchCollectionsAsync(){
    yield console.log('async call to the db');
    
            const data = [];
            try {
            const products = yield db.collection('products');
            
            const snapshot = yield products.get();
            yield console.log(snapshot)
            snapshot.forEach( doc => {
                    if(doc.data()) {
                      data.push(doc.data());
                    }
                });
            
            
                yield put({type:LOAD_STATE_PRODUCT_COLLECTION,payload:data});
               
            } catch(error){
                console.log(error)
            }
 }
export function* fetchCollectionsStartSaga(){
    console.log('SAGA')
    yield takeLatest(LOAD_STATE_PRODUCT,fetchCollectionsAsync)
}