import React, { useReducer } from 'react'
import Footer from './Footer'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import Navbar from './Navbar'
import '../styles/orderDetails.css'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { getError } from '../utils'
import axios from 'axios'
import { Store } from '../Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import CheckoutSteps from './CheckoutSteps'
import { toast } from 'react-toastify'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

const OrderDetails = () => {

    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if (!userInfo) {
            return navigate('/login');
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [order, userInfo, orderId, navigate]);

    const placeOrderHandler = async () => {
        navigate('/');
    };

    return (

        loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox>{error}</MessageBox>) : (
            <>
                <Navbar />
                <div className="placeorder-container">
                    <div className="order-rows">
                        <div className="order-title">
                            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
                        </div>
                        <div className="order-title">
                            <h2>Your Order</h2>
                        </div>
                    </div>
                    <div className='main-content'>
                        <div className="order-container">
                            <div className="order-row">
                                <div className="order-header">
                                    <div class="os-header-heading">
                                        <FontAwesomeIcon className='order-header-icon' icon={faCheck} />
                                        <h2 class="os-header-title">
                                            Successful order
                                        </h2>
                                        <span class="os-order-number">
                                            Order code : {orderId}
                                        </span>
                                        <span class="os-description">
                                            Thanking you for your purchase!
                                        </span>
                                    </div>
                                </div>
                                <div className="order-body">
                                    <div className="order-shipping">
                                        <h2 className="order-shipping_title">Order information </h2>
                                        <h4>Delivery information - {order.isPaid ? (<> Paid at {order.deliveredAt} </>) : (
                                            <>Not Delivery</>
                                        )}</h4>
                                        <p className="order-shipping_info">Full Name : {order.shippingAddress.fullname}</p>
                                        <p className="order-shipping_info">Email : {order.shippingAddress.email}</p>
                                        <p className="order-shipping_info">Phone Number : {order.shippingAddress.phone}</p>
                                        <p className="order-shipping_info">Address : {order.shippingAddress.address}</p>
                                        <p className="order-shipping_info">City : {order.shippingAddress.city}</p>
                                        <p className="order-shipping_info">PostalCode : {order.shippingAddress.postalCode}</p>
                                        <p className="order-shipping_info">Country : {order.shippingAddress.country}</p>
                                        <h4>PayPal</h4>
                                        <p className="order-shipping_info">{order.paymentMethod}                                       {order.isPaid ? (<span> Paid at {order.paidAt} </span>) : (
                                            <>* You will pay after delivery</>
                                        )}</p>
                                    </div>
                                    <div className="order-summary-content">
                                        <h2 className='order-summary'>Order Summary</h2>
                                        <div className="order-summary-info">
                                            <h4>Items</h4>
                                            <span>${order.itemsPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="order-summary-info">
                                            <h4>Shipping</h4>
                                            <span>${order.shippingPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="order-summary-info">
                                            <h4>Tax</h4>
                                            <span>${order.taxPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="order-summary-info">
                                            <h3>Total</h3>
                                            <span>${order.totalPrice.toFixed(2)}</span>
                                        </div>
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
                                        Subtotal ( {order.orderItems.reduce((a, c) => a + c.quantity, 0)}{' '} items )
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="cart-row">
                            {/*  */}
                            <div class="cart-cols">
                                <div className='cart-cards'>

                                    <table class="checkout table" >
                                        {order.orderItems.map((item) => (
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
                        <button className='bthz' type="button" onClick={() => placeOrderHandler()}>Continue Shopping</button>
                        <p class="step-footer-info">
                            Need help ? <Link to='/'> Contact Us</Link>
                        </p>
                    </div>
                </div>
                <Footer />
            </>
        )

    )
}

export default OrderDetails