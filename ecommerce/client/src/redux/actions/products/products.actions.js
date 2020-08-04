
const {LOAD_STATE_PRODUCT, LOAD_STATE_PRODUCT_COLLECTION } = require("../actions.types")

export const  loatStateProduct = () => {
    console.log('loadStateProduct')
    return {
        type:LOAD_STATE_PRODUCT
    }
}

export const loatStateProductCollection = (collectionName) => {
    return {
        type:LOAD_STATE_PRODUCT_COLLECTION,
        collectionName
    }
}
export  default loatStateProduct
