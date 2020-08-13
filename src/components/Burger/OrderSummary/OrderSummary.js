import React, { Component } from 'react';

import Button from '../../UI/Button/Button'
import Aux from '../../../hocs/Auxiliary'

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] componentWillUpdate')
    }
    
    render() {
        const ingridientSummary = Object.keys(this.props.ingridients)
            .map(igKey => (
                <li key={igKey}>
                    <p><span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {this.props.ingridients[igKey]}</p>
                </li>
            ))
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A burger with the following ingridients:</p>
                <ul>
                    {ingridientSummary}
                </ul>
                <p>Continue to checkout?</p>
                <p><strong>Price Summary: {this.props.totalPrice}</strong></p>
                <Button btnType='Danger' clicked={this.props.canceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continued}>CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;