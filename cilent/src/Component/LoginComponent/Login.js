import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { setUser, setToken, decodeToken, AuthContext } from '../../Context/AuthContext';
import '../LoginComponent/LoginStyle.css';

const Login = () => {
  const [values, setValues] = useState({
    
    name: '',
    password: ''
  });
  const navigate = useNavigate();
  
  
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', values);
      if (res.data.Status === "Success") {
        //sau khi đăng nhập thành công sẽ setToken (lưu token)
        console.log(res.data.Token);
        setToken(res.data.Token);
        //giả mã để lấy thông tin user
        const user = decodeToken(res.data.Token);
        //lưu thông tin user
        setUser(user);
        navigate('/home');
      } else {
        alert(res.data.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='login-container'>
    <div className='body-login'>
      <div className='wrapper'>
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Nhập email và mật khẩu của bạn</p>
          <div className="input-box">
            <input type="text" 
              id="username" 
              name="username"
              placeholder='Username' required 
            onChange={e => setValues({...values, name: e.target.value})}/>
            
            <FaUser className='icon' />
          </div>


          <div className="input-box">
            <input type="password"
              id="password" 
              name="password"
               placeholder='Password' required
            onChange={e => setValues({...values, password: e.target.value})} />
            <FaLock className='icon' />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="/">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">Login</button>


          <div className="register-link">
            <p>Don't have an account ? <a href="/register">Register</a></p>
          </div>
        </form>
        <div className="back-to-home-link">
          <FaArrowLeft className="icon" />
          <a href="/">Back To Home</a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
