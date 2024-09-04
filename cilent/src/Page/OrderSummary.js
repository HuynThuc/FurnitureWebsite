import React, { useContext} from 'react';
import { CartContext } from '../Context/CartContext';

const OrderSummary = ({ }) => {
    const { cartItems, total, handleRemoveItem, incrementQuantity, decrementQuantity, calculateTotal } = useContext(CartContext);

   

    return (
        <div className=" p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between border-b border-gray-200 py-2">
                        <div className="flex items-center space-x-4">
                            <img src={`/images/${item.anh}`} alt={item.name} className="w-16 h-16 object-cover" />
                            <div>
                                <p className="text-gray-800 font-medium p-1">{item.ten_sanpham}</p>
                                <p className="text-gray-600 font-medium p-1">Quantity: {item.quantity}</p>
                                <p className="text-gray-800 font-medium p-1">Giá: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                       
                    </div>
                    
                ))}
            </div>
            <div className="mt-4 flex justify-between font-semibold text-lg">
                <span>Tổng cộng:</span>
                <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
