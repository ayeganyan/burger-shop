import React from 'react'
import PropsTypes from 'prop-types'

import classes from './BurgerIngridients.module.css'

const ingredient = (props) => {
    let ingredient = null
    
    switch(props.type) {
        case 'bread-bottom':
            ingredient = <div className={classes.BreadBottom}/>
            break
        case 'bread-top':
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}/>
                    <div className={classes.Seeds2}/>
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

ingredient.prototype ={
    type: PropsTypes.string.isRequired
}

export default ingredient