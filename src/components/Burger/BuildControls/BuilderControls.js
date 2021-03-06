import React from 'react';
import Control from './BuildControl/BuildControl'

import classes from './BuilderControls.module.css'

const controls = [
    {label: 'Salad', type: 'salad' },
    {label: 'Meat', type: 'meat' },
    {label: 'Bacon', type: 'bacon' },
    {label: 'Cheese', type: 'cheese' }
]

const builderControls = (props) => {
    return (
        <div className={classes.BuilderControls}>
            <p>Current price is: <strong>{props.price}$</strong></p>
            {controls.map(ctrl => (
                <Control 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() =>props.ingridientAdded(ctrl.type)}
                    removed={() =>props.ingridientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    />
            ))}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>
                    ORDER NOW
            </button>
        </div>
    );
};

export default builderControls;