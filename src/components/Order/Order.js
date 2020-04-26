import React from 'react';

import classes from './Order.module.css'

export default (props) => {
  const ingredients = []
  for(let ingerdientName in props.ingredients) {
    ingredients.push({
      name: ingerdientName,
      amount: props.ingredients[ingerdientName]
    })
  }
  const ingredientsOutput = ingredients.map(ig => {
    return <span style={{
      textTransform: "capitalize",
      margin: "08px",
      display: "display-box",
      border: "1px solid #ccc",
      padding: "5px"
    }}>{ig.name} ({ig.amount})</span>
  })
  return (
    <div className={classes.Order}>
      <p>Ingredient: {ingredientsOutput}</p>
      <p>Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
    </div>
  )
};