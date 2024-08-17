// src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify'; // Import toast từ react-toastify

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);


  
  // Fetch cart items from backend when the component mounts
  const getCartItems = async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:3001/api/cart/${user.id}`);
        setCartItems(response.data.items);
        setTotal(response.data.total || 0);
        localStorage.setItem('cartItems', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  // Fetch cart items from backend when the component mounts
  useEffect(() => {
    getCartItems(); // Gọi hàm để lấy giỏ hàng khi component mount
  }, [user]);





//Xóa items
const handleRemoveItem = async (cart_item_id) => {
  {
    const response = await axios.delete(`http://localhost:3001/cart/${cart_item_id}`);
    if (response.status === 200){
      getCartItems();
    }
  }
  
};


const decrementQuantity = async (cart_item_id) => {
  const item = cartItems.find(item => item.cart_item_id === cart_item_id);

  // Kiểm tra nếu số lượng bằng 1 thì cảnh báo và không thực hiện gì thêm
  if (item.quantity === 1) {
    return;
  }
  if (item && item.quantity > 1) {
    try {
      // Gửi yêu cầu PUT để giảm số lượng sản phẩm trong giỏ hàng
      const response = await axios.put(`http://localhost:3001/decreasequantity/${cart_item_id}`, {
        quantity: 1
      });

      if (response.status === 200) {
        getCartItems(); // Cập nhật lại giỏ hàng sau khi giảm số lượng thành công
      }
    } catch (error) {
      console.error('Error decrementing cart item quantity:', error);
    }
  }
};



//Thêm quantity
const incrementQuantity = async (cart_item_id) => {
  const item = cartItems.find(item => item.cart_item_id === cart_item_id);

 
  if (item && item.quantity >= 1) {
    try {
      // Gửi yêu cầu PUT để giảm số lượng sản phẩm trong giỏ hàng
      const response = await axios.put(`http://localhost:3001/increasequantity/${cart_item_id}`, {
        quantity: 1
      });

      if (response.status === 200) {
        getCartItems(); // Cập nhật lại giỏ hàng sau khi giảm số lượng thành công
      }
    } catch (error) {
      console.error('Error decrementing cart item quantity:', error);
    }
  }
};






  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        handleRemoveItem,
        decrementQuantity,
        incrementQuantity


      
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
