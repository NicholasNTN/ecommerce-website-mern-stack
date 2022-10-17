import { faCartArrowDown, faShoppingBag, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter';
import { Store } from '../Store';
import '../styles/wish.css'

function Wish({ item }) {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        wish: { wishItems },
    } = state;

    const { cart } = state;

    const removeItemHandler = (item) => {
        ctxDispatch({
            type: 'WISH_REMOVE_ITEM',
            payload: item,
        });
    }


    return (
        <>
            <Navbar />
            <div className="cart-container">
                <div className="cart-row">
                    <h2 className="cart-title">Wish cart</h2>
                </div>
                <div className="cart-rowss">
                    {/*  */}
                    <div class="cart-cols">
                        {wishItems.length === 0 ? (<h3 className='info'>wish is empty. <Link to='/shop'>Go Shopping</Link></h3>) : (
                            <div className='cart-cards'>

                                <table class="checkout table" >
                                    <thead>
                                        <tr>
                                            <th rowspan="1"></th>
                                            <th rowspan="1">Image</th>
                                            <th rowspan="1">Product</th>
                                            <th rowspan="1">Price</th>
                                            <th rowspan="1">Quantity</th>
                                            <th rowspan="1"></th>
                                        </tr>
                                    </thead>
                                    {wishItems.map((item) => (
                                        <tbody key={item._id}>
                                            <tr>
                                                <td class="text-center">
                                                    <div class="cart-remove">
                                                        <button onClick={() => removeItemHandler(item)} ><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="cart-image">
                                                        <img src={item.image} alt={item.title} />
                                                    </div>
                                                </td>
                                                <td className='td-title'>
                                                    <Link to={`/product/${item.slug}`}>{item.title}</Link>
                                                    <p className='cart-desc'>{item.desc}</p>
                                                </td>
                                                <td>
                                                    <span className='cart-price'>${item.price}</span>
                                                </td>
                                                <td>
                                                    <p>Quantity: 1</p>
                                                </td>
                                                <td>
                                                    {item.countInStock === 0 ? (<button className='cart cart-out' disabled >Out of stock</button>) : (<button>Stocking</button>)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        )}
                    </div>
                    {/*  */}

                </div>
                <div className="cart-col">

                </div>
            </div>
            <Newsletter />
            <Footer />
        </>
    )
}

export default Wish