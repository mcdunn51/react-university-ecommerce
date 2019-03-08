import React from 'react';

const ProductListItem = (props) => {
    const thisItemInCart = props.cart.filter(item => item.id === props.product.id)[0]
    return (
        <div className="product-list-item">
            <div>
                <h3>{props.product.name}</h3>
                <img
                    height={100}
                    title={props.product.name}
                    src={`/products/${props.product.image}`} />
            </div>
            <div>{props.product.description}</div>
            <div>${props.product.price}</div>
            <div>
                <button
                onClick={() => props.addToCart(props.product)}
                >Add to cart({
                    (thisItemInCart && thisItemInCart.quantity) || 0
                })</button>
            </div>
        </div>
    )
}

export default ProductListItem;