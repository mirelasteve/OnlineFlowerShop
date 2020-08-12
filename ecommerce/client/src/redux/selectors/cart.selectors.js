import {createSelector} from 'reselect';

const getCart = state => state.cart;
 
export const selectCart = createSelector(
    [getCart],cart=>cart
)

export const selectTotalAmount = createSelector(
    [getCart],
    cart=>{
    let totalAmount = 0;
    cart.map(x=>{
        if(typeof x.id === 'string' && typeof x.count === 'number'){
            totalAmount+=x.count*x.price;  
        }
              
    });

    return totalAmount
    })


export const selectTotalProducts = createSelector(
    [getCart],cart=>{
    let newCount = 0;
    cart.map(x=>{
        if(typeof x.count === 'number'){
            newCount+=x.count;
        }
             
    });
    return newCount
})