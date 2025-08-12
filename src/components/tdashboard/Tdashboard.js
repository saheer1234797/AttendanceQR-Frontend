

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Tdashboard.css";

// const Tdashboard = () => {
//   const [searchEmail, setSearchEmail] = useState("");
//   const [filterMonth, setFilterMonth] = useState("");
//   const [filterClass, setFilterClass] = useState("");
//   const [filterstatus, setfilterstatus] = useState("");

//   const attendanceData = [
//     { name: "Amit Sharma", email: "amit@email.com", date: "2025-08-07", class: "13th", record: "present" },
//     { name: "Pooja Verma", email: "pooja@email.com", date: "2025-08-06", class: "13th", record: "present" },
//     { name: "Ravi Kumar", email: "ravi@email.com", date: "2025-07-29", class: "14th", record: "present" },
//     { name: "Sneha Singh", email: "sneha@email.com", date: "2025-07-20", class: "14th", record: "absent" },
//     { name: "Amit Sharma", email: "amit@email.com", date: "2025-08-07", class: "13th", record: "absent" },
//     { name: "Pooja Verma", email: "pooja@email.com", date: "2025-08-06", class: "13th" },
//     { name: "Ravi Kumar", email: "ravi@email.com", date: "2025-07-29", class: "13th" },
//     { name: "Sneha Singh", email: "sneha@email.com", date: "2025-07-20", class: "12th" },
//     { name: "Amit Sharma", email: "amit@email.com", date: "2025-08-07", class: "12th" },
//     { name: "Pooja Verma", email: "pooja@email.com", date: "2025-08-06", class: "12th" },
//     { name: "Ravi Kumar", email: "ravi@email.com", date: "2025-07-29", class: "12th" },
//   ];

//   const filteredData = attendanceData.filter((record) => {
//     return (
//       (!searchEmail || record.email.includes(searchEmail)) &&
//       (!filterClass || record.class === filterClass) &&
//       (!filterMonth || record.date.startsWith(filterMonth)) &&
//       (!filterstatus || record.record === filterstatus)
//     );
//   });

//   return (
//     <div className="tdashboard-container">
//       <aside className="sidebar">
//         <h2>Teacher Panel</h2>
//         <ul>
//           <li><Link className="nav-link" to="/StudentDashboard">Home</Link></li>
        
//               <li><Link className="nav-link" to="/TQRScanner">Scan Attendance</Link></li>
//           <li>Attendance Records</li>
//           <li>Logout</li>
//         </ul>
//       </aside>

//       <main className="dashboard-main">
//         <h1>📊 Dashboard Overview</h1>

//         <div className="cards">
//           <div className="card">Total Students: <strong>100</strong></div>
//           <div className="card">Total Teachers: <strong>10</strong></div>
//           <div className="card">Total Attendance: <strong>843</strong></div>
//           <div className="card">Today: <strong>76</strong></div>
//         </div>

//         <div className="filters">
//           <input
//             type="text"
//             placeholder="Search by Email"
//             value={searchEmail}
//             onChange={(e) => setSearchEmail(e.target.value)}
//           />

//           <select onChange={(e) => setFilterClass(e.target.value)}>
//             <option value="">All Classes</option>
//             <option value="13th">Batch-13th</option>
//             <option value="14th">Batch-14th</option>
//             <option value="12th">Batch-12th</option>
//           </select>

//           <select onChange={(e) => setFilterMonth(e.target.value)}>
//             <option value="">All Months</option>
//             <option value="2025-08">August 2025</option>
//             <option value="2025-07">July 2025</option>
//           </select>

//           <select onChange={(e) => setfilterstatus(e.target.value)}>
//             <option value="">Records</option>
//             <option value="present">Present</option>
//             <option value="absent">Absent</option>
//           </select>

//           <button className="scan-btn">📷 Scan QR</button>
//         </div>

//         <div className="table-wrapper">
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Date</th>
//                 <th>Class</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.name}</td>
//                   <td>{record.email}</td>
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

