// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';


import Login from './Component/LoginComponent/Login';
import Register from './Component/RegisterComponent/Register';
import AboutUs from './routes/AboutUs';
import Showroom from './routes/Showroom';
import Profile from './Page/Profile';


import Header from './Component/HeaderComponent/Header';
import Footer from './Component/FooterComponent/Footer';

import { AuthProvider } from './Context/AuthContext';
import Cart from './Page/Cart';
import DashboardPage from './routes/Admin2/DashboardPage';
import Home from './Page/Home';
import { CartProvider } from './Context/CartContext';
import CategoryProduct from './Page/CategoryProduct';
import ProductDetail from './Page/ProductDetail';
import ProfileTab from './Component/ProfileTabs/ProfileTab';
import Address from './Page/Address';
import CheckOut from './Page/CheckOut';
import RequireAuth from './routes/RequireAuth'; // Import RequireAuth


// Layout component for wrapping header and footer
const Layout = () => {
  const location = useLocation();
  const showHeaderFooter = !['/login', '/register', '/admin-2', '/check-out',].includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Outlet />
      {showHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about-us" element={<AboutUs />} /> 
              <Route path="/show-room" element={<Showroom />} />
              <Route path="/check-out" element={<CheckOut/>}/>
              <Route path="/account" element={<ProfileTab />}>
              
              <Route index element={<Profile />} />  {/* Đặt Profile làm trang mặc định */}
              <Route path="address" element={<Address />} /> 
              </Route>
              

              
              <Route 
                path="/admin-2" 
                element={
                  <RequireAuth requiredRole={1}>
                    <DashboardPage />
                  </RequireAuth>
                } 
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/productdetail/:id" element={<ProductDetail/>} />

              {/* Add the routes for CategoryProduct */}
              <Route path="/category/kitchen" element={<CategoryProduct categoryId={7} title="Tủ Bếp MOHO 2024" />} />
              <Route path="/category/table" element={<CategoryProduct categoryId={2} title="Bàn MOHO 2024" />} />
              {/* Add more routes as needed */}
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
