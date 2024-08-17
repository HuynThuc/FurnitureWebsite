import React, { useContext} from 'react';
import './CSS/CartStyle.css';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext'; // Import AuthContext to get userId
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, total, handleRemoveItem, incrementQuantity, decrementQuantity, calculateTotal } = useContext(CartContext);
  const navigate = useNavigate();


  const handleCheckout = () => {
    navigate('/check-out');
  };

  return (
   <div className="cart">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty-message">Giỏ hàng của bạn đang trống</div>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item">
                <img src={`/images/${item.anh}`} alt={item.name} className="cart-item-image" />
                <span>{item.cart_item_id}</span>
                <span>{item.ten_sanpham}</span>
                <span>Quantity: {item.quantity}</span>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.cart_item_id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.cart_item_id)}>+</button>
                </div>
                <span>Price: ${item.gia}</span>
                <button onClick={() => handleRemoveItem(item.cart_item_id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
          <span>Total: ${total.toFixed(2)}</span> {/* Hiển thị tổng giá trị */}
            <button className="checkout-button" onClick={handleCheckout}>Thanh toán</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;