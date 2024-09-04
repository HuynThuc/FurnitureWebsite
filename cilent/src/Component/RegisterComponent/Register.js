import React, { useState }from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import '../RegisterComponent/RegisterStyle.css'; // Đảm bảo đường dẫn đúng đến file CSS cho phần giao diện đăng ký
import { FaUser, FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa"; // Bổ sung icon cho phần giao diện đăng ký

const Register = () => {

  const [values, setValues] = useState({
    name: '',
    email:'',
    password:'',
  })
  const navigate = useNavigate()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/signup', values)
    .then(res => {
      if(res.data.Status === "Success"){
        navigate('/login')
      }
      else {
      alert("Error")
      }
  
    })
    .then(err => console.log(err))
  }
  return (
    <div className='register-container'>
      <div className='body-register'>
        <div className='wrapper'>
          <form action="" onSubmit={handleSubmit} >
            <h1>Register</h1>
            <div className="input-box">
              <input type="email" placeholder='Email' required 
              onChange={e => setValues({...values, email: e.target.value})} />
              <FaLock className='icon' />
            </div>
            <div className="input-box">
            
              <input type="text" placeholder='Họ và Tên' required 
              onChange={e => setValues({...values, name: e.target.value})}/>
              <FaUser className='icon' />
            </div>
             <div className="input-box">
              <input type="password" placeholder='Mật khẩu' required 
              onChange={e => setValues({...values, password: e.target.value})} />
              <FaLock className='icon' />
            </div>


            <button type="submit">Register</button>

            <div className="login-link">
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
          </form>
          <div className="back-to-home-link">
            <FaArrowLeft className="icon" />
            <a href="/">Back To Home</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
