const { ADD_PRODUCT_TO_CART } = require("../../actions/actions.types")

const INITIAL_STATE_CART = {
    userId:'',
    cart: [],
    
}

const cartReducer = (state=INITIAL_STATE_CART,action) => {
    
    switch(action.type){
        case ADD_PRODUCT_TO_CART: return {
                                    ...state,
                                         cart:[...state.cart.some(x => x.id === action.product.id)
                                                 ? [...state.cart.map(x=> x.id === action.product.id ? {...x,count:x.count+=1} : x)]
                                                 : [...state.cart,action.product]
                                                ]
                                            
        }
        default: return state
    }
}

export default cartReducer;