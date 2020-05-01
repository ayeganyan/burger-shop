import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        loading: false,
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true
        if(rules.required) {
            isValid = value.trim() !=='' && isValid
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedOrderFormElement.value = event.target.value
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement

        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId]
        }   
        const order = {
            ingredients: this.props.ings,
            price: this.props.prc,
            order: formData
        }
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({ loading: false })
            })
        this.setState({ loading: true })
    }

    render() {
        let formElementsArray = []
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
                })}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contacts here:</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        prc: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)