import React, { useState } from 'react';
import AddressPopup from '../Component/AddressComponent/AddressPopup';
import AddressList from '../Component/AddressComponent/AddressList';

const Address = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewAddress = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    setShowPopup(false); // Đóng popup khi lưu địa chỉ thành công
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
        <AddressList />
          
        </div>
      </div>
      {showPopup && (
        <AddressPopup showPopup={showPopup} onClose={handleClosePopup} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Address;
