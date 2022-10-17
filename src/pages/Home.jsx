import React from 'react'
import Banners from '../components/Banners'
import CategoryMain from '../components/CategoryMain'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Poster from '../components/Poster'
import ProductsHome from '../components/ProductsHome'
import Slider from '../components/Slider'
import ProductsCategory from '../components/ProductsCategory'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Slider />
            <Poster />
            <Banners />
            <ProductsHome />
            <CategoryMain />
            <ProductsCategory />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home