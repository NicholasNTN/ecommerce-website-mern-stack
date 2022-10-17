import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { Store } from '../Store';

const Navbar = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, wish, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
    };

    return (
        <div className='n-container'>
            <div className="n-rows">
                <div className="n-cols">
                    <p>Hỗ trợ 24/7 : (+86) 6 888 888</p>
                </div>
                <div className="n-cols">
                    <div className="socials">
                        <a href="https://www.facebook.com/"><img src="/images/socials/facebook.png" alt="" /></a>
                        <a href="/"><img src="/images/socials/instagram.png" alt="" /></a>
                        <a href="/"><img src="/images/socials/twitter.png" alt="" /></a>
                        <a href="/"><img src="/images/socials/youtube.png" alt="" /></a>
                    </div>
                </div>
                <div className="n-cols">
                    <ul className="n-user">
                        <div class="dropdown">
                            {
                                userInfo ? (<Link to='/account'><FontAwesomeIcon icon={faUser} />{userInfo.name}</Link>) : (<a href="/login" className='a-login'><FontAwesomeIcon icon={faUser} />LOGIN</a>)
                            }
                            {
                                userInfo ? (<div class="dropdown-content">
                                    <a href="/account">Account</a>
                                    <Link to='/login' onClick={signoutHandler}>Sign Out</Link>
                                </div>) : (<div class="dropdown-content">
                                    <a href="/signup">Sign Up</a>
                                </div>)
                            }
                        </div>
                    </ul>
                </div>
            </div>
            <div className="n-row">
                <div className="n-col">
                    <a href="/"><img src="/images/logo/logo.png" className='logo' alt="" /></a>
                </div>
                <div className="n-col">
                    <ul className="items">
                        <li className="list"><NavLink to="/" activeClassName="active">Home</NavLink></li>
                        <li className="list"><NavLink to="/shop" activeClassName="active">Shop</NavLink></li>
                        <li className="list"><NavLink to="/about" activeClassName="active">About</NavLink></li>
                        <li className="list"><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                    </ul>
                    <button className='btn'>BTN</button>
                </div>
                <div className="n-col">
                    <div className="icons">

                        <a href="/wish"><span><FontAwesomeIcon icon={faHeart} />{wish.wishItems.length > 0 && (<span className='totalItems'>{wish.wishItems.length}</span>)}</span></a>

                        <a href="/cart"><span><FontAwesomeIcon icon={faShoppingBag} />{cart.cartItems.length > 0 && (<span className='totalItems'>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>)}</span></a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar