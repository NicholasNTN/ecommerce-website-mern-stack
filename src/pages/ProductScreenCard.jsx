import React, { useContext, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../styles/productScreenCard.css'
import { Store } from '../Store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Newsletter from '../components/Newsletter';
import { toast } from 'react-toastify';
// import { products } from '../data';

const ProductScreenCard = ({ product }) => {

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState('');//default is empty

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart, wish } = state;

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1; //if existItem than quantity + 1 in cart if not than 1

        //this you can put but you don’t have to
        const { data } = await axios.get(`/api/products/slug/${product.slug}`);
        if (data.countInStock < quantity) {
            toast.warning('Sorry. Product is out of stock!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
        navigate('/cart')
    };

    const addToWishHandler = () => {
        const existItem = wish.wishItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity : 1;

        if (existItem) {
            toast.warning('you have already added product to your wish list!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }
        ctxDispatch({
            type: "WISH_ADD_ITEM",
            payload: { ...product, quantity },
        });
        // navigate('/wish')
        toast.success('Add to wish successfully !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    return (
        <>
            <Navbar />
            <div className="screen-container">
                <div className="screen-row">
                    <div className="screen-col">
                        <div className="screen-images">
                            <div className="screen-top">
                                <TransformWrapper>
                                    <TransformComponent>
                                        <img src={selectedImage || product.image} alt={product.title} />
                                    </TransformComponent>
                                </TransformWrapper>
                                {/* <img src={selectedImage || product.image} alt={product.title} /> */}
                            </div>
                            <div className="screen-bottom">
                                <img src={product.image} onClick={() => setSelectedImage(`${product.image}`)} alt={product.title} />
                                <img src={product.image1} onClick={() => setSelectedImage(`${product.image1}`)} alt={product.title} />
                                <img src={product.image2} onClick={() => setSelectedImage(`${product.image2}`)} alt={product.title} />
                                <img src={product.image3} onClick={() => setSelectedImage(`${product.image3}`)} alt={product.title} />
                            </div>
                        </div>
                    </div>
                    <div className="screen-col">
                        <div className="first-div div">
                            <h2 className="title">{product.title}</h2>
                            <p className="category">{product.category}</p>
                        </div>
                        <div className="second-div div">
                            <span className="price">Price: ${product.price}</span>
                            <div className="quantity">Quantity: 1</div>
                        </div>
                        <div className="third-div div">
                            <div className="desc">{product.desc}</div>
                        </div>
                        <div className="fourth-div div">
                            <button className="card" onClick={addToCartHandler}>Add to card</button>
                            <button className="wish" onClick={addToWishHandler}>Add to wish</button>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </>
    )
}

export default ProductScreenCard