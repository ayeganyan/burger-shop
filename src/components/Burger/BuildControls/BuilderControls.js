import React from 'react';
import Control from './BuildControl/BuildControl'

import classes from './BuilderControls.module.css'

const controls = [
    {label: 'Salad', type: 'salad' },
    {label: 'Meat', type: 'meat' },
    {label: 'Bacon', type: 'bacon' },
    {label: 'Cheese', type: 'cheese' }
]

const builderControls = () => {
    return (
        <div className={classes.BuilderControls}>
            {controls.map(ctrl => (
                <Control key={ctrl.label} label={ctrl.label}/>
            ))}
        </div>
    );
};

export default builderControls;