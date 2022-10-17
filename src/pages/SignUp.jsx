import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Register from '../components/Register'

const SignUp = () => {
    return (
        <div>
            <Navbar />
            <Register />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default SignUp