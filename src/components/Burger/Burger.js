import React from 'react';
import BurgerIngredient from './BurgerIngridients/BurgerIngridients'

import classes from './Burger.module.css'

const Burger = (props) => {
    let transformedIngridients = Object.keys(props.ingridients)
        .map(igKey => {
            return [...Array(props.ingridients[igKey])]
                .map((_, index) => {
                    return <BurgerIngredient key={igKey + index} type={igKey}/>
                })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    if(transformedIngridients.length === 0) {
        transformedIngridients = <p>Please fill the ingridients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngridients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default Burger;