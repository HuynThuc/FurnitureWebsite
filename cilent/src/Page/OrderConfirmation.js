// src/Page/OrderConfirmation.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Chuyển hướng về trang chủ sau 3 giây
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000); // Thay đổi thời gian nếu cần

        // Dọn dẹp timer khi component bị gỡ bỏ
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
            <img
                src="https://i.gifer.com/7efs.gif" // Thay đổi thành URL GIF của bạn
                alt="Processing Order"
                className="w-80 h-64 mx-auto" // Điều chỉnh kích thước tại đây
            />
            <h1 className="text-3xl font-bold mt-4">Đặt hàng thành công !</h1>
        </div>
    </div>
    );
};

export default OrderConfirmation;
