import { Outlet, Link } from 'react-router-dom';
import Header from '../HeaderComponent/Header';

const ProfileTab = () => {
  return (
    <div className="max-w-[1200px] mx-auto  p-4 mt-[200px] mb-5 rounded-lg shadow-custom-dark">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-semibold">Tài khoản của bạn</h2>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/4 bg-gray-100 p-4 border-r border-gray-300">
          <h3 className="text-xl font-semibold mb-4">Tài khoản</h3>
          <ul className="list-none p-0">
            <li className="mb-2">
              <Link to="" className="text-blue-500 hover:underline">Thông tin tài khoản</Link>
            </li>
            <li className="mb-2">
              <Link to="address" className="text-blue-500 hover:underline">Danh sách địa chỉ</Link>
            </li>
            <li>
              <a href="/account/logout" className="text-blue-500 hover:underline">Đăng xuất</a>
            </li>
          </ul>
        </div>
        <div className="md:w-3/4 p-4">
          <Outlet />  {/* Render các trang con */}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
