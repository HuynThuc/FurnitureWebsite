import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/ProductDetail.css';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser'

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`Fetching product with id: ${id}`);
        axios.get(`http://localhost:3001/product/${id}`)
            .then(response => {
                console.log('Product detail:', response.data);
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
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card-detail-container">
            <div className="card-detail">
                <img src={`/images/${product.anh}`} alt="Product" className="card-detail-image" />
                <div className="card-detail-content">
                    <h2 className="card-detail-title">{product.ten_sanpham}</h2>
                    <p className="card-detail-price">Giá: {product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    <p className="card-detail-description">{parse(product.mo_ta)}</p>
                    <div className="quantity-control">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>THÊM VÀO GIỎ</button>
                    <button className="add-to-cart-button-2">MUA NGAY</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
