import React from 'react';

import Button from '../../UI/Button/Button'
import Aux from '../../../hocs/Aux'

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridients)
        .map(igKey => (
            <li key={igKey}>
                <p><span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingridients[igKey]}</p>
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
            <p><strong>Price Summary: {props.totalPrice}</strong></p>
            <Button btnType='Danger' clicked={props.canceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;