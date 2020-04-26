import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

import classes from './ContactData.module.css'

export default
    class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log(this.props.ingredients)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: 'Armen',
            deliveryMethod: 'Fast',
            address: {
                street: 'dummy 1st, 3',
                city: 'Yerevan'
            }
        }
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({ loading: false })
            })
        this.setState({ loading: true })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name="name" placeholder='Your Name' />
                <input className={classes.Input} type='text' name="email" placeholder='Your Email' />
                <input className={classes.Input} type='text' name="street" placeholder='Street' />
                <input className={classes.Input} type='text' name="postal" placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contacts here:</h4>
                {form}
            </div>
        )
    }
}
