import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

import ProductListItem from './product-list-item'

class ProductListing extends React.Component {
  componentDidMount() {
    // get the products
    const { loadProducts } = this.props
    axios.get('https://student-example-api.herokuapp.com/v1/products.json')
      .then(response => {
        loadProducts(response.data)
      })
  }

  render() {
    const { addToCart, removeFromCart, products, cart } = this.props
    return <div className='product-listing'>
      {
        products.map(product =>
          <ProductListItem
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartItem={cart.filter(cartItem => cartItem.id === product.id)[0]}
          />)
      }
    </div>
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    products: state.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadProducts: (products) => {
      dispatch({ type: 'LOAD', payload: products })
    },
    addToCart: (item) => {
      dispatch({ type: 'ADD', payload: item })
    },
    removeFromCart: (item) => {
      dispatch({ type: 'REMOVE', payload: item })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing)