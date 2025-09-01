
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EndPoint from "../../apis/Endpoint";
import "./ForgotPassword.css"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(EndPoint.ForgotPassword, { email });
      toast.success(res.data.message || "Password reset link sent to your email!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return <>
    <div className="forgot-container">
      <ToastContainer />
      <div className="forgot-card">
        <h3 className="text-center bi bi-envelope-fill icon icon"> Forgot Password</h3>
        <p className="text-center">
          Enter your registered email and we'll send you a reset link.
        </p>

        <form onSubmit={handleForgot}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default ForgotPassword;
