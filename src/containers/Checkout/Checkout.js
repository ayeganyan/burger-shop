import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

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

    componentDidMount() {
        const ingredients = {}
        const query = new URLSearchParams(this.props.location.search)
        for(let [name, count] of query) {
            ingredients[name] = +count
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack()
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
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        )
    }
}
