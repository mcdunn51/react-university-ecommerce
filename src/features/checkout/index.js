import React from 'react'
import { connect } from 'react-redux'

import Cart from '../cart'
import CheckoutForm from './form'
import axios from 'axios'

function submitOrder(values, cart) {
  const { email, name } = values.order

  axios.post('https://student-example-api.herokuapp.com/v1/orders.json', {
    order: {
      name,
      email,
      order_items_attributes: cart.map(item => ({
        product_id: item.id,
        qty: item.quantity,
      }))
    }
  })
    .then(response => {
      console.log(response.data);
      document.location.href = `/orders/${response.data.id}`
    })

}

function Checkout(props) {
  const { cart } = props

  return <div>
    <div style={{ border: '1px solid black' }}>
      <Cart />
    </div>

    <CheckoutForm onSubmit={(values) => submitOrder(values, cart)} />
  </div>
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}
export default connect(mapStateToProps)(Checkout)