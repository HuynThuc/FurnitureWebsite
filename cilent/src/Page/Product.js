import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Slider from '../Component/SliderComponent/Slider';


const Product = ({title}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products') // Gọi API để chỉ lấy sản phẩm
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching kitchen products:', error);
            });
    }, []);

    return (
        <div className="text-center">
    
        <div className="text-center mb-10">
         
        </div>
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            {products.map(product => (
                <div key={product.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/productdetail/${product.id}`}>
                        <img
                            src={`/images/${product.anh}`}
                            alt={product.ten_sanpham}
                            className="h-80 w-72 object-cover rounded-t-xl"
                        />
                        <div className="px-4 py-3 w-72">
                            
                            <p className="text-lg font-bold text-black truncate block capitalize">{product.ten_sanpham}</p>
                            <div className="flex items-center">
                                <p className="text-lg font-semibold text-black my-3">{product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <div className="ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </section>
    </div>
    );
};

export default Product;
