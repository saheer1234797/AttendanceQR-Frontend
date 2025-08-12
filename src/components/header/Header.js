// // import React from "react";
// // import { Link } from "react-router-dom";
// // import "./Header.css";

// // function Header() {
// //   return (
// //     <header>
// //       <nav className="navbar">
// //         <div className="container">
// //           {/* Logo */}
// //           <Link className="logo" to="/">
// //             QR<span>Attend</span>
// //           </Link>

// //           {/* Hamburger Menu */}
// //           <input type="checkbox" id="menu-toggle" />
// //           <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>

// //           {/* Menu Items */}
// //           <ul className="menu">
// //             <li>
// //               <Link to="/login">Login</Link>
// //             </li>
// //             <li>
// //               <Link to="/SignUp">Register</Link>
// //             </li>
// //             <li>
// //               <Link to="/login">Dashboard</Link>
// //             </li>
// //             <li>
// //               <Link to="/login">Scan</Link>
// //             </li>
// //           </ul>
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // }

// // export default Header;

// ///uper la working code hai 

// // import React from "react";
// // import { Link } from "react-router-dom";
// // import axios from "axios";
// // import Endpoint from "../../apis/Endpoint";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import "./Header.css";

// // function Header() {
// //   // LocalStorage से token या user check
// //   const isLoggedIn = !!localStorage.getItem("token"); // token backend से login पर save करना होगा
// // const navigate=useNavigate();
// // ///i wil add somethin 
// // const handleLogout=async()=>{
  
      
// //         try{
// //             await axios.post(Endpoint.Logout,{},{withCredentials:true});
// //             localStorage.removeItem('token');
// //             localStorage.removeItem('user');
// //             toast.success('Logout sueccesful');
// //             navigate('/login');

// //         }catch(error){
// //             console.log(error);
// //             toast.error("Faild to logout");
            

// //         }
// //     };

// //     ////end 




// //   return (
// //     <header>
// //       <nav className="navbar">
// //         <div className="container">
// //           {/* Logo */}
// //           <Link className="logo" to="/">
// //             QR<span>Attend</span>
// //           </Link>

// //           {/* Hamburger Menu */}
// //           <input type="checkbox" id="menu-toggle" />
// //           <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>

// //           {/* Menu Items */}
// //           <ul className="menu">
// //             {!isLoggedIn && (
// //               <>
// //                 <li>
// //                   <Link to="/login">Login</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/SignUp">Register</Link>
// //                 </li>
// //               </>
// //             )}

// //             <li>
// //               <Link to={isLoggedIn ? "/tdashboard" : "/login"}>Dashboard</Link>
// //             </li>
// //             <li>
// //               <Link to={isLoggedIn ? "/tdashboard" : "/login"}>Scan</Link>
// //             </li>

// //             <li >
// //               <Link    to={isLoggedIn ? "/Home" : "/login"}   onClick={handleLogout}   >Logout</Link>
// //             </li>
// //           </ul>
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // }

// // export default Header;




// ///ye testing kai liye hai bs 
// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Endpoint from "../../apis/Endpoint";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Header.css";

// function Header() {
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role"); // login पर role store करना जरूरी
//     console.log("dekho re babab     "+userRole);
    
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(Endpoint.Logout, {}, { withCredentials: true });
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("role");
//       toast.success("Logout successful");
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <header>
//       <nav className="navbar">
//         <div className="container">
//           {/* Logo */}
//           <Link className="logo" to="/">
//             QR<span>Attend</span>
//           </Link>

//           {/* Hamburger Menu */}
//           <input type="checkbox" id="menu-toggle" />
//           <label htmlFor="menu-toggle" className="menu-icon">
//             &#9776;
//           </label>

//           {/* Menu Items */}
//           <ul className="menu">
//             {!isLoggedIn && (
//               <>
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/SignUp">Register</Link>
//                 </li>
//               </>
//             )}

//             {isLoggedIn && (
//               <>
//                 <li>
//                   <Link to="/tdashboard">Dashboard</Link>
//                 </li>
//                 <li>
//                   <Link to="/tdashboard">Scan</Link>
//                 </li>

//                 {/* Only Admin sees this */}
//                 {userRole === "admin" && (
//                   <li>
//                     <Link to="/SignUp">Create Account</Link>
//                   </li>
//                 )}

//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       color: "white",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;






// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Endpoint from "../../apis/Endpoint";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Header.css";

// function Header() {
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role"); // e.g. 'student', 'teacher', 'admin'
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(Endpoint.Logout, {}, { withCredentials: true });
//       localStorage.clear(); // sab clear kar do ek baar me
//       toast.success("Logout successful");
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <header>
//       <nav className="navbar">
//         <div className="container">
//           {/* Logo */}
//           <Link className="logo" to={isLoggedIn ? "/tdashboard" : "/"}>
//             QR<span>Attend</span>
//           </Link>

//           {/* Hamburger Menu */}
//           <input type="checkbox" id="menu-toggle" />
//           <label htmlFor="menu-toggle" className="menu-icon">
//             &#9776;
//           </label>

//           {/* Menu Items */}
//           <ul className="menu">
//             {!isLoggedIn && (
//               <>
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/SignUp">Register</Link>
//                 </li>
//               </>
//             )}

//             {isLoggedIn && (
//               <>
//                 {/* Common Dashboard link for all logged in users */}
//                 <li>
//                   <Link to="/tdashboard">Dashboard</Link>
//                 </li>

//                 {/* Role-based links */}
//                 {userRole === "student" && (
//                   <li>
//                     <Link to="/scan">Scan</Link>
//                   </li>
//                 )}

//                 {userRole === "teacher" && (
//                   <li>
//                     <Link to="/qrgenerate">QR Generate</Link>
//                   </li>
//                 )}

//                 {userRole === "admin" && (
//                   <>
//                     <li>
//                       <Link to="/scan">Scan</Link>
//                     </li>
//                     <li>
//                       <Link to="/SignUp">Create Account</Link>
//                     </li>
//                   </>
//                 )}

//                 {/* Logout button */}
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       color: "white",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;




import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Endpoint from "../../apis/Endpoint";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.css";

function Header() {
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // e.g. 'student', 'teacher', 'admin'
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
          {isLoggedIn && (
            <div className="user-info" style={{ color: "white", marginRight: "1rem" }}>
              Welcome, <strong>{userName}</strong> ({userRole})
            </div>
          )}

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
                <li>
                  <Link to="/SignUp">Register</Link>
                </li>
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
                    <Link to="/qrgenerate">QR Generate</Link>
                  </li>
                )}

                {userRole === "admin" && (
                  <>
                    <li>
                      <Link to="/scan">Scan</Link>
                    </li>
                    <li>
                      <Link to="/SignUp">Create Account</Link>
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
