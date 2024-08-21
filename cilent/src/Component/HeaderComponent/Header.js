import React, { useState, useContext } from 'react';
import logo from '../../images/logo-moho.webp';
import '../HeaderComponent/HeaderStyle.css';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUser, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Login from '../LoginComponent/Login';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isFirstDropdownOpen, setIsFirstDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
  const [isThirdDropdownOpen, setIsThirdDropdownOpen] = useState(false);
  const [isFourthDropdownOpen, setIsFourthDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const handleMouseEnter = (setter) => () => setter(true);
  const handleMouseLeave = (setter) => () => setter(false);


  const toggleLogin = () => {
    setLoginOpen(!loginOpen);

  }
  const handleUserClick = () => {
    if (user) {
      setUserMenuOpen(!userMenuOpen);
    } else {
      toggleLogin();
    }
  };

  const handleNavigation = (path) => {
    if (loginOpen) {
      setLoginOpen(false); // Đóng popup login nếu đang mở
    }
    if (userMenuOpen) {
      setUserMenuOpen(false); // Đóng user menu nếu đang mở
    }
    navigate(path); // Chuyển hướng đến đường dẫn được chỉ định
  };
  

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('Token');
    navigate('/');
    setUserMenuOpen(false);  // Close user menu on logout
  };

  return (
    <header className="header">
      <div className="header__title">
        Nội Thất Huỳnh Thức miễn phí giao hàng & lắp đặt tại TP.HCM, Hà Nội, Biên Hòa và một số khu vực tại Bình Dương
      </div>
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="Nội thất MOHO" />
          </a>
        </div>
        <div className="header__nav">
          <ul>
            {/* Các liên kết khác */}
            <li className="dropdown" onMouseEnter={handleMouseEnter(setIsThirdDropdownOpen)} onMouseLeave={handleMouseLeave(setIsThirdDropdownOpen)}>
              <a href="/product">Sản Phẩm</a>
              <div className="dropdown-icon">
                {isThirdDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`dropdown-content ${isThirdDropdownOpen ? 'show' : ''}`}>
                <a href="/category/kitchen">Tủ Bếp</a>
                <a href="/do-trang-tri">Đồ Trang Trí</a>
                <a href="/phong-lam-viec">Phòng Làm Việc</a>
              </div>
            </li>
            <li><a href="/bo-suu-tap-moi">Bộ Sưu Tập Mới</a></li>

            <li className="dropdown" onMouseEnter={handleMouseEnter(setIsFourthDropdownOpen)} onMouseLeave={handleMouseLeave(setIsFourthDropdownOpen)}>
              <a href="/khuyen-mai">Khuyến Mãi</a>
              <div className="dropdown-icon">
                {isFourthDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`dropdown-content ${isFourthDropdownOpen ? 'show' : ''}`}>
                <a href="/khuyen-mai">[50%] Mừng Tháng Của Mẹ</a>
              </div>
            </li>
            <li><a href="/tin-tuc">Tin Tức</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/show-room">Showroom</a></li>
          </ul>
        </div>
        <div className="search-container">
          <form className="search-box">
            <div className="wpo-search-inner">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="input-search"
                required
              />
              <button type="submit" className="btn-search">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="wrapper-account header-action">
          <button className="header-action-toggle" onClick={handleUserClick} aria-label="Đăng nhập / Đăng ký Tài khoản của tôi">
            <span className="box-icon">
              <FontAwesomeIcon icon={faUser} className="svg-ico-account" />
            </span>
            <span className="icon-box-text">
              {user ? (
                <>
                  Tài khoản của
                  <span className="txtAcount"> {user.name} <FontAwesomeIcon icon={faAngleDown} aria-hidden="true" /></span>
                </>
              ) : (
                <>
                  Đăng nhập / Đăng ký
                  <span className="txtAcount">Tài khoản của tôi<FontAwesomeIcon icon={faAngleDown} aria-hidden="true" /></span>
                </>
              )}
            </span>
          </button>
        </div>

        {loginOpen && (
          <>
            <div className="login-popover">
              <button className="close-button" onClick={toggleLogin}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <Login toggleLogin={toggleLogin}/>
            </div>
            <div className="overlay open" onClick={toggleLogin}></div>
          </>
        )}
        {userMenuOpen && (
          <>
            <div className="user-menu">
              <div className="user-menu-container">
                <p>Welcome, {user.roleId}!</p>
                <ul className="user-menu-list">
                  <li onClick={() => {
                   
                   handleNavigation('/account');
                  }}>Profile</li>
                  <li onClick={() => handleNavigation('/settings')}>Settings</li>
                  {user.roleId === 1 && <li onClick={() => navigate('/admin-2')}>Admin</li>}
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="header__cart">
          <a href="/cart">
            <FiShoppingBag />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
