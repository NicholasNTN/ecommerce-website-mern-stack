import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { Store } from '../Store'
import '../styles/payment.css'

const Payment = () => {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'Cash'
    );

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }

    return (
        <>
            <Navbar />
            <div className="payment-container">
                <div className="payment-row">
                    <div className="payment-col">
                        <CheckoutSteps step1 step2 step3></CheckoutSteps>
                    </div>
                    <div className="payment-row">
                        <div className="payment-col">
                            <form onSubmit={submitHandler}>
                                <h2>Payment Method</h2>
                                <p className='info'>Choose your payment method.</p>
                                <div class="section-content">
                                    <div class="content-box">
                                        <div class="radio-wrapper content-box-row">
                                            <label class="radio-label" for="payment_method_id_196565">
                                                <div class="radio-input payment-method-checkbox">
                                                    <input type="radio" value='Cash' checked={paymentMethodName === 'Cash'} className='radio' name="" id="cash" onChange={(e) => setPaymentMethod(e.target.value)} />
                                                </div>
                                                <div class="radio-content-input">
                                                    <img src="/images/paypal/images.png" alt="" className="main-img" />
                                                    <div>
                                                        <span class="radio-label-primary">payments upon delivery (COD)</span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div class="radio-wrapper content-box-row">
                                            <label class="radio-label" for="payment_method_id_196567">
                                                <div class="radio-input payment-method-checkbox">
                                                    <input type="radio" value='Paypal' checked={paymentMethodName === 'Paypal'} className='radio' name="" id="paypal" onChange={(e) => setPaymentMethod(e.target.value)} />
                                                </div>
                                                <div class="radio-content-input">
                                                    <img src="/images/paypal/pngtree-payment-icon-png-image_1842637.jpg" alt="" className="main-img" />
                                                    <div>
                                                        <span class="radio-label-primary">Ability to transfer money across the bank</span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className='bthz bth-secondary' type="submit">Continue</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Newsletter />
            <Footer />
        </>
    )
}

export default Payment