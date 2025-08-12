

// import React, { useState, useEffect } from "react";
// import { Link, Navigate } from "react-router-dom";
// import "./Tdashboard.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Endpoint from "../../apis/Endpoint";

// const StudentDashboard = () => {
//   const  navigate=useNavigate();
//   const [filterMonth, setFilterMonth] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [userName, setUserName] = useState("Student");

//   // लॉगिन के बाद user info localStorage में होगा, उसे यहां से पढ़ो
//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const userObj = JSON.parse(userData);
//       setUserName(userObj.name || "Student");
//     }
//   }, []);
// ///
//     const handleLogout=async()=>{
  
      
//         try{
//             await axios.post(Endpoint.Logout,{},{withCredentials:true});
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             toast.success('Logout sueccesful');
//             navigate('/Home');

//         }catch(error){
//             console.log(error);
//             toast.error("Faild to logout");
            

//         }
//     };








//   ///
//   const attendanceData = [
//     { date: "2025-08-07", class: "13th", record: "present" },
//     { date: "2025-08-06", class: "13th", record: "present" },
//     { date: "2025-07-29", class: "14th", record: "present" },
//     { date: "2025-07-20", class: "14th", record: "absent" },
//     { date: "2025-08-07", class: "13th", record: "absent" },
//     { date: "2025-08-06", class: "13th", record: "present" },
//     { date: "2025-07-29", class: "13th", record: "present" },
//     { date: "2025-07-20", class: "12th", record: "absent" },
//     { date: "2025-08-07", class: "12th", record: "present" },
//     { date: "2025-08-06", class: "12th", record: "absent" },
//     { date: "2025-07-29", class: "12th", record: "present" },
//   ];

//   const filteredData = attendanceData.filter((record) => {
//     return (
//       (!filterMonth || record.date.startsWith(filterMonth)) &&
//       (!filterStatus || record.record === filterStatus)
//     );
//   });

//   return (
//     <div className="tdashboard-container">
//       <aside className="sidebar">
//         <h2>Student Panel</h2>
//         <ul>
//           <li><Link className="nav-link" to="/Home">Home</Link></li>
//           <li><Link className="nav-link" to="/Sprofile">Profile</Link></li>
//           <li><Link className="nav-link" to="/student/attendance">Attendance</Link></li>
//           <li><Link className="nav-link" to="/GenerateQR">Generate QR</Link></li>
//           <li onClick={handleLogout}>Logout
//             </li>
//         </ul>   
//       </aside>

//       <main className="dashboard-main">
//         <h1 className="mb-3"> Welcome {userName}</h1>

//         <div className="cards">
//           <div className="card">Total Attendance: <strong>843</strong></div>
//           <div className="card">Present Days: <strong>765</strong></div>
//           <div className="card">Absent Days: <strong>78</strong></div>
//           <div className="card">Current Month: <strong>August</strong></div>
//         </div>

//         <div className="filters">
//           <select onChange={(e) => setFilterMonth(e.target.value)}>
//             <option value="">All Months</option>
//             <option value="2025-08">August 2025</option>
//             <option value="2025-07">July 2025</option>
//           </select>

//           <select onChange={(e) => setFilterStatus(e.target.value)}>
//             <option value="">Records</option>
//             <option value="present">Present</option>
//             <option value="absent">Absent</option>
//           </select>

//           <button className="scan-btn">🎟️ Generate QR</button>
//         </div>

//         <div className="table-wrapper">
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Class</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.date}</td>
//                   <td>{record.class}</td>
//                   <td>{record.record}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;









// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Tdashboard.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Endpoint from "../../apis/Endpoint";

// const StudentDashboard = () => {
//   const navigate = useNavigate();

//   const [filterMonth, setFilterMonth] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [userName, setUserName] = useState("Student");
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     // User info from localStorage
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const userObj = JSON.parse(userData);
//       setUserName(userObj.name || "Student");
//     }

//     // Fetch attendance data for this student
//     fetchAttendance();
//   }, []);

//   const fetchAttendance = async () => {
//     try {
//       const response = await axios.get(Endpoint.StudentAttendance, {
//         withCredentials: true, // if using cookies for auth
//       });

//       if (response.status === 200) {
//         // Assume API returns array of attendance objects
//         setAttendanceData(response.data.attendance);
//       } else {
//         toast.error("Failed to fetch attendance data");
//       }
//     } catch (error) {
//       console.error("Attendance fetch error:", error);
//       toast.error("Error fetching attendance data");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(Endpoint.Logout, {}, { withCredentials: true });
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       toast.success("Logout successful");
//       navigate("/Home");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to logout");
//     }
//   };

