
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Endpoint from "../../apis/Endpoint";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import "./Header.css";

function Header() {
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); 
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.name || "";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(Endpoint.Logout, {}, { withCredentials: true });
      localStorage.clear();
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          {/* Logo */}
          <Link className="logo" to={isLoggedIn ? "/tdashboard" : "/"}>
            QR<span>Attend</span>
          </Link>

          {/* Display logged-in user info */}
          {/* {isLoggedIn && (
            <div className="user-info" style={{ color: "white", marginRight: "1rem" }}>
              Welcome, <strong>{userName}</strong> ({userRole})
            </div>
          )}   */}

          {/* Hamburger Menu */}
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">
            &#9776;
          </label>

          {/* Menu Items */}
          <ul className="menu">
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                {/* <li>
                  <Link to="/SignUp">Register</Link>
                </li> */}
              </>
            )}

            {isLoggedIn && (
              <>
              {/* add some thing  */}
            {userRole === "student" && (
                  <li>
                    <Link to="/studentdashboard">Dashboard</Link>
                  </li>
                )}



                 {userRole === "teacher" && (
                   <li>
                  <Link to="/tdashboard">Dashboard</Link>
                </li>
                )}


{/* end some thing */}

                {/* <li>
                  <Link to="/tdashboard">Dashboard</Link>
                </li> */}

                {userRole === "student" && (
                  <li>
                    <Link to="/TQRScanner">Scan</Link>
                  </li>
                )}

                {userRole === "teacher" && (
                  <li>
                    <Link to="/GenerateQR">QR Generate</Link>
                  </li>
                )}

                {userRole === "admin" && (
                  <>
                    <li>
                      <Link to="/Tdashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/SignUp">Create Account</Link>
                    </li>
                     <li>
                      <Link to="/UploadStudents">Bulk Create Account</Link>
                    </li>
                  </>
                )}

                <li>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Logout  
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
