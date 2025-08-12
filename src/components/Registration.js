
import React from 'react';   
import './Auth.css';

const Register = () => {
  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className="auth-card p-4 bg-white shadow rounded">
        <h3 className="text-center mb-3"><img src="/qr-logo.png" alt="logo" className="qr-logo" /> QR Attend</h3>
        <h5 className="text-center text-muted mb-4">Create Account</h5>
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" required>
              <option value="">Select your role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm your password" required />
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">Create Account</button>
          </div>

          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

