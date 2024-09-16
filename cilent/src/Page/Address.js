import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import AddressPopup from '../Component/AddressComponent/AddressPopup';
import AuthContext from '../Context/AuthContext';

const Address = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { user } = useContext(AuthContext);

  const handleAddNewAddress = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    setShowPopup(false);
    fetchAddresses();  // Đóng popup khi lưu địa chỉ thành công
  };

  



// Hàm useEffect sẽ chạy khi component được render và khi giá trị của `user` thay đổi
useEffect(() => {
  fetchAddresses(); // Gọi hàm fetchAddresses để lấy danh sách địa chỉ khi component được render hoặc khi user thay đổi
}, [user]);

// Hàm fetchAddresses dùng để lấy danh sách địa chỉ từ server
const fetchAddresses = async () => {
  try {
    // Gửi một yêu cầu GET đến server để lấy danh sách địa chỉ của người dùng có `user.id`
    const response = await axios.get(`http://localhost:3001/api/address/${user.id}`);
    
    // Cập nhật danh sách địa chỉ với dữ liệu nhận được từ server
    setAddresses(response.data);
  } catch (error) {
    // Nếu có lỗi trong quá trình lấy dữ liệu, sẽ in lỗi ra console
    console.error('Error fetching addresses:', error);
  }
};

// Hàm onDelete dùng để xóa một địa chỉ
const onDelete = async (id) => {
  // Hiển thị hộp thoại xác nhận xóa
  const confirmDelete = window.confirm("Bạn có muốn xóa không?");
  
  // Nếu người dùng chọn "OK" để xác nhận xóa
  if (confirmDelete) {
    try {
      // Gửi một yêu cầu DELETE đến server để xóa địa chỉ với `id` được cung cấp
      const response = await axios.delete(`http://localhost:3001/deleteAddress/${id}`);
      
      // Nếu server trả về mã trạng thái 200 (thành công), gọi lại hàm fetchAddresses để làm mới danh sách địa chỉ
      if (response.status === 200) {
        fetchAddresses();
      }
    } catch (error) {
      // Nếu có lỗi trong quá trình xóa, sẽ in lỗi ra console
      console.error("Lỗi khi xóa địa chỉ:", error);
    }
  }
};

  const onEdit = (id) => {
    // Xử lý sự kiện sửa địa chỉ
    console.log('Edit address with ID:', id);
    // Bạn có thể thực hiện điều hướng đến trang sửa địa chỉ hoặc mở popup chỉnh sửa
  };

  return (
    <div className="address-board p-4">
      <div className="board bg-white rounded-lg shadow-md">
        <div className="board-title flex justify-between items-center border-b border-gray-300 p-4">
          <span className="text-xl font-semibold">Sổ địa chỉ</span>
          <div className="board-btn">
            <button
              onClick={handleAddNewAddress}
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <i className="fa fa-plus mr-2"></i> Thêm địa chỉ mới
            </button>
          </div>
        </div>
        <div className="board-content p-4">
        <div className="space-y-4">
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có địa chỉ nào.</p>
      ) : (
        addresses.map((address) => (
          <div key={address.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{address.name} - {address.phone}</div>
              <div className="text-sm text-gray-600">
                {address.detail_address} {address.ward}, {address.district}, {address.city}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(address.id)}
                className="text-blue-500 hover:text-blue-600 flex items-center"
                title="Sửa địa chỉ này"
              >
                <i className="fa fa-edit mr-1"></i> Sửa
              </button>
              <button
                onClick={() => onDelete(address.id)}
                className="text-blue-500 hover:text-blue-600 flex items-center"
                title="Sửa địa chỉ này"
              >
                <i className="fa fa-remove mr-1"></i> Xóa
              </button>
            </div>
          </div>
        ))
      )}
    </div>
          
        </div>
      </div>
      {showPopup && (
        <AddressPopup showPopup={showPopup} onClose={handleClosePopup} onSubmit={handleSubmit} fetchAddresses={fetchAddresses}  />
      )}
    </div>
  );
};

export default Address;
