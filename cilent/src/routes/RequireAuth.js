import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const RequireAuth = ({ children, requiredRole }) => {
    const { user } = useContext(AuthContext); // Lấy thông tin người dùng từ context
    const location = useLocation();

    

    // Kiểm tra nếu người dùng không tồn tại hoặc roleId không khớp với requiredRole
    if (!user || user.roleId !== requiredRole) {
        console.log('Không có quyền truy cập hoặc chưa đăng nhập');
        return <Navigate to="/" state={{ from: location }} />;
    }

    // Nếu hợp lệ, render các children component
    return children;
};

export default RequireAuth;
