
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/header/Header.js";
// import Dashboard from "./components/Dashboard";
// import Teachers from "./components/Teachers";
// import Students from "./components/Students";
// import Attendance from "./components/Attendance.js";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar.js";
// import Register from "./components/Registration.js";
import Login from "./components/Sign_in/Login.js";
import Home from "./components/home/Home.js";
import SignUp from "./components/sign_up/SignUp.js";
import Tdashboard from "./components/tdashboard/Tdashboard.js";
import StudentDashboard from "./components/tdashboard/StudentDashboard.js";
import Sprofile from "./components/profile/Profile.js";
import TQRScanner from "./components/scanner/TQRScanner.js";
import GenerateQR from "./components/genrqteqr/GenrateQr.js";
// import EndPoint from "./apis/Endpoint.js";

import "./App.css";

function App() {
  return (
 
    <Router>


   
      {/* <div className="app-container">   */}
        
      {/* <Sidebar /> */}
        {/* <div className="main-content"> */}
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/home' element={<Home/>}/>
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Tdashboard" element={<Tdashboard />} />
             <Route path="/StudentDashboard" element={<StudentDashboard />} />
             <Route path="/Sprofile" element={<Sprofile/>}/>
              <Route path="/TQRScanner" element={<TQRScanner/>}/>
              <Route path="/GenerateQR" element={<GenerateQR/>}/>

            {/* <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
            <Route path="/attendance" element={<Attendance />} /> */}

          </Routes>
        {/* </div>
      </div> */}
    </Router>
  );
}

export default App;
