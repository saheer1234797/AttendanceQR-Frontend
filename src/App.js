
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Sign_in/Login.js";
import Home from "./components/home/Home.js";
import SignUp from "./components/sign_up/SignUp.js";
import Tdashboard from "./components/tdashboard/Tdashboard.js";
import StudentDashboard from "./components/tdashboard/StudentDashboard.js";
import Sprofile from "./components/profile/Profile.js";
import TQRScanner from "./components/scanner/TQRScanner.js";
import GenerateQR from "./components/genrqteqr/GenrateQr.js";
import ForgotPassword from "./components/password/ForgotPassword";
import ResetPassword from "./components/password/ResetPassword.js";
import UploadStudents from "./components/bulk/UploadStudents.js";
import DashboardCharts from "./components/graph/DashboardCharts.js";
  

import "./App.css";

function App() {
  return <>
 
    <Router>

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
           
       <Route path="/forgotpassword" element={<ForgotPassword/>} />  
       
         <Route path="/reset-password/:token" element={<ResetPassword/>} />
         <Route path="/UploadStudents" element={<UploadStudents />} /> 

           <Route path="/DashboardCharts" element={<DashboardCharts/>}/>
          </Routes>
      
    </Router>
  </>
}

export default App;
