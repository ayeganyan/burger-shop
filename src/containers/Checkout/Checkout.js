import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {

    state = {
        ingredients:
        {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    }

    checkoutCanceledHandler = () => {
        this.props.history.goback()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log(this.props.history)
        return (
            <div>
                <CheckoutSummary 
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients} />
            </div>
        )
    }
}
