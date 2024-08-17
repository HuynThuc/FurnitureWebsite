import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products/1') // Gọi API để chỉ lấy sản phẩm
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching kitchen products:', error);
            });
    }, []);

    return (
        <div className="sales-container">
            <div className="site-animation">
                <div className="family-month">Tủ Bếp MOHO 2024</div>
            </div>
            <div className="cards-container">
                {products.map((product) => (
                    <div className="card" key={product.id}>
                        <Link to={`/kitchen-detail/${product.id}`}>
                        <img src={`/images/${product.anh}`}alt={product.ten_sanpham} className="card-image" />
                            <div className="card-content">
                                <h2 className="card-title">{product.ten_sanpham}</h2>
                                <p className="card-price">{product.gia}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
