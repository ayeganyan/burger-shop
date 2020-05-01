import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuilderControls'
import Aux from '../../hocs/Aux'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hocs/withErrorHandler/withErrorHandler'
import * as ActionTypes from '../../store/actions'
import { connect } from 'react-redux'

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        console.log(this.props)
        // axios.get('https://burger-shop-ay.firebaseio.com/ingridients.json')
        //     .then(res => this.setState({ ingridients: res.data }))
        //     .catch(err => this.setState({error: err}))
    }

    updatePurchasable(ingridients) {
        const sum = Object.values({ ...ingridients })
            .reduce((sum, el) => sum + el, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingridients={this.props.ings} />
                    <BuilderControls
                        ingridientAdded={this.props.onIngredientAdd}
                        ingridientRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={this.props.prc}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingridients={this.props.ings}
                canceled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler}
                totalPrice={this.props.prc} />
        }
        if(this.state.loading) {
            orderSummary = <Spinner/>
        }
        if(this.state.error) {
            burger = <p>Ingridients can't be loaded: {this.state.error.message}</p>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return ({
        ings: state.ingredients,
        prc: state.totalPrice
    })
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: ingName => dispatch({type: ActionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: ingName => dispatch({type: ActionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))