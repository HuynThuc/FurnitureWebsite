import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const RequireAuth = ({ children, requiredRole }) => {
    const { user } = useContext(AuthContext); // Lấy thông tin user từ context
    const location = useLocation();

    // Nếu user chưa được thiết lập, render trạng thái loading hoặc giữ trang
    if (user === null) {
        // Có thể render một spinner hoặc thông báo loading nếu muốn
        return <div>Loading...</div>; // Hoặc một spinner nếu có
    }

    // Kiểm tra quyền truy cập khi user đã có giá trị
    if (user.roleId !== requiredRole) {
        console.log('Không có quyền truy cập hoặc chưa đăng nhập');
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Nếu hợp lệ, render các children component
    return children;
};

export default RequireAuth;
