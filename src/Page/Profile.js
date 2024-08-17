import React, {useContext} from 'react';
import AuthContext from '../Context/AuthContext';



const Profile = () => {

  const { user} = useContext(AuthContext);
  return (
        <div className="md:w-3/4 p-4">
          <p className="text-lg font-semibold mb-4">Thông tin tài khoản</p>
          <form action="/account" method="post" className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">Email</label>
              <input
                type="text"
                id="email"
                name="customer[email]"
                className="p-2 border border-gray-300 rounded-md"
                value="sieunhangao0985@gmail.com"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last_name" className="font-medium">Họ và tên đệm</label>
              <input
                type="text"
                id="last_name"
                name="customer[last_name]"
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Huỳnh"
                defaultValue={user?.name || ''}  // Sử dụng thông tin từ user
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="first_name" className="font-medium">Tên</label>
              <input
                type="text"
                id="first_name"
                name="customer[first_name]"
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Thức"
                defaultValue="Thức"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Giới tính</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="radio0"
                  name="customer[gender]"
                  value="0"
                  className="mr-2"
                />
                <label htmlFor="radio0">Nữ</label>
                <input
                  type="radio"
                  id="radio1"
                  name="customer[gender]"
                  value="1"
                  className="ml-4 mr-2"
                />
                <label htmlFor="radio1">Nam</label>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthday" className="font-medium">Ngày sinh</label>
              <input
                type="text"
                id="birthday"
                name="customer[birthday]"
                className="p-2 border border-gray-300 rounded-md"
                placeholder="mm/dd/yyyy"
              />
            </div>
            <div className="mt-4">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Cập nhật
              </button>
            </div>
          </form>
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
            <p>Bạn chưa đặt mua sản phẩm.</p>
          </div>
        </div>
    
  );
}

export default Profile;
