import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckoutSteps from '../components/CheckoutSteps'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import '../styles/placeorder.css'
import { getError } from '../utils'


const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
};

const PlaceOrder = () => {
    const navigate = useNavigate();

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    //price
    const roundPrice = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = roundPrice(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? roundPrice(0) : roundPrice(10);
    cart.taxPrice = roundPrice(0.20 * cart.itemsPrice); //for tax in Serbia 20%
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });

            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
            toast.success('Successful order');
        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]); //if not isset payment, go to last step -> payment

    return (
        <>
            <Navbar />
            <div className="placeorder-container">
                <div className="order-rows">
                    <div className="order-title">
                        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
                    </div>
                    <div className="order-title">
                        <h2>Order Preview</h2>
                    </div>
                </div>
                <div className='main-content'>
                    <div className="order-container">
                        <div className="order-row">
                            <div className="order-header">
                                <div class="os-header-heading">
                                    <FontAwesomeIcon className='order-header-icon' icon={faPencil} />
                                    <h2 class="os-header-title">
                                        Order preview
                                    </h2>
                                    <span class="os-order-number">
                                        Check your order.
                                    </span>
                                    <span class="os-description">
                                        Thanking you for your purchase!
                                    </span>
                                </div>
                            </div>
                            <div className="order-body">
                                <div className="order-shipping">
                                    <h2 className="order-shipping_title">Order information </h2>
                                    <h4>Delivery information. <Link to="/shipping"><FontAwesomeIcon icon={faPencil} />Edit</Link></h4>
                                    <p className="order-shipping_info">Full Name : {cart.shippingAddress.fullname}</p>
                                    <p className="order-shipping_info">Email : {cart.shippingAddress.email}</p>
                                    <p className="order-shipping_info">Phone Number : {cart.shippingAddress.phone}</p>
                                    <p className="order-shipping_info">Address : {cart.shippingAddress.address}</p>
                                    <p className="order-shipping_info">City : {cart.shippingAddress.city}</p>
                                    <p className="order-shipping_info">PostalCode : {cart.shippingAddress.postalCode}</p>
                                    <p className="order-shipping_info">Country : {cart.shippingAddress.country}</p>
                                    <h4>PayPal <Link to="/payment"><FontAwesomeIcon icon={faPencil} />Edit</Link></h4>{/* <p className="order-shipping_info">{cart.paymentMethod.paymentMethodName === 'Cash' ? (<span class="radio-label-primary">payments upon delivery (COD)</span>) : (<span class="radio-label-primary">Ability to transfer money across the bank</span>)}</p> */}
                                    <p className="order-shipping_info">{cart.paymentMethod}</p>
                                </div>
                                <div className="order-summary-content">
                                    <h2 className='order-summary'>Order Summary</h2>
                                    <div className="order-summary-info">
                                        <h4>Items</h4>
                                        <span>${cart.itemsPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="order-summary-info">
                                        <h4>Shipping</h4>
                                        <span>${cart.shippingPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="order-summary-info">
                                        <h4>Tax</h4>
                                        <span>${cart.taxPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="order-summary-info">
                                        <h3>Total</h3>
                                        <span>${cart.totalPrice.toFixed(2)}</span>
                                    </div>
                                    {/* <div className="order-summary-button">
                                        <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="cart-containers">
                    <div className="total-container">
                        <div className="checkout-total">
                            <div className="checkout-total-body">
                                <h3 className="checkout-total-title">
                                    Subtotal ( {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items ) <Link to="/cart"><FontAwesomeIcon icon={faPencil} />Edit</Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="cart-row">
                        {/*  */}
                        <div class="cart-cols">
                            <div className='cart-cards'>

                                <table class="checkout table" >
                                    {cart.cartItems.map((item) => (
                                        <tbody key={item._id}>
                                            <tr>
                                                <td>
                                                    <div class="cart-image">
                                                        <img src={item.image} alt={item.title} />
                                                    </div>
                                                </td>
                                                <td className='td-title'>
                                                    <Link to={`/product/${item.slug}`}>{item.title}</Link> x <span>{item.quantity}</span>
                                                </td>
                                                <td>
                                                    <span className='cart-price'>${item.price * item.quantity}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                        {/*  */}
                    </div>
                </div>
                <div class="order-footer">
                    <button className='bthz' type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>PLACE ORDER</button>
                    {loading && <LoadingBox></LoadingBox>}
                    <p class="step-footer-info">
                        Need help ? <Link to='/'> Contact Us</Link>
                    </p>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </>
    )
}

export default PlaceOrder