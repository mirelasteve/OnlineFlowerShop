import { ADD_PRODUCT_TO_CART, MINUS_PRODUCT,PLUS_PRODUCT, REMOVE_PRODUCT_FROM_CART } from "../actions.types"

export const addProductToTheCart = (product) => {
    return {
        type:ADD_PRODUCT_TO_CART,
        product
    }
}
export const minusProduct = (product) => {
    return {
        type:MINUS_PRODUCT,
        id:product.id
    }
}
export const plusProduct = (product) => {
    return {
        type:PLUS_PRODUCT,
        id:product.id
    }
}
export const removeProductFromCart = (product) =>{
    return{
        type:REMOVE_PRODUCT_FROM_CART,
        product
    }
}