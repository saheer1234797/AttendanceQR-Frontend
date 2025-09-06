// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Endpoint from "../../apis/Endpoint";
// import Header from "../header/Header";
// import Footer from "../footer/Footer";
// import {  Link } from 'react-router-dom';

// import "./Profile.css";

// function Sprofile() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
      
//       try {
//         const res = await axios.get(Endpoint.Profile, {
         
//           withCredentials: true, // session cookie
//         });
//         setStudent(res.data.user);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading profile...</div>;
//   }

//   if (!student) {
//     return <div className="no-profile">No profile found. Please login.</div>;
//   }

//   return <>
//   <Header/>
//     <div className="student-container">
//       <div className="student-card">
//         <div className="profile-header">
//           <img
//             src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=007bff&color=fff`}
//             alt="avatar"
//             className="profile-avatar"
//           />
//           <h2>{student.name}</h2>
//           <p className="role">{student.role}</p>
//         </div>

//         <div className="student-info">
//           <div className="info-row">
//             <span className="label">Roll Number:</span>
//             <span>{student.rollNumber}</span>
//           </div>
//           <div className="info-row">
//             <span className="label">Email:</span>
//             <span>{student.email}</span>
//           </div>
//        <Link to="/Home">
//           <button className="mt-5 btn btn-primary w-100">Home page</button></Link>
         
//         </div>
//       </div>
//     </div>
//     <Footer/>
// </>
// }

// export default Sprofile;






import React, { useState, useEffect } from "react";
import axios from "axios";
import Endpoint from "../../apis/Endpoint";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import "./Profile.css";
import api from "../../apis/api";

function Sprofile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(Endpoint.Profile, {
          withCredentials: true,
        });
        setStudent(res.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Login के बाद save किया था
//       const res = await axios.get(Endpoint.Profile, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setStudent(res.data.user);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProfile();
// }, []);


  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!student) {
    return <div className="no-profile">No profile found. Please login.</div>;
  }

  return (
    <>
      <Header />
      <div className="student-container">
        <div className="student-card">
          {/* 🔹 Back Button */}
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back
          </button>

          {/* 🔹 Profile Header */}
          <div className="profile-header">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                student.name
              )}&background=007bff&color=fff`}
              alt="avatar"
              className="profile-avatar"
            />
            <h2>{student.name}</h2>
            <p className="role">{student.role}</p>
          </div>

          {/* 🔹 Info Section */}
          <div className="student-info">
            <div className="info-row">
              <span className="label bi bi-person-badge-fill"> Roll Number:</span>
              <span>{student.rollNumber}</span>
            </div>
            <div className="info-row">
              <span className="label bi bi-envelope-fill"> Email:</span>
              <span>{student.email}</span>
            </div>
          </div>

          {/* 🔹 Home Button */}
          <Link to="/Home">
            <button className="home-btn  bi bi-house-fill">  Home Page</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Sprofile;
