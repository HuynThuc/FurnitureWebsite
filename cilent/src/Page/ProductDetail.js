import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { CartContext } from '../Context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(AuthContext);
    const { getCartItems} = useContext(CartContext)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/product/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product detail:', error);
            });
    }, [id]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        if (!user) {
            navigate('/login');
        } else {
            axios.post('http://localhost:3001/cart/add', {
                id_product: id,
                user_id: user.id,
                quantity: quantity
            })
            .then(response => {
                console.log('Added to cart successfully:', response.data);
                getCartItems();
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });
        }
    };

    if (!product) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="max-w-[1200px] py-36 mx-auto px-4 ">
                <div className="flex flex-wrap -mx-4 items-center">
                    <div className="w-full md:w-1/2 px-4 ">
                        <img
                            alt="Product"
                            className="w-full h-[600px] rounded-lg shadow-md "
                            id="mainImage"
                            src={`/images/${product.anh}`}
                        />
                       
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">
                            {product.ten_sanpham}
                        </h2>
                    
                      
                        <div className="flex items-center mb-4">
                            {/* Example star rating */}
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-6 h-6 ${index < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-600">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>
                        <p className="text-gray-700 mb-6">
                            {parse(product.mo_ta)}
                        </p>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Giá:
                            </h3>
                            <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">
                                {product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                            {product.oldPrice && (
                                <span className="text-gray-500 line-through">
                                    {product.oldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                            )}
                        </div>
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                htmlFor="quantity"
                            >
                                Số lượng:
                            </label>
                            <div className="flex items-center">
                                <button
                                    className="w-8 h-8 bg-gray-200 rounded-l-md border border-gray-300 text-gray-700"
                                    onClick={decreaseQuantity}
                                >
                                    -
                                </button>
                                <input
                                    className="w-12 h-8 text-center rounded-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={quantity}
                                    id="quantity"
                                    min="1"
                                    name="quantity"
                                    type="number"
                                    readOnly
                                />
                                <button
                                    className="w-8 h-8 bg-gray-200 rounded-r-md border border-gray-300 text-gray-700"
                                    onClick={increaseQuantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex space-x-4 mb-6">
                            <button
                                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={handleAddToCart}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Add to Cart
                            </button>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
