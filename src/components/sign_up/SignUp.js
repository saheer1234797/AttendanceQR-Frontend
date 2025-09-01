

import './SignUp.css';
import axios from 'axios';
import EndPoint from '../../apis/Endpoint';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    rollNumber: "",
    batch: ""  
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userRole = localStorage.getItem("role");
    if (state.role !== "student" && state.role !== "teacher" && state.role !== "admin") {
      toast.error("Please select a valid role.");
      return;
    }

    if (userRole !== "admin") {
      toast.error("Only Admin can create new accounts. Please login as Admin.");
      return;
    }

    setIsLoading(true);

  
    const payload = {
      name: state.name,
      email: state.email,
      password: state.password,
      role: state.role,
      rollNumber: state.rollNumber,
      class: state.batch  
    };

    try {
      const response = await axios.post(EndPoint.SignUp, payload, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setTimeout(() => {
       navigate("/home");
      }, 1500);

      setState({
        name: "",
        email: "",
        password: "",
        role: "",
        rollNumber: "",
        batch: ""
      });
    } catch (err) {
      console.error("Signup Error: ", err);
      toast.error("Oops! Something went wrong..");
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-page">
        <div className="signup-container">
          {/* Left Section */}
          <div className="signup-left">
            <h2>Welcome to QR Attend</h2>
            <p>Manage your attendance system with modern QR technology.</p>
          </div>

          {/* Right Section (Form) */}
          <div className="signup-right">
            <div className="signup-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group pt-3">
                  <label>Full Name</label>
                  <input
                    value={state.name}
                    onChange={(e) => setState({ ...state, name: e.target.value })}
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={state.role}
                    onChange={(e) => setState({ ...state, role: e.target.value })}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    value={state.password}
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Roll Number</label>
                  <input
                    value={state.rollNumber}
                    onChange={(e) => setState({ ...state, rollNumber: e.target.value })}
                    type="text"
                    placeholder="Enter your Roll Number"
                  />
                </div>

                {/* Batch selection */}
                <div className="form-group">
                  <label>Batch</label>
                  <select
                    value={state.batch}
                    onChange={(e) => setState({ ...state, batch: e.target.value })}
                  >
                    <option value="">Select Batch</option>
                    <option value="12th">12th</option>
                    <option value="13th">13th</option>
                    <option value="14th">14th</option>
                  </select>
                </div>

                <button type="submit" className="btn" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;


