import {all,call} from 'redux-saga/effects';
import { fetchCollectionsStartSaga } from './products/products.sagas';
import { authSagas } from './auth/auth.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga(){
    yield all([
        call(fetchCollectionsStartSaga),
        call(authSagas),
        call(cartSagas)
    ])
}