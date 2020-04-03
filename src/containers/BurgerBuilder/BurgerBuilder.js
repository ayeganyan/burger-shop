import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuilderControls'

import Aux from '../../hocs/Aux'

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
            meat: 1,
            cheese: 1,
            bacon: 0
        },
        totalPrice: 1
    }

    addIngridientHandler = (type) => {
        const newIngrdidients = {
            ...this.state.ingridients
        }
        newIngrdidients[type] = this.state.ingridients[type] + 1
        const newPrice = this.state.totalPrice + INGRIDIENT_PRICES[type]
        this.setState({ingridients: newIngrdidients, totalPrice: newPrice})
    }

    removeIngridientHandler = (type) => {
        if(this.state.ingridients[type] === 0) {
            return
        }
        const newIngrdidients = {
            ...this.state.ingridients
        }
        newIngrdidients[type] = this.state.ingridients[type] - 1
        const newPrice = this.state.totalPrice - INGRIDIENT_PRICES[type]
        this.setState({ingridients: newIngrdidients, totalPrice: newPrice})
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
        }
        for( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingridients={this.state.ingridients} />
                <BuilderControls 
                    ingridientAdded={this.addIngridientHandler} 
                    ingridientRemoved={this.removeIngridientHandler}
                    disabled={disabledInfo}/>
            </Aux>
        )
    }
}

export default BurgerBuilder