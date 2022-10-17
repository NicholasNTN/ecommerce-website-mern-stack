import React, { useContext, useEffect, useReducer } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import '../styles/account.css'
import { Store } from '../Store';
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getError } from '../utils'
import Newsletter from '../components/Newsletter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}


const Account = () => {

    const { state } = useContext(Store);
    const { userInfo } = state;

    const navigate = useNavigate();

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/orders/mine`,

                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [userInfo]);

    return (
        loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox>{error}</MessageBox>) : (
            <>
                <Navbar />
                <div class="account-container">
                    <h2>My Account</h2>
                    <div class="account-row">
                        <div class="col-sm-8">
                            <h3 class="title">Order history</h3>
                            {/* <p>you haven't set any orders.</p> */}

                            {/* orderhistor */}
                            <div className="tables">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice.toFixed(2)}</td>
                                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                                <td>
                                                    <button type="button" variant="light" onClick={() => { navigate(`/order/${order._id}`); }}>
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* end history */}

                        </div>
                        <div class="col-sm-4 sidebar">
                            <div class="block block-address">
                                <div class="block-title">
                                    <h3>Your Information</h3>
                                </div>
                                <div class="block-content">
                                    <h5>{userInfo.name} - {userInfo.email}</h5>
                                    {/* <h5>{userInfo.email}</h5> */}
                                    <div class="form-g">
                                        <label for="first_name" class="login">Address<sup>*</sup></label> :
                                        <span> 4/14 Paster</span>
                                    </div>
                                    <div class="form-g">
                                        <label for="first_name" class="login">City<sup>*</sup></label> :
                                        <span> Thu Duc</span>
                                    </div>
                                    <div class="form-g">
                                        <label for="first_name" class="login">PostalCode / Zip Code<sup>*</sup></label> :
                                        <span> 672800</span>
                                    </div>
                                    <div class="form-g">
                                        <label for="first_name" class="login">Contry<sup>*</sup></label> :
                                        <span> Vietnam</span>
                                    </div>
                                    <div class="form-g">
                                        <label for="first_name" class="login">Phone Number<sup>*</sup></label> :
                                        <span> 397069129</span>
                                    </div>
                                    <div className="account-col">
                                        <Link to='/profile'>User profile <FontAwesomeIcon icon={faChevronRight} /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Newsletter />
                <Footer />
            </>
        )
    )
}

export default Account