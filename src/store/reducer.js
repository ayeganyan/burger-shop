import * as ActionTypes from './actions'

const initialState = {
    ingredients: {
        meat: 0,
        bacon: 0,
        cheese: 0,
        salad: 0
    },
    totalPrice: 4
}

const INGRIDIENT_PRICES = {
    salad: 0.3,
    meat: 1.2,
    cheese: 0.2,
    bacon: 0.5
}

const reducer = (state = initialState, action) => {
    switch( action.type) {
        case ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:  {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: (state.totalPrice + INGRIDIENT_PRICES[action.ingredientName])
            }
        case ActionTypes.REMOVE_INGREDIENT:
            if (state.ingridients[state.ingredientName] === 0) {
                return state
            }
            return {
                ...state.ingridients,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingreients[action.ingredientName] - 1
                },
                totalPrice: (state.totalPrice - INGRIDIENT_PRICES[action.ingredientName])
            }
        default:
            return state
    }
}

export default reducer