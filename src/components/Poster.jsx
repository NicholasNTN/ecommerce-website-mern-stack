import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/poster.css'

const Poster = () => {
    return (
        <div className="poster-container">
            <h2>Discount to day</h2>
            <div className="poster-row">
                <img src="/images/poster/banner_lena.jpg" alt="" />
                <div className="poster-content">
                    <h1>SAFE OFF 50%</h1>
                    <p>with code "VOGUE-Shop"</p>
                </div>
            </div>
        </div>
    )
}

export default Poster