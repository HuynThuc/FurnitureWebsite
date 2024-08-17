import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'; // Đảm bảo rằng bạn đã cài đặt axios
import AuthContext from '../../Context/AuthContext';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]); // State lưu trữ danh sách địa chỉ
  const { user } = useContext(AuthContext);

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

  const onEdit = (id) => {
    // Xử lý sự kiện sửa địa chỉ
    console.log('Edit address with ID:', id);
    // Bạn có thể thực hiện điều hướng đến trang sửa địa chỉ hoặc mở popup chỉnh sửa
  };

  return (
    <div className="space-y-4">
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có địa chỉ nào.</p>
      ) : (
        addresses.map((address) => (
          <div key={address.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{address.name} - {address.phone}</div>
              <div className="text-sm text-gray-600">
                {address.detail_address}, {address.ward}, {address.district}, {address.city}
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
                onClick={() => onEdit(address.id)}
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
  );
};

export default AddressList;
