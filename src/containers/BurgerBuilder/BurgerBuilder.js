import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'

import Aux from '../../hocs/Aux'

class BurgerBuilder extends Component {

    state = {
        ingridients: {
            salad: 1,
            meat: 2,
            cheese: 2,
            bacon: 1
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingridients={this.state.ingridients} />
                <p>Burger Components</p>
            </Aux>
        )
    }
}

export default BurgerBuilder