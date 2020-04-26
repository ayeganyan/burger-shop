import React, { Component } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import withError from '../../hocs/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

export default withError(
    class Orders extends Component {

        state = {
            orders: [],
            loading: false
        }

        componentWillMount() {
            this.setState({ loading: true })
            axios.get('/orders.json')
                .then(res => {
                    let fetchedOrders = []
                    for (let key in res.data) {
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        })
                    }
                    this.setState({ orders: fetchedOrders, loading: false })
                })
        }

        render() {
            let orders = <Spinner/>
            console.log(this.state.orders)
            if(!this.state.loading) {
                orders = this.state.orders.map(order => 
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        totalPrice={+order.price}/>)
            }
            return (
                <div>
                    {orders}
                </div>
            )
        }
    }, axios)
