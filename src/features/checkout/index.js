import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Cart from '../cart'
import CheckoutForm from './form'


function submitOrder(values, cart) {
  const { email, name } = values.order
  // send the order
  axios({
    method: 'post',
    url: 'https://student-example-api.herokuapp.com/v1/orders.json',
    data: {
      order: {
        name,
        email,
        order_items_attributes: cart.map(item => ({
          product_id: item.id,
          qty: item.quantity,
        }))
      }
    }
  })
    .then((response) => {
      console.log(response.data);
      // if (response.errors) {
      //   alert('something went wrong!')
      //   return
      // }
      document.location.href = `/orders/${response.id}`
    });
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