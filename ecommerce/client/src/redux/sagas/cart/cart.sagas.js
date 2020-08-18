import { START_ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_CART } from "../../actions/actions.types";
import { take, put, all, call } from "redux-saga/effects";

export function* onAddProductToCart(product){
    yield put({type: ADD_PRODUCT_TO_CART,product})
}

export function* startAddProductToCart(){
    console.log('SAGA ADD PRODUCT')
 yield take(START_ADD_PRODUCT_TO_CART,onAddProductToCart)
}

export function* cartSagas(){
    yield all([
        call(startAddProductToCart)
    ])
}