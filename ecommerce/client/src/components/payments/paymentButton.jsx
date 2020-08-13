import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {purchaisedCart} from '../../redux/actions/cart/cart.actions'
import StripeCheckout from 'react-stripe-checkout';
import keys from '../../config/dev';
import { PURCHAISED_CART } from '../../redux/actions/actions.types';

const PaymentButton = ({price,purchaisedCart}) => {
    const priceHundred = price * 100;
    const onToken = (token) => {
        console.log(token);
        purchaisedCart();
    }
    // const onToken = axios.post('/payments')
console.log(process.env);
    return(
        <StripeCheckout
            label = {'Buy '+price}
            name = 'Flower Eshop'
            description = {'Thank you for buying out products /n'+price}
            amount = {priceHundred}
            stripeKey = {keys.STRIPE_KEY}
            token = {onToken}
        >


        </StripeCheckout>
    ) 
}
const mapDispatchToProps = dispatch => {
    return {
        purchaisedCart: () => dispatch({type:PURCHAISED_CART})
    }
    

}
export default connect(null,mapDispatchToProps)(PaymentButton);