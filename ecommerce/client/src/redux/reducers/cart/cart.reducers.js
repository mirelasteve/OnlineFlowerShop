const { ADD_PRODUCT_TO_CART, ADD_ID_TO_CART, MINUS_PRODUCT, PLUS_PRODUCT } = require("../../actions/actions.types")

const INITIAL_STATE_CART = {
    userId:'',
    cart: [],
    
}

const cartReducer = (state=INITIAL_STATE_CART,action) => {
    console.log(action)
    switch(action.type){
        case ADD_PRODUCT_TO_CART: return {
                                    ...state,
                                         cart:[...state.cart.some(x => x.id === action.product.id)
                                                 ? [...state.cart.map(x=> x.id === action.product.id ? {...x,count:x.count+=1} : x)]
                                                 : [...state.cart,action.product]
                                                ]
                                            
        }
        case ADD_ID_TO_CART: return {
                                    ...state,userId:action.id
        }
        case MINUS_PRODUCT: return {
                                    ...state,
                                        cart:[...state.cart.map((x,xInd)=>{
                                            if(typeof action.product.id === 'string' && x.id === action.product.id){
                                                if(typeof x.count === 'number' && x.count >1){
                                                    
                                                    return {
                                                        ...x,
                                                        count:x.count -1
                                                    }
                                                } else if(typeof x.count === 'number' && x.count === 1){
                                                    
                                                  return {}
                                                    
                                                } 
                                            } else {
                                               return x
                                            }
                                        }) ]

        }
        case PLUS_PRODUCT: return {
                                ...state,
                                    cart:[...state.cart.map(x=>{
                                        if(typeof action.product.id === 'string' && x.id === action.product.id){
                                           return {
                                                    ...x,
                                                    count:x.count +1
                                                }
                                            
                                        } else {
                                        return x
                                        }
                }) ]

        }
        default: return state
    }
}

export default cartReducer;