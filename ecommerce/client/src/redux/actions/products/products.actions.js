import { db } from "../../../utils/firebase.utils"

const {LOAD_STATE_PRODUCT, LOAD_STATE_PRODUCT_COLLECTION } = require("../actions.types")

export const  loatStateProduct = (dispatch) => {
    return (
        async dispatch => {
            const data = []
            const snapshot = await db.collection('products').get();
            snapshot.forEach( async doc => {
                if(doc.data()) {
                    data.push(doc.data());
                }
            });
          
            dispatch(getStateProducts(data));

        }
    )
    
}

export const getStateProducts = (payload) => {
    return {
        type:LOAD_STATE_PRODUCT,
        payload
    }
}
export const loadStateProductCollection = () => {
    return {
        type:LOAD_STATE_PRODUCT_COLLECTION,
        
    }
}
