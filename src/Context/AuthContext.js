import React, { createContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const setToken = (token) => {
    localStorage.setItem('Token', token);
}

export const fetchToken = () => {
    return localStorage.getItem('Token');
}

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

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = fetchToken();
        if (token) {
            const decoded = decodeToken(token);
            setUser(decoded);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function RequireToken({ children }) {
    let auth = fetchToken();
    let location = useLocation();

    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}



export default AuthContext;
