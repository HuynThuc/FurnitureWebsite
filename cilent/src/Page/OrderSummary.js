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
                                <p className="text-gray-800 font-medium">{item.ten_sanpham}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="text-gray-800 font-medium">${total.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-between font-semibold text-lg">
                <span>Tổng cộng:</span>
                <span>{total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
