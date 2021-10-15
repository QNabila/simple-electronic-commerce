import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProduct';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart'
import ReviewItem from '../ReviewItem/ReviewItem';
const OrderReview = () => {
    // calling useProduct.js, return array kortese tai destructuring-eo array kortesi
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);
    // for place order button
    const history = useHistory();
    const handleRemove = key => {
        // checking the key of remove button,je product er key gulo match korena oigulo niye ekta array create
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }
    const handlePlaceOrder = () => {
        history.push('/placeorder');
        // remove from ui
        setCart([]);
        // calling this function from fakedb, it will clear the cart
        clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem product={product}
                        key={product.key}
                        handleRemove={handleRemove}
                    ></ReviewItem>
                        )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} >  
                    <button onClick={handlePlaceOrder}className="btn-regular">Place Order</button>
              
            </Cart>
            </div>
           
        </div>
    );
};

export default OrderReview;