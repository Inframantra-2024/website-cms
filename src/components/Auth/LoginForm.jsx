import React, { useState } from "react";
import './login.css'
import { toast } from 'react-toastify';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import AuthService from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from "../../features/auth/authSlice";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { showSnackbar } = useMuiSnackbar();
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { status, error } = useSelector((state) => state.auth);

  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const userData = localStorage.getItem('userData');
  console.log('====================================');
  console.log(userData);
  console.log('====================================');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUsername({ [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData ={
      username,
      password
    }
    try {
      const userData = await dispatch(logInUser(loginData));
      
      if(userData.payload.success === true){
        navigate('/dashboard'); // Redirect to dashboard on successful login
        showSnackbar('Login successful!', 'success');
        localStorage.setItem('isAuthenticate', userData)
      } else {
        showSnackbar('Failed to login', 'error', userData.error.message);
      }
    } catch (error) {
      showSnackbar('Failed to login', 'error', error.message);
    }
  };


  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle registration submission
    console.log("Register Data:", registerData);
  };

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
  };
  const handleShowLogin = () => {
    setShowRegisterForm(false);
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {!showRegisterForm ? (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <p onClick={handleShowRegisterForm}>Register</p>
            </form>
          </div>
        ) : (
          <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={registerData.name}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
              </select>
              <p onClick={handleShowLogin}>Login</p>
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
