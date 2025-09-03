

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import EndPoint from "../../apis/Endpoint";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  //  Form Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    //sabhi fields ko touched kar do taaki error message dikhe
    setTouched({
      email: true,
      password: true,
    });

    // agar field khali hain to submit mat karo
    if (!state.email || !state.password) {
      return;
    }

    try {
      const response = await axios.post(EndPoint.SignIn, state, {
        withCredentials: true,
      });

      toast.success(response.data.message);
      console.log("Login response:", response);

      // Save Token
      localStorage.setItem("token", response.data.token);
      console.log("Saved Token:", localStorage.getItem("token"));

      // Save User Info
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("role", response.data.data.role);

      // Redirect based on role
      const role = response.data.data.role;
      if (role === "student") {
        navigate("/Home");
      } else if (role === "teacher") {
        navigate("/Home");
      } else {
        navigate("/Home");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error?.response?.data?.error || "Oops! Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="auth-container d-flex justify-content-center align-items-center">
        <div className="auth-card p-4 bg-white shadow rounded">
          {/* Logo & Heading */}
          <h3 className="text-center mb-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
              alt="logo"
              className="qr-logo"
            />
            QR Attend
          </h3>
          <h5 className="text-center text-muted mb-4">Welcome Back!</h5>

   
          <form onSubmit={handleSubmit}>
         
            <div className="mb-3">
             
                  <label className="form-label">Email<span style={{color:"red"}}>*</span>
          </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                onBlur={() => setTouched({ ...touched, email: true })}
              />
              {touched.email && !state.email && (
                <small style={{ color: "red" }}>Email is required</small>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-2">
            <label className="form-label">Password <span style={{color:"red"}}>*</span>
            </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                onBlur={() => setTouched({ ...touched, password: true })}
              />
              {touched.password && !state.password && (
                <small style={{ color: "red" }}>Password is required</small>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-end mb-3">
              <Link
                to="/forgotpassword"
                className="text-decoration-none small"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="d-grid mt-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center mt-3">
              Don't have an account? <Link to="/SignUp">Sign Up</Link>
            </p>

            {/* Back Button */}
          
              <Link to="/home"> 
              
              
              
           
             
          
            <button  
              type="button"
              className="btn btn-outline-primary mb-3">      ⬅ Back</button>
               
               </Link>
            
          
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
