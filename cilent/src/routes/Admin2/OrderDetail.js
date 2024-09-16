import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const OrderPage = ({ order, onStatusUpdateSuccess, fetchOrder }) => {
    
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [statuses] = useState([
        'Đang xử lý',
        'Đang giao hàng',
        'Hoàn thành',
        'Đã hủy',
    ]);
    const [currentOrder, setCurrentOrder] = useState(order);

    const id_order = currentOrder[0].id_order;

    if (!order) return null; // Tránh lỗi khi chưa có dữ liệu đơn hàng

    const handleStatusUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/updateStatus/${id_order}`, { status: selectedStatus });
            setCurrentOrder(prevOrder => {
                // Cập nhật trạng thái trong đơn hàng
                return prevOrder.map(item =>
                    item.id_order === id_order ? { ...item, status: selectedStatus } : item
                );
            });
           
            setIsPopupVisible(false);
            fetchOrder();
            // Đóng modal sau khi cập nhật trạng thái
            if (onStatusUpdateSuccess) {
                onStatusUpdateSuccess(); // Gọi hàm để đóng modal
            }
            
            toast.success('Cập nhật thành công');
            // Xử lý thêm nếu cần, ví dụ: thông báo thành công, v.v.
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    const statusColors = {
        'Đang xử lý': 'bg-yellow-200 text-yellow-800',
        'Đang giao hàng': 'bg-blue-200 text-blue-800',
        'Hoàn thành': 'bg-green-200 text-green-800',
        'Đã hủy': 'bg-red-200 text-red-800',
    };

    return (
        <div className="container p-4">
            {/* Main Layout: Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Order Items</h2>

                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-center text-gray-700">Ảnh</th>
                                <th className="p-3 text-center text-gray-700">Tên sản phẩm</th>
                                <th className="p-3 text-center text-gray-700">Số lượng</th>
                                <th className="p-3 text-center text-gray-700">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder.map(item => (
                                <tr className="border-b" key={item.product_id}>
                                    <td className="p-3 text-center">
                                        <img src={`/images/${item.anh}`} alt={item.product_name} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="p-3 text-center">{item.ten_sanpham}</td>
                                    <td className="p-3 text-center">{item.quantity}</td>
                                    <td className="p-3 text-center">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-right mt-4">
                        <span className="text-lg font-semibold">Total: {currentOrder[0].total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                    <div className="flex flex-col mb-3">
                        <label className="text-gray-700 font-medium mb-1">Tóm tắt:</label>
                        <span className="text-gray-900 mb-1">Mã đơn hàng: {currentOrder[0].id_order}</span>
                        <span className="text-gray-900 mb-1">Tên khách hàng: {currentOrder[0].name}</span>
                        <span className="text-gray-900 mb-1">Tổng tiền: {currentOrder[0].total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-medium">Địa chỉ giao hàng:</label>
                        <span className="text-gray-900">{currentOrder[0].phone} - {currentOrder[0].detailed_address}, {currentOrder[0].ward}, {currentOrder[0].district}, {currentOrder[0].city}</span>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-medium">Phương thức thanh toán:</label>
                        <span className="text-gray-900">{currentOrder[0].paymentMethod}, {currentOrder[0].status}</span>
                    </div>
                    <div className="flex flex-col mb-2">
                        <span className="text-gray-700 font-medium">Trạng thái đơn hàng:</span>
                    </div>

                    <div className={`text-center p-2 border rounded-md ${statusColors[currentOrder[0].status]} w-32 mb-4`}>
                        <span className="text-center">{currentOrder[0].status}</span>
                    </div>
                    <button
                        onClick={() => setIsPopupVisible(true)}
                        className="w-auto bg-blue-500 text-white border border-blue-500 rounded-lg px-4 py-2 mt-2 hover:bg-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                    >
                        Cập nhật trạng thái đơn hàng
                    </button>

                    {/* Popup */}
                    {isPopupVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setIsPopupVisible(false)}
                                >
                                    <i className="fa fa-times"></i>
                                </button>
                                <h3 className="text-lg font-semibold mb-4">Chọn trạng thái</h3>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                >
                                    <option value="">Chọn trạng thái</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleStatusUpdate}
                                    className="w-full bg-blue-500 text-white border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default OrderPage;
