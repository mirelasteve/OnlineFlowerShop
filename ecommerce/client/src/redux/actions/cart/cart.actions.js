import { ADD_PRODUCT_TO_CART } from "../actions.types"

export const addProductToTheCart = (product) => {
    return {
        type:ADD_PRODUCT_TO_CART,
        product
    }
}
