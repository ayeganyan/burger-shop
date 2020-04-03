import React from 'react'

import classes from './BurgerIngredients.module.css'

const ingredient = (props) => {
    let ingredient = null
    
    switch(props.type) {
        case 'bread-bottom':
            ingredient = <div className={classes.BreadBottom}/>
            break
        case 'bread-top':
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seed1}/>
                    <div className={classes.Seed2}/>
                </div>
            )
            break
        case 'meat':
            ingredient = <div className={classes.Meat}/>
            break
        case 'cheese':
            ingredient = <div className={classes.Cheese}/>
            break
        case 'salad':
            ingredient = <div className={classes.Salad}/>
            break
        case 'bacon':
            ingredient = <div className={classes.Bacon}/>
            break
        default:
            console.log('Invalid ingredient: ' + props.tyoe)
    }
    return ingredient;
}

export default ingredient