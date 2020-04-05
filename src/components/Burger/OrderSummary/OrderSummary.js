import React from 'react';

import Aux from '../../../hocs/Aux'

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridients)
        .map(igKey => (
            <li key={igKey}>
                <p><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingridients[igKey]}</p>
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
        </Aux>
    );
};

export default orderSummary;