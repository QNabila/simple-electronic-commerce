import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb} from '../../utilities/fakedb';
import './Shop.css';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    // go to hook useCart
    const [cart, setCart] = useCart(products);
    // products to be rendered on the UI
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            });
    }, []);
// copying previous cart and adding new product 
    const handleAddToCart = (product) => {
         //finding if product is already in cart or not
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
          //jodi exist kore taile oita bade bai product gulo restProduct e news hobe,then exist product er quantity 1   barabo,then array create korbo
        if (exists) {
            const restProduct = cart.filter(pd => pd.key !==product.key);
            exists.quantity = exists.quantity + 1;
            newCart=[...restProduct,product]
        }
          //else product er quantity just 1 barabo, cart er product er shate add korbo
        else {
            product.quantity = 1;
            newCart = [...cart, product];
           
        }
        setCart(newCart);
        // save to local storage (for now)
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                </div>
                <div className="cart-container">
                <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review Your Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;