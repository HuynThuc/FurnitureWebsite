import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();


//Hàm lưu token
export const setToken = (token) => {
    localStorage.setItem('Token', token); 
}


export const fetchToken = () => {
    return localStorage.getItem('Token');
}


//giải mã token
// Hàm giải mã token
export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};



//useEffect Khi AuthProvider được tải lên, nó sẽ kiểm tra xem có token nào được lưu trong localStorage không (sử dụng fetchToken).
//Nếu token tồn tại, nó sẽ giải mã token (sử dụng decodeToken) để lấy thông tin người dùng và lưu thông tin đó vào state user.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        //localStorage.getItem('Token'): fetchToken sử dụng phương thức này để lấy giá trị token đã lưu dưới khóa 'Token'.
        //Nếu token đã được lưu trữ trong localStorage, nó sẽ được gán vào biến token. Nếu không, token sẽ là null hoặc undefined.
        const token = fetchToken();
        if (token) {
            const user = decodeToken(token);
            setUser(user);
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