//   // Filter attendance based on filters
//   const filteredData = attendanceData.filter((record) => {
//     return (
//       (!filterMonth || record.date.startsWith(filterMonth)) &&
//       (!filterStatus || record.record === filterStatus)
//     );
//   });

//   return (
//     <div className="tdashboard-container">
//       <aside className="sidebar">
//         <h2>Student Panel</h2>
//         <ul>
//           <li>
//             <Link className="nav-link" to="/Home">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link className="nav-link" to="/Sprofile">
//               Profile
//             </Link>
//           </li>
//           <li>
//             <Link className="nav-link" to="/student/attendance">
//               Attendance
//             </Link>
//           </li>
//           <li>
//             <Link className="nav-link" to="/GenerateQR">
//               Generate QR
//             </Link>
//           </li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </aside>

//       <main className="dashboard-main">
//         <h1 className="mb-3"> Welcome {userName}</h1>

//         <div className="cards">
//           <div className="card">
//             Total Attendance: <strong>{attendanceData.length}</strong>
//           </div>
//           <div className="card">
//             Present Days:{" "}
//             <strong>
//               {attendanceData.filter((rec) => rec.record === "present").length}
//             </strong>
//           </div>
//           <div className="card">
//             Absent Days:{" "}
//             <strong>
//               {attendanceData.filter((rec) => rec.record === "absent").length}
//             </strong>
//           </div>
//           <div className="card">
//             Current Month: <strong>August</strong>
//           </div>
//         </div>

//         <div className="filters">
//           <select onChange={(e) => setFilterMonth(e.target.value)}>
//             <option value="">All Months</option>
//             <option value="2025-08">August 2025</option>
//             <option value="2025-07">July 2025</option>
//           </select>

//           <select onChange={(e) => setFilterStatus(e.target.value)}>
//             <option value="">Records</option>
//             <option value="present">Present</option>
//             <option value="absent">Absent</option>
//           </select>

//           <button className="scan-btn">🎟️ Generate QR</button>
//         </div>

//         <div className="table-wrapper">
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Class</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.date}</td>
//                   <td>{record.class}</td>
//                   <td>{record.record}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;







import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Tdashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import Endpoint from "../../apis/Endpoint";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [userName, setUserName] = useState("Student");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // User info from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUserName(userObj.name || "Student");
    }

    // Fetch attendance data for this student
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(Endpoint.StudentAttendance, {
        withCredentials: true, // if using cookies for auth
      });

      if (response.status === 200) {
        // API response data is in response.data.data
        setAttendanceData(response.data.data || []);
      } else {
        toast.error("Failed to fetch attendance data");
      }
    } catch (error) {
      console.error("Attendance fetch error:", error);
      toast.error("Error fetching attendance data");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(Endpoint.Logout, {}, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successful");
      navigate("/Home");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  // Filter attendance based on filters
  const filteredData = attendanceData.filter((record) => {
    const date = record.scannedAt || record.createdAt || "";
    return (
      (!filterMonth || date.startsWith(filterMonth)) &&
      (!filterStatus || record.status === filterStatus)
    );
  });

  return (
    <div className="tdashboard-container">
      <aside className="sidebar">
        <h2>Student Panel</h2>
        <ul>
          <li>
            <Link className="nav-link" to="/Home">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/Sprofile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/student/attendance">
              Attendance
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/GenerateQR">
              Generate QR
            </Link>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1 className="mb-3"> Welcome {userName}</h1>

        <div className="cards">
          <div className="card">
            Total Attendance: <strong>{attendanceData.length}</strong>
          </div>
          <div className="card">
            Present Days:{" "}
            <strong>
              {attendanceData.filter((rec) => rec.status === "present").length}
            </strong>
          </div>
          <div className="card">
            Absent Days:{" "}
            <strong>
              {attendanceData.filter((rec) => rec.status === "absent").length}
            </strong>
          </div>
          <div className="card">
            Current Month: <strong>August</strong>
          </div>
        </div>

        <div className="filters">
          <select onChange={(e) => setFilterMonth(e.target.value)}>
            <option value="">All Months</option>
            <option value="2025-08">August 2025</option>
            <option value="2025-07">July 2025</option>
          </select>

          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Records</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <button className="scan-btn">🎟️ Generate QR</button>
        </div>

        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => (
                <tr key={index}>
                  {/* Date ko readable banane ke liye sirf YYYY-MM-DD dikhaya */}
                  <td>{(record.scannedAt || record.createdAt || "").slice(0, 10)}</td>

                  {/* Class data API me missing hai, isliye N/A dikha rahe */}
                  <td>{"N/A"}</td>

                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;



