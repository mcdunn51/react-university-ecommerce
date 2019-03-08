import React from 'react';
import { connect } from 'react-redux'

import ProductListItem from './product-list-item';

const ProductListing = (props) => {
    return (
        <div className="product-listing">
            {
                props.products.map( product => 
                    <ProductListItem
                    product={product}
                    addToCart={props.addToCart}
                    cart={props.cart} />)
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {
            dispatch({ type:'ADD', payload: item })
        },
        removeFromCart: (item) => {
            dispatch({ type: 'REMOVE', payload: item })
        }
    }
}

// the connect function returns a higher order component. The ProductListing component will inherit the functionality of this HOC in it's props.
export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);