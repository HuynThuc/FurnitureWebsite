import React, { useState, useContext, useEffect } from 'react';
import AddressPopup from '../Component/AddressComponent/AddressPopup';
import Address from './Address';
import OrderSummary from './OrderSummary';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Đảm bảo rằng bạn đã cài đặt axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Checkout = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Mặc định là COD
    const { user } = useContext(AuthContext);
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Hàm lấy dữ liệu địa chỉ từ API
        fetchAddresses();
    }, [user]);

    const fetchAddresses = async () => {
        try {
            // Thay đổi URL API này thành URL phù hợp của bạn
            const response = await axios.get(`http://localhost:3001/api/address/${user.id}`);
            setAddresses(response.data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };





    //Nếu giá trị là 0 thì hiện popup
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
            toast.info('Vui lòng chọn địa chỉ', {
            });
        }
        try {
            // Gửi yêu cầu tạo đơn hàng đến server
            await axios.post('http://localhost:3001/createOrder', {
                userId: user.id,
                addressId: selectedAddress,
                paymentMethod: paymentMethod,
            });
    
            // Kiểm tra phương thức thanh toán
            if (paymentMethod === 'MOMO') {
                const paymentResponse = await axios.post('http://localhost:3001/payment');
                window.location.href = paymentResponse.data.payUrl;
            } else {
                // Chuyển hướng đến trang xác nhận đơn hàng
                navigate('/order-confirmation');
            }
        } catch (error) {
            console.error('Error placing order:', error);
           
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
                                                {address.name}, {address.phone}{address.detail_address}, {address.ward}, {address.district}, {address.city}
                                            </option>
                                        ))}
                                    </select>
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
                                    id="payment_method_id_COD"
                                    className="mr-4"
                                    name="payment_method_id"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={() => setPaymentMethod('COD')}
                                />
                                <label className="flex items-center space-x-4" htmlFor="payment_method_id_COD">
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
                                    id="payment_method_id_MOMO"
                                    className="mr-4"
                                    name="payment_method_id"
                                    value="MOMO"
                                    checked={paymentMethod === 'MOMO'}
                                    onChange={() => setPaymentMethod('MOMO')}
                                />
                                <label className="flex items-center space-x-4" htmlFor="payment_method_id_MOMO">
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
            <AddressPopup showPopup={showPopup} onClose={handleClosePopup} onSubmit={handleSubmitPopup} fetchAddresses={fetchAddresses} />
            

            {/* Nút Đặt hàng */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                >
                    Đặt hàng
                </button>
            </div>
            <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar/>
        </div>
    );
};

export default Checkout;
