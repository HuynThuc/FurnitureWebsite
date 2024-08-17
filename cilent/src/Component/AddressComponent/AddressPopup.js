import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';

const AddressPopup = ({ showPopup, onClose, onSubmit }) => {
  const { user } = useContext(AuthContext); // Lấy user từ AuthContext
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    detail_address: '',
    user_id: '', // Chưa có user_id khi khởi tạo
  });

  useEffect(() => {
    // Cập nhật user_id trong formData khi user thay đổi
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_id: user?.id || '', // Đảm bảo user_id luôn cập nhật đúng
    }));
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setDistricts([]);
    setWards([]);
  
    if (cityId !== '') {
      const city = cities.find((c) => c.Id === cityId);
      setDistricts(city.Districts || []);
      setFormData((prevFormData) => ({
        ...prevFormData,
        city: city.Name, // Lưu tên thành phố
      }));
    }
  };
  
  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setWards([]);
  
    if (districtId !== '') {
      const city = cities.find((c) => c.Id === selectedCity);
      const district = city.Districts.find((d) => d.Id === districtId);
      setWards(district.Wards || []);
      setFormData((prevFormData) => ({
        ...prevFormData,
        district: district.Name, // Lưu tên quận/huyện
      }));
    }
  };
  
  const handleWardChange = (event) => {
    const wardId = event.target.value;
    const ward = wards.find((w) => w.Id === wardId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ward: ward.Name, // Lưu tên phường/xã
    }));
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log('Form Data:', formData); // Kiểm tra dữ liệu trước khi gửi
    try {
      const response = await axios.post('http://localhost:3001/address/add', formData);
      if (response.data.Status === 'Success') {
        onSubmit(); // Gọi hàm onSubmit từ props để đóng popup
      } else {
        alert('Đã có lỗi xảy ra!');
      }
    } catch (error) {
      console.error('Error saving address', error);
      alert('Đã có lỗi xảy ra khi lưu địa chỉ!');
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <i className="fa fa-times"></i>
        </button>

        <h2 className="text-xl font-semibold mb-4">Thông tin địa chỉ</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nhập tên của bạn"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn tỉnh/thành phố</label>
          <select className="w-full p-2 border border-gray-300 rounded-md" onChange={handleCityChange}>
            <option value="">Chọn tỉnh/thành phố</option>
            {cities.map((city) => (
              <option key={city.Id} value={city.Id}>
                {city.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn quận/huyện</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleDistrictChange}
            disabled={!selectedCity}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.Id} value={district.Id}>
                {district.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn phường/xã</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleWardChange}
            disabled={!selectedDistrict}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.Id} value={ward.Id}>
                {ward.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ chi tiết</label>
          <input
            type="text"
            name="detail_address"
            value={formData.detail_address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nhập địa chỉ cụ thể"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Lưu địa chỉ
        </button>
      </div>
    </div>
  );
};

export default AddressPopup;
