import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuilderControls'
import Aux from '../../hocs/Aux'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PRICES = {
    salad: 0.3,
    meat: 1.2,
    cheese: 0.2,
    bacon: 0.5
}

class BurgerBuilder extends Component {

    state = {
        ingridients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 1.5,
        purchasable: false,
        purchasing: false
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
        alert('You have purchased!')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingridients={this.state.ingridients} 
                        canceled={this.purchaseCancelHandler} 
                        continued={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice.toFixed(2)}/>
                </Modal>
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
    }
}

export default BurgerBuilder