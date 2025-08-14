

import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { data, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import EndPoint from '../../apis/Endpoint';

function Login() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (state.email && state.password) {
        let response = await axios.post(EndPoint.SignIn, state,{
           withCredentials: true,
        });
     
        toast.success(response.data.message);
console.log("Login response:", response);

              localStorage.setItem('token', response.data.token);
              console.log("Saved Token:  ", localStorage.getItem("token"));//only chack for token 
      // localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem("role", response.data.data.role);  // this lin ei add fro the chanck   only 
      
        // navigate("/tdashboard");
         const role = response.data.data.role;
      if (role === 'student') {
        navigate('/Home');  // student dashboard route
      } else if (role === 'teacher') {
        navigate('/Home');  // teacher dashboard route
      } else {
       
        navigate('/Home');  
      }
        
        
        
        
        
        
        // replace with your route
      } else {
        toast.error("Please enter email and password");
      }
    } catch (Error) {
      console.log(Error);
      
      toast.error(Error?.response?.data?.error || "Oops! Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-container d-flex justify-content-center align-items-center">
        <div className="auth-card p-4 bg-white shadow rounded">
          <h3 className="text-center mb-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="logo" className="qr-logo" /> QR Attend
          </h3>
          <h5 className="text-center text-muted mb-4">Welcome Back!</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-decoration-none small">Forgot Password?</Link>
            </div>

            <div className="d-grid mt-2">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/SignUp">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
