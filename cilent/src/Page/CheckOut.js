import React, { useState, useContext, useEffect } from 'react';
import AddressPopup from '../Component/AddressComponent/AddressPopup';
import OrderSummary from './OrderSummary';
import AuthContext from '../Context/AuthContext';
import axios from 'axios'; // Đảm bảo rằng bạn đã cài đặt axios

const Checkout = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('1002252882'); // Mặc định là COD
    const { user } = useContext(AuthContext);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        // Hàm lấy dữ liệu địa chỉ từ API
        const fetchAddresses = async () => {
          try {
            // Thay đổi URL API này thành URL phù hợp của bạn
            const response = await axios.get(`http://localhost:3001/api/address/${user.id}`);
            setAddresses(response.data);
          } catch (error) {
            console.error('Error fetching addresses:', error);
          }
        };
    
        fetchAddresses();
    }, [user]);

    const handleSelectChange = (e) => {
        setSelectedAddress(e.target.value);
        if (e.target.value === '0') {
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleSubmitPopup = () => {
        // Implement any logic you need when the popup form is submitted
        setShowPopup(false);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            return alert('Vui lòng chọn địa chỉ giao hàng.');
        }

        try {
            // Gửi yêu cầu tạo đơn hàng đến server
            await axios.post('http://localhost:3001/createOrder', {
                userId: user.id,
                addressId: selectedAddress,
               
            });

            // Xử lý sau khi đơn hàng được tạo thành công
            alert('Đơn hàng đã được tạo thành công.');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Có lỗi xảy ra khi đặt hàng.');
        }
    };

    return (
        <div className="checkout-container max-w-[1236px] mx-auto p-6">
            <div className="flex gap-4 pt-5">
                {/* Phần bên trái */}
                <div className="left-section flex-1 pr-4 ">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Thông tin giao hàng</h2>

                    <div className="section-content border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                       
                        <div className="logged-in-customer-information">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                                    <img src="//www.gravatar.com/avatar/194edef3f0381b63a9a2001fe3b6797a.jpg?s=100&amp;d=blank" alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-gray-800">
                                  
                                    <a href="/account/logout?return_url=%2Fcheckouts%2F8d15bc8be1b04727850a1287ec06d27e%3Fstep%3D1" className="text-blue-500 hover:underline">Đăng xuất</a>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <select
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        id="stored_addresses"
                                        onChange={handleSelectChange}
                                        value={selectedAddress}
                                    >
                                        <option value="" disabled>Chọn địa chỉ</option>
                                        <option value="0">Thêm địa chỉ</option>
                                        {addresses.map((address) => (
                                            <option key={address.id} value={address.id}>
                                                {address.name}, {address.phone}, {address.detail_address}, {address.ward}, {address.district}, {address.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Họ và tên"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Số điện thoại"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 mt-6 text-gray-800">Chọn phương thức thanh toán</h2>
                    <div className="section-content border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                        <div className="space-y-4">
                            <div className="radio-wrapper flex items-center">
                                <input
                                    type="radio"
                                    id="payment_method_id_1002252882"
                                    className="mr-4"
                                    name="payment_method_id"
                                    value="1002252882"
                                    checked={paymentMethod === '1002252882'}
                                    onChange={() => setPaymentMethod('1002252882')}
                                />
                                <label className="flex items-center space-x-4" htmlFor="payment_method_id_1002252882">
                                    <img
                                        className="w-12 h-12"
                                        src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6"
                                        alt="COD"
                                    />
                                    <span className="text-gray-800 font-medium">Thanh toán tiền mặt khi giao hàng (COD)</span>
                                </label>
                            </div>

                            <div className="radio-wrapper flex items-center">
                                <input
                                    type="radio"
                                    id="payment_method_id_1002965974"
                                    className="mr-4"
                                    name="payment_method_id"
                                    value="1002965974"
                                    checked={paymentMethod === '1002965974'}
                                    onChange={() => setPaymentMethod('1002965974')}
                                />
                                <label className="flex items-center space-x-4" htmlFor="payment_method_id_1002965974">
                                    <img
                                        className="w-12 h-12"
                                        src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6"
                                        alt="MoMo"
                                    />
                                    <span className="text-gray-800 font-medium">Ví MoMo</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phần bên phải */}
                <div className="right-section flex-1 pl-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Tóm tắt đơn hàng</h2>
                    <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                        <OrderSummary />
                    </div>
                </div>
            </div>

            {/* Hiển thị AddressPopup nếu showPopup là true */}
            <AddressPopup showPopup={showPopup} onClose={handleClosePopup} onSubmit={handleSubmitPopup} />

            {/* Nút Đặt hàng */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                >
                    Đặt hàng
                </button>
            </div>
        </div>
    );
};

export default Checkout;
