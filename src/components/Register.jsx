import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/signin.css';
import { useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const Register = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
        toast.success('Your account creation successfully.', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
            // navigate('/login')
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div className='signin-container'>
            <div className="signin-row">
                <div className="signin-col">
                    <form onSubmit={submitHandler}>
                        <h2>SIGN UP</h2>
                        <p className='info'>Hello, welcome to your account.</p>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail*</label>
                            <input type="email" id='email' required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password*</label>
                            <input type="password" id='password' required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="c_password">Confirm password*</label>
                            <input type="password" id='c_password' required onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button className='bth bth-secondary' type="submit">Sign Up</button>
                        </div>
                        <div className="form-group">
                            <Link to={`/login?redirect=${redirect}`}> you have an account ? </Link>log in to shopping.
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register