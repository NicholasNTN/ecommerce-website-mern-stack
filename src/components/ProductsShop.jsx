import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
// import { products } from '../data.js'
import ProductShop from './ProductShop';
import '../styles/productsShop.css'
import ReactPaginate from 'react-paginate'
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const ProductsShop = () => {

    const [{ products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: ''
    });

    //for filter category and all products
    const [data, setData] = useState(products);

    //for category
    const [category, setCategory] = useState([]);

    //for paginate
    const [pageNumber, setPageNumber] = useState(0);

    const productPerPage = 8;

    const pagesVisited = pageNumber * productPerPage;

    const displayProducts = data.slice(pagesVisited, pagesVisited + productPerPage).map((item) => (
        <ProductShop item={item} key={item._id} />
    ))

    const pageCount = Math.ceil(data.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected); //if i click page number 2 than selected is number 2
    }


    //filter and all products
    const filterResult = (catItem) => {
        const result = products.filter((curDate) => {
            return curDate.category === catItem;
        });
        setData(result);
    }

    //for show all category 
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/category");
            setCategory(result.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

            //setProducts(result.data);
        }
        fetchData();

    }, []);

    return (
        <div className="shop-container">
            <div className="shop-row">
                <div className="shop-col">
                    <h2>Category</h2>
                    <button className='shop-bth' onClick={() => setData(products)}>All <FontAwesomeIcon icon={faChevronRight} /></button>
                    {/* show all category if exists */}
                    {category.map((item) => (
                        <button key={item._id} className="shop-bth" onClick={() => filterResult(item.title)}>{item.title} <FontAwesomeIcon icon={faChevronRight} /></button>
                    ))}
                </div>
                <div className="shop-col">
                    {/* {category.map((item) => (<h2 className='shop-bth' setCategory>{item.title}</h2>))} */}
                    <div className="shop-products">
                        {/* show product card */}
                        {displayProducts}
                    </div>
                    <div className="shop-pagination">
                        {/* phaan trang */}
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"} //class for style
                            previousLinkClassName={"previosBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            ativeClassName={"paginationActive"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsShop