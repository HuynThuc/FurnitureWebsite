  import React, { useState, useContext, useEffect} from 'react';
  import logo from '../../images/logo-moho.webp';
  import axios from 'axios'
  import '../HeaderComponent/HeaderStyle.css';
  import { FaAngleDown, FaAngleUp } from "react-icons/fa";
  import { FiShoppingBag } from "react-icons/fi";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faTimes, faUser, faAngleDown } from '@fortawesome/free-solid-svg-icons';
  import Login from '../LoginComponent/Login';
  import AuthContext from '../../Context/AuthContext';
  import { useNavigate, Link } from 'react-router-dom';

  const Header = () => {
    const [isFirstDropdownOpen, setIsFirstDropdownOpen] = useState(false);
    const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
    const [isThirdDropdownOpen, setIsThirdDropdownOpen] = useState(false);
    const [isFourthDropdownOpen, setIsFourthDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [loginOpen, setLoginOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [category, setCategories] = useState([]);
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


     // Lấy loại sản phẩm từ API
     useEffect(() => {
      axios.get('http://localhost:3001/categories') // Endpoint để lấy danh sách loại sản phẩm
          .then(response => {
              setCategories(response.data); // Gán dữ liệu vào state
          })
          .catch(error => {
              console.error('Error fetching categories:', error);
          });
  }, []);

    return (
      <div class="flex flex-wrap place-items-center ">
        
        <section className="relative mx-auto">
      <nav className="flex justify-between bg-gray-900 text-white w-[99.2vw]">
        <div className="px-40  py-6 flex w-full items-center">
          <a
            className="text-3xl font-bold font-heading"
            href="/"
          >
            Logo Here.
          </a>
          <ul className="md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li>
              <a
                className="hover:text-gray-200"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="relative font-sans z-[1001] " onMouseEnter={handleMouseEnter(setIsThirdDropdownOpen)} onMouseLeave={handleMouseLeave(setIsThirdDropdownOpen)}>
              <a
                className="hover:text-gray-200 cursor-pointer"
                href="/product"
              >
                Sản phẩm
              </a>
              <div className="absolute inline-block align-middle ml-1 mt-[3px]">
                  {isThirdDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                <div className={`absolute max-w-[300px] min-w-[160px] bg-white z-10 p-3 border border-gray-200 shadow-md ${isThirdDropdownOpen ? 'show' : 'hidden'}`}>
                    {category.map(category => (
                        <Link key={category.id_loaisanpham}  className="block w-full text-black no-underline border-b border-gray-300 pb-2 mb-2 last:border-none last:mb-0"
                        to={`/category/${category.id_loaisanpham}`}>
                            {category.ten_loaisp}
                        </Link>
                    ))}
                </div>
            </li>
            <li>
              <a
                className="hover:text-gray-200"
                href="#"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                className="hover:text-gray-200"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
          <div className="hidden xl:flex items-center space-x-5">
          <button
              className="flex items-center hover:text-gray-200"
              onClick={handleUserClick}
            >
              <svg
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <a
              className="flex items-center hover:text-gray-200"
              href="/cart"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
              
            </a>
           
          </div>
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
              <div  className="absolute top-[60px] right-[205px] w-[170px] bg-white border rounded shadow-xl z-50"
>
                <div className="user-menu-container">
                  <p>Welcome, {user.name}!</p>
               

                  <ul className="user-menu-list">
                    <li className="transition-colors duration-200 block p-2 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white" onClick={() => {
                    
                    handleNavigation('/account');
                    }}>Tài khoản của bạn</li>
                    <li
                    className="transition-colors duration-200 block p-2 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white" 
                    onClick={() => handleNavigation('/account/address')}>Danh sách địa chỉ</li>
                    
                    {user.roleId === 1 && <li onClick={() => navigate('/admin-2')}>Admin</li>}
                    <li
                    className="transition-colors duration-200 block p-2 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white" 
                    onClick={handleLogout}>Đăng xuất</li>
                  </ul>
                </div>
              </div>
            </>
          )}
      </nav>
    </section>
      </div>
    );
  };

  export default Header;
