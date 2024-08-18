import React, { createContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();


//Hàm lưu token
export const setToken = (token) => {
    localStorage.setItem('Token', token); 
}
//Hàm lưu user
export const setUser = (user) => {
    localStorage.setItem('User', user.name); 
}

export const fetchToken = () => {
    return localStorage.getItem('Token');
}


//giải mã token
export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}


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

// export function RequireToken({ children }) {
//     let auth = fetchToken();
//     let location = useLocation();

//     if (!auth) {
//         return <Navigate to="/login" state={{ from: location }} />;
//     }
//     return children;
// }



export default AuthContext;
