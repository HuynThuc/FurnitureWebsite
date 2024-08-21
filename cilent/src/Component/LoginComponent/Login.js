import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { setToken, decodeToken, AuthContext } from '../../Context/AuthContext';
import '../LoginComponent/LoginStyle.css';

const Login = ({toggleLogin}) => {
  const [values, setValues] = useState({
    
    name: '',
    password: ''
  });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  
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
        toggleLogin();
        navigate('/');
      } else {
        alert("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='login-container'>
      <h1>Welcome Back!</h1>
        <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Login</h1>
          <p>Nhập email và mật khẩu của bạn</p>
          <div className="input-with-icon">
            <input type="text" 
              id="username" 
              name="username"
              placeholder='Username' required 
            onChange={e => setValues({...values, name: e.target.value})}/>
            
            <FaUser className='icon' />
          </div>
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <input type="password"
              id="password" 
              name="password"
               placeholder='Password' required
            onChange={e => setValues({...values, password: e.target.value})} />
            <FaLock className='icon' />
          </div>
        </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="/">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p>Don't have an account ? <a href="/Signup">Sign Up</a></p>
      <div className="back-to-home-login-link">
        <FaArrowLeft className="icon" />
        <a href="/">Back To Home</a>
      </div>
      </div>
   
  );
}

export default Login;