// export default Tdashboard;



////it is working coded ||niche wala


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Tdashboard.css";
import Endpoint from "../../apis/Endpoint";
import { useNavigate } from "react-router-dom";

const Tdashboard = () => {
  const navigate=useNavigate();
  const [searchEmail, setSearchEmail] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterstatus, setfilterstatus] = useState("");

  const [dashboardData, setDashboardData] = useState({
    totalStudents: "Loading...",
    totalTeachers: "Loading...",
    totalAttendace: "Loading...",
    last7days: [],
    recentAttendance: [],
  });

  //// add kiya hai mane 
const[desh,setdesh]=useState({
   totalStudents: "Loading...",
    totalTeachers: "Loading...",
})
  ////

  // // 🔁 Fetch data from backend on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(Endpoint.AdminAll,desh);

        setdesh(res.data.data);
            console.log("Dashboard API Response:", res.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    };
    fetchDashboardData();
  }, []);






//////////////////new 
useEffect(() => {
  const fetchStudents = async () => {
    try {
      const res = await axios.get(Endpoint.Teacherdashbpord,dashboardData, {
        withCredentials: true,
      });
      ///
    console.log("Dashboard API Response:", res.data);
    
     
      ///

      setDashboardData((prev) => ({
      ...prev,
       recentAttendance: res.data.data,
        //




      }));
   
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };
  fetchStudents();
}, []);







const handleLogout=async()=>{
  
      
        try{
            await axios.post(Endpoint.Logout,{},{withCredentials:true});
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Logout sueccesful');
            navigate('/Home');

        }catch(error){
            console.log(error);
            toast.error("Faild to logout");
            

        }
    };




  // 📋 Filtering recent attendance
  const filteredData = dashboardData.recentAttendance?.filter((record) => {
    return (
      (!searchEmail || record.email?.includes(searchEmail)) &&
      (!filterClass || record.class === filterClass) &&
      (!filterMonth || record.date?.startsWith(filterMonth)) &&
      (!filterstatus || record.record === filterstatus)
    );
  }) || [];

  return (
    <div className="tdashboard-container">
      <aside className="sidebar">
        <h2>Teacher Panel</h2>
        <ul>
          <li><Link className="nav-link" to="/Home">Home</Link></li>
          <li><Link className="nav-link" to="/TQRScanner">Scan Attendance</Link></li>
         
          <li>

            <Link className="nav-link" to="/GenerateQR">Attendance Records (generateQR)</Link>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1 className="mb-3"> Dashboard Overview</h1>

        <div className="cards">

          {/* <div className="card">Total Students: <strong>{dashboardData.totalStudents}</strong></div>
          <div className="card">Total Teachers: <strong>{dashboardData.totalTeachers}</strong></div> */}
          
          <div className="card">Total Students: <strong>{desh.totalStudents}</strong></div>
          <div className="card">Total Teachers: <strong>{desh.totalTeachers}</strong></div>
          <div className="card">Total Attendance: <strong>{dashboardData.totalAttendace}</strong></div>
          <div className="card">Today: <strong>{dashboardData.last7days?.[0]?.count || "N/A"}</strong></div>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />

          <select onChange={(e) => setFilterClass(e.target.value)}>
            <option value="">All Classes</option>
            <option value="13th">Batch-13th</option>
            <option value="14th">Batch-14th</option>
            <option value="12th">Batch-12th</option>
          </select>

          <select onChange={(e) => setFilterMonth(e.target.value)}>
            <option value="">All Months</option>
            <option value="2025-08">August 2025</option>
            <option value="2025-07">July 2025</option>
          </select>

          <select onChange={(e) => setfilterstatus(e.target.value)}>
            <option value="">Records</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <button className="scan-btn">📷 Scan QR</button>
        </div>

        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.name || "N/A"}</td>
                    <td>{record.email || "N/A"}</td>
                    <td>{record.date || "N/A"}</td>
                    <td>{record.class || "N/A"}</td>
                    <td>{record.record || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Tdashboard;

 
