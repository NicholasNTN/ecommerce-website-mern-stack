import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import Footer from './Footer'
import Navbar from './Navbar'
import Newsletter from './Newsletter'
import '../styles/shipping.css'
import { useEffect } from 'react'
import CheckoutSteps from './CheckoutSteps'

const Shipping = () => {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const [fullname, setFullName] = useState(shippingAddress.fullname || '');
    const [email, setEmail] = useState(shippingAddress.email || '');
    const [phone, setPhoneNumber] = useState(shippingAddress.phone || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if (!userInfo) {
            navigate("/login?redirect=/shipping")
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullname,
                email,
                phone,
                address,
                city,
                postalCode,
                country
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullname,
                email,
                phone,
                address,
                city,
                postalCode,
                country
            })
        );
        navigate('/payment');
    };

    return (
        <>
            <Navbar />
            <div className="shipping-container">
                <div className="shipping-row">
                    <div className="shipping-cols">
                        <CheckoutSteps step1 step2></CheckoutSteps>
                    </div>
                    <div className="shipping-col">
                        <form onSubmit={submitHandler}>
                            <h2>Shipping address</h2>
                            <p className='info'>Hello, Enter your payment information.</p>
                            <div className="form-group">
                                <label htmlFor="name">Full name</label>
                                <input type="text" id='name' required value={fullname} onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail*</label>
                                <input type="email" id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number*</label>
                                <input type="tel" id='phone' required value={phone} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address*</label>
                                <input type="text" id='address' required value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id='city' required value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postalCode">PostalCode*</label>
                                <input type="text" id='p_code' required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input type="text" id='country' required value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button className='bth bth-secondary' type="submit">Continue</button>
                            </div>
                            <div className="form-group">
                                <Link to='/'>To learn more ?</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </>
    )
}

export default Shipping