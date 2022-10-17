import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { Store } from '../Store';
import '../styles/quick.css'

const Quick = ({ item }) => {
    //for changle imageS
    const [selectedImage, setSelectedImage] = useState('');//default is empty

    //for close popUp
    const [style, setStyle] = useState("main-container");

    const changleStyle = () => {
        setStyle("main-containerOne");
    };

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart, wish } = state;

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1; //if existItem than quantity + 1 in cart if not than 1

        //this you can put but you don’t have to
        const { data } = await axios.get(`/api/products/slug/${item.slug}`);
        if (data.countInStock < quantity) {
            toast.warning('Sorry. Product is out of stock!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }
        ctxDispatch({
            type: "CART_ADD_ITEM",
            payload: { ...item, quantity },
        })
        toast.success('You added a product to cart!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    const addToWishHandler = () => {
        const existItem = wish.wishItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity : 1;

        if (existItem) {
            toast.success('you have already added product to your wish list!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }
        ctxDispatch({
            type: "WISH_ADD_ITEM",
            payload: { ...item, quantity },
        })
        toast.success('Add to wish successfully !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    return (
        <div className={style}>
            <div className="card-quick" key={item._id}>
                <div className="card-row">
                    <div className="card-images">
                        <div className="card-top">
                            <img src={selectedImage || item.image} alt={item.title} />
                        </div>
                        <div className="card-bottom">
                            <img src={item.image} onClick={() => setSelectedImage(`${item.image}`)} alt={item.title} />
                            <img src={item.image1} onClick={() => setSelectedImage(`${item.image1}`)} alt={item.title} />
                            <img src={item.image2} onClick={() => setSelectedImage(`${item.image2}`)} alt={item.title} />
                            <img src={item.image3} onClick={() => setSelectedImage(`${item.image3}`)} alt={item.title} />
                        </div>
                    </div>
                </div>
                <div className="card-row">
                    <button className="back" onClick={changleStyle}>Close</button>
                    <div className="first-div div">
                        <h2 className="title">{item.title}</h2>
                        <p className="category">{item.category}</p>
                    </div>
                    <div className="second-div div">
                        <span className="price">Price: ${item.price}</span>
                        <div className="quantity">Quantity: 1</div>
                    </div>
                    <div className="third-div div">
                        <div className="desc">{item.desc}</div>
                    </div>
                    <div className="fourth-div div">
                        <button className="card" onClick={addToCartHandler}>Add to card</button>
                        <button className="wish" onClick={addToWishHandler}>Add to wish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quick