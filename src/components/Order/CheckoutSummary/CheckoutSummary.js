import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope the burger is tasty!</h1>
            <div style={{width: "100%", height: '100%px', margin: 'auto'}}>
                <Burger ingridients={props.ingredients}/>
            </div>
            <Button
                btnType='Danger'>
                    CANCEL
            </Button>
            <Button
                btnType='Success'>
                    CONTINUE
            </Button>
        </div>
    );
};

export default checkoutSummary;