import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuilderControls'
import Aux from '../../hocs/Aux'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hocs/withErrorHandler/withErrorHandler'

const INGRIDIENT_PRICES = {
    salad: 0.3,
    meat: 1.2,
    cheese: 0.2,
    bacon: 0.5
}

class BurgerBuilder extends Component {

    state = {
        ingridients: null,
        totalPrice: 1.5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://burger-shop-ay.firebaseio.com/ingridients.json')
            .then(res => this.setState({ ingridients: res.data }))
            .catch(err => this.setState({error: err}))
    }

    updatePurchasableState(ingridients) {
        const sum = Object.values({ ...ingridients })
            .reduce((sum, el) => sum + el, 0)
        this.setState({ purchasable: sum > 0 })
    }

    addIngridientHandler = (type) => {
        const newIngrdidients = {
            ...this.state.ingridients
        }
        newIngrdidients[type] = this.state.ingridients[type] + 1
        const newPrice = this.state.totalPrice + INGRIDIENT_PRICES[type]
        this.setState({ ingridients: newIngrdidients, totalPrice: newPrice })
        this.updatePurchasableState(newIngrdidients)
    }

    removeIngridientHandler = (type) => {
        if (this.state.ingridients[type] === 0) {
            return
        }
        const newIngrdidients = {
            ...this.state.ingridients
        }
        newIngrdidients[type] = this.state.ingridients[type] - 1
        const newPrice = this.state.totalPrice - INGRIDIENT_PRICES[type]
        this.setState({ ingridients: newIngrdidients, totalPrice: newPrice })
        this.updatePurchasableState(newIngrdidients)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // const order = {
        //     ingridients: this.state.ingridients,
        //     price: this.state.totalPrice,
        //     customer: 'Armen',
        //     deliveryMethod: 'Fast',
        //     address: {
        //         street: 'dummy 1st, 3',
        //         city: 'Yerevan'
        //     }
        // }
        // axios.post('orders', order)
        //     .then(res => {
        //         this.setState({ loading: false })
        //         this.setState({ purchasing: false })
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false })
        //         this.setState({ purchasing: false })
        //     })
        // this.setState({ loading: true })
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = <Spinner />
        if (this.state.ingridients) {
            burger = (
                <Aux>
                    <Burger ingridients={this.state.ingridients} />
                    <BuilderControls
                        ingridientAdded={this.addIngridientHandler}
                        ingridientRemoved={this.removeIngridientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingridients={this.state.ingridients}
                canceled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice.toFixed(2)} />
        }
        if(this.state.loading) {
            orderSummary = <Spinner/>
        }
        if(this.state.error) {
            burger = <p>Ingridients can't be loaded: {this.state.error.message}</p>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)