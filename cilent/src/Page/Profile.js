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
                defaultValue={user?.email || ''}  // Sử dụng thông tin từ user
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last_name" className="font-medium">Họ và tên đệm</label>
              <input
                type="text"
                id="last_name"
                name="customer[last_name]"
                className="p-2 border border-gray-300 rounded-md"
               
                defaultValue={user?.name || ''}  // Sử dụng thông tin từ user
                required
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
