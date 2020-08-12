import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { minusProduct, plusProduct } from '../../redux/actions/cart/cart.actions';
import { MINUS_PRODUCT, PLUS_PRODUCT } from '../../redux/actions/actions.types';

const CartComponent = ({cart,minusProduct,plusProduct}) => {


    return(
        <>
            <div className='columns pr0 is-italic'> 
                <div className='column is-6 has-text-primary-dark'>Name</div>
                <div className='column is-2 has-text-danger-dark '>Count</div>   
                <div className='column is-4 has-text-info-dark has-text-right '>$</div>
            </div> 
                            
        {cart.map((x,ind)=>
            typeof x.id === 'string' && typeof x.count === 'number'
            ? <div key={x.name}  className='columns my-6'> 
                    <div className='column is-2 image is-16x16 py-6'> <img src={x.img}/></div>  
                    <div className='column is-2 has-text-primary-dark '>
                        <Link to={x.url}>{x.name}</Link>
                        </div>
                    <div className='column is-1 has-text-danger-dark has-text-right'>
                        <button className='button button-small is-primary is-light' onClick={()=>minusProduct(x)}> - </button>
                    </div> 
                    <div className='column is-1 has-text-danger-dark has-text-centered'> {x.count}</div> 
                    <div className='column is-1 has-text-danger-dark has-text-left'>
                        <button className='button button-small is-primary is-light' onClick={()=>plusProduct(x)}> + </button>
                    </div>   
                    <div className='column is-2 has-text-info-dark has-text-right '> {(x.price*x.count).toFixed(2)}</div>
                    <div className='column is-2 has-text-danger'> X</div> 
            </div> 
            :<div key={ind}></div>
            )}
            
        
        </>
    )
}
const mapStateToProps = (state) => {
    return {cart:state.cart.cart}
}
const mapDispatchToProps = dispatch => {
    return({
        minusProduct: product => dispatch({type:MINUS_PRODUCT,product}),
        plusProduct: product => dispatch({type:PLUS_PRODUCT,product})
    })
}
export default connect(mapStateToProps,mapDispatchToProps)(CartComponent)