import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SignIn from '../components/SignIn'
import Newsletter from '../components/Newsletter'

function Login() {
    return (
        <div>
            <Navbar />
            <SignIn />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Login