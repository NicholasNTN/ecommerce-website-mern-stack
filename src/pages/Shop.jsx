import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import ProductsShop from '../components/ProductsShop'
import '../styles/shop.css'

function Shop() 
{
  return (
    <div>
      <Navbar />
      <div className="s-row">
        <div className="s-col">
          <ProductsShop />
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Shop