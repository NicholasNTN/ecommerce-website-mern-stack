import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import { Store } from '../Store';
import '../styles/cart.css'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Cart() {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/slug/${item.slug}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock.');
            return;
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    }

    const removeItemHandler = (item) => {
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item,
        });
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <>
            <Navbar />
            <div className="cart-container">
                <div className="cart-row">
                    <h2 className="cart-title">Shopping Cart</h2>
                </div>
                <div className="cart-rowss">
                    {/*  */}
                    <div class="cart-cols">
                        {cartItems.length === 0 ? (<h3 className='info'>Cart is empty. <Link to='/shop'>Go Shopping</Link></h3>) : (
                            <div className='cart-cards'>

                                <table class="checkout table" >
                                    <thead>
                                        <tr>
                                            <th rowspan="1"></th>
                                            <th rowspan="1">Image</th>
                                            <th rowspan="1">Product</th>
                                            <th rowspan="1">Price</th>
                                            <th rowspan="1"></th>
                                            <th rowspan="1">Total</th>
                                        </tr>
                                    </thead>
                                    {cartItems.map((item) => (
                                        <tbody key={item._id}>
                                            <tr>
                                                <td class="text-center">
                                                    <div class="cart-remove">
                                                        <button onClick={() => removeItemHandler(item)} ><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="cart-image">
                                                        <img src={item.image} alt={item.title} />
                                                    </div>
                                                </td>
                                                <td className='td-title'>
                                                    <Link to={`/product/${item.slug}`}>{item.title}</Link>
                                                    <p className='cart-desc'>{item.desc}</p>
                                                </td>
                                                <td>
                                                    <span className='cart-price'>${item.price}</span>
                                                </td>
                                                <td>
                                                    <div className="buttons">
                                                        <button onClick={(() => updateCartHandler(item, item.quantity - 1))} disabled={item.quantity === 1}><FontAwesomeIcon icon={faMinusCircle} /></button>{' '}
                                                        <span className='cart-quantity'>{item.quantity}</span>{' '}
                                                        <button onClick={(() => updateCartHandler(item, item.quantity + 1))} disabled={item.quantity === item.countInStock}><FontAwesomeIcon icon={faPlusCircle} /></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>
                                                        {/* <small class="price"><s>0₫</s></small> */}
                                                        ${item.price * item.quantity}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        )}
                    </div>
                    {/*  */}

                </div>
                <div className="cart-col">
                    <div className="checkout-cart">
                        <div className="checkout-body">
                            <h3 className="checkout-title">
                                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items ) :
                                ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                            </h3>
                        </div>
                        <div className="checkout-footer">
                            <button onClick={checkoutHandler} className='checkout-btn' type="button" disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </>
    )
}

export default Cart
