import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

export default class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const ingredients = {}
        const query = new URLSearchParams(this.props.location.search)
        let price = 0
        for(let [name, value] of query) {
            if(name === 'price') {
                price = value;
            } else {
                ingredients[name] = +value
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
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
                    render={(props) => 
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            totalPrice={this.state.totalPrice} 
                            {...props}/>}/>
            </div>
        )
    }
}
