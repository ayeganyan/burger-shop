import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuilderControls'

import Aux from '../../hocs/Aux'

class BurgerBuilder extends Component {

    state = {
        ingridients: {
            salad: 0,
            meat: 1,
            cheese: 0,
            bacon: 0
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingridients={this.state.ingridients} />
                <BuilderControls />
            </Aux>
        )
    }
}

export default BurgerBuilder