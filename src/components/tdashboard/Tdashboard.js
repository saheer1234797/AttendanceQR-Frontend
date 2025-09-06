import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Tdashboard.css";


import Endpoint from "../../apis/Endpoint";
import api from "../../apis/api";


function Tdashboard() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.name || "";

  const [searchEmail, setSearchEmail] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterstatus, setfilterstatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // default today
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  const [dashboardData, setDashboardData] = useState({
    totalTeachers: "Loading...",
    last7days: [],
    allAttendance: [],
  });

  //  Admin Stats
  const [desh, setdesh] = useState({
    totalStudents: "Loading...",
    totalTeachers: "Loading...",
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get(Endpoint.AdminAll, desh);
        
        setdesh(res.data.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    };
    fetchDashboardData();
  }, []);

  //  Teacher Dashboard Data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(Endpoint.Teacherdashbpord, {
          withCredentials: true,
        });

        const attendanceData = res.data.data || [];

        setDashboardData((prev) => ({
          ...prev,
          allAttendance: attendanceData, // save all
        }));
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };
    fetchStudents();
  }, []);

  // 
  const handleLogout = async () => {
    try {
      await axios.post(Endpoint.Logout, {}, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successful");
      navigate("/Home");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  //  Filter Attendance Data
  const filteredData =
    dashboardData.allAttendance?.filter((record) => {
      if (!record.date) return false;

      // record.date is like "2/9/2025" → normalize to YYYY-MM-DD
      const [day, month, year] = record.date.split("/");
      const dayPadded = day.padStart(2, "0");
      const monthPadded = month.padStart(2, "0");
      const recordDateStr = `${year}-${monthPadded}-${dayPadded}`; //  2025-09-02

      if (selectedDate) {
        const selectedDateStr = selectedDate.toLocaleDateString("en-CA"); //  2025-09-03
        if (recordDateStr !== selectedDateStr) return false;
      }

      return (
        (!searchEmail || record.email?.includes(searchEmail)) &&
        (!filterClass || record.class === filterClass) &&
        (!filterstatus || record.record === filterstatus)
      );
    }) || [];

  //  Total Students Count (depends on filterClass)
  const totalStudentsCount = React.useMemo(() => {
    if (!dashboardData.allAttendance) return 0;

    if (filterClass) {
      const uniqueByEmail = new Set(
        dashboardData.allAttendance
          .filter((r) => r.class === filterClass)
          .map((r) => r.email)
      );
      return uniqueByEmail.size;
    }

    const uniqueByEmail = new Set(dashboardData.allAttendance.map((r) => r.email));
    return uniqueByEmail.size;
  }, [dashboardData.allAttendance, filterClass]);

  //  Count for selected date
  const presentCount = filteredData.filter((r) => r.record === "present").length;
  const absentCount = filteredData.filter((r) => r.record === "absent").length;

  return <>
    {/* <DashboardCharts user={user} /> */}
    <div className="tdashboard-container">
      <aside className="sidebar">
        {isLoggedIn && (
          <div
            className="user-info"
            style={{ color: "white", marginRight: "1rem" }}
          >
            <h2>{userRole} Panel</h2>
          </div>
        )}

        <ul>
          <li>
            <Link className="nav-link" to="/Home">
              Home
            </Link>
          </li>
          {isLoggedIn && userRole === "teacher" && (
        //     <li>
         
        //       <Link className="nav-link" to="/GenerateQR">
        //         Generate QR
        //       </Link>
                
            
        //      <li>
        //       <Link className="nav-link" to="/dashboardCharts">
        //          Attendance Analysis
        //       </Link>
        //       </li>
        //  </li>


        <>
    <li>
      <Link className="nav-link" to="/GenerateQR" activeClassName="active">
        Generate QR
      </Link>
    </li>
  
  </>
          )}
          <li>
            <Link className="nav-link" to="/Sprofile">
              Profile
            </Link>
          </li>
  <li>
      <Link className="nav-link" to="/dashboardCharts" activeClassName="active">
        Attendance Analysis
      </Link>
    </li>


          <li onClick={handleLogout}>Logout</li>
      
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1 className="mb-3">Dashboard Overview</h1>

        {/*  Cards */}
        <div className="cards">
          <div className="card">
            Total Students <strong>{totalStudentsCount}</strong>
          </div>
          <div className="card">
            Total Teachers <strong>{desh.totalTeachers}</strong>
          </div>
          <div className="card">
            Present{" "}
            {selectedDate
              ? `on ${selectedDate.toISOString().slice(0, 10)}`
              : ""}{" "}
            <strong>{presentCount}</strong>
          </div>
          <div className="card">
            Absent{" "}
            {selectedDate
              ? `on ${selectedDate.toISOString().slice(0, 10)}`
              : ""}{" "}
            <strong>{absentCount}</strong>
          </div>
        </div>

        {/*  Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />

          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
            <option value="">All Classes</option>
            <option value="13th">Batch-13th</option>
            <option value="14th">Batch-14th</option>
            <option value="12th">Batch-12th</option>
           
          </select>

          {/* <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
               
        //  onChange={(e) => setMonth(e.target.value)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
          dropdownMode="select"
            isClearable
           /> */}

{/* <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select Date"
  selectMode="select"
  isClearable
/> */}

<DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select Date"
  isClearable
  showMonthDropdown={false}
  showYearDropdown={false}
  scrollableYearDropdown={false}
/>





             

          <select onChange={(e) => setfilterstatus(e.target.value)}>
            <option value="">Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          

          <button className="scan-btn"> Scan QR</button>
        </div>

        {/*  Attendance Table */}
        <div className="table-wrapper">
          
          <table className="attendance-table">
           
               <thead >
              <tr >
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
  <td>    
<span
    className={`px-3 py-2 rounded text-white badge ${record.record === "present" ? "bg-success" : "bg-danger"}`}
  >
    {record.record || "N/A"}
  </span>
  </td>   
  

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </>
}

export default Tdashboard;



























// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Pie, Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// } from "chart.js";
// import "./Tdashboard.css";
// import Endpoint from "../../apis/Endpoint";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement
// );

// function Tdashboard() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const userName = user.name || "";

//   const [searchEmail, setSearchEmail] = useState("");
//   const [filterClass, setFilterClass] = useState("");
//   const [filterstatus, setfilterstatus] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date()); // default today
//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

//   const [dashboardData, setDashboardData] = useState({
//     totalTeachers: "Loading...",
//     last7days: [],
//     allAttendance: [],
//   });

//   //  Admin Stats
//   const [desh, setdesh] = useState({
//     totalStudents: "Loading...",
//     totalTeachers: "Loading...",
//   });

//   // Charts Data
//   const [studentChart, setStudentChart] = useState({ present: 0, absent: 0 });
//   const [batchChart, setBatchChart] = useState([]);
//   const [monthTrend, setMonthTrend] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res = await axios.get(Endpoint.AdminAll, desh);
//         setdesh(res.data.data);
//       } catch (err) {
//         console.error("Dashboard fetch failed", err);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   // Teacher Dashboard Data
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get(Endpoint.Teacherdashbpord, { withCredentials: true });
//         const attendanceData = res.data.data || [];
//         setDashboardData((prev) => ({ ...prev, allAttendance: attendanceData }));
//       } catch (err) {
//         console.error("Failed to fetch students", err);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Charts Data Fetch
//   useEffect(() => {
//     const fetchCharts = async () => {
//       try {
//         const studentId = user._id;
//         const batch = user.class;

//         // Student-wise Pie Chart
//         const res1 = await axios.get(`${Endpoint.StudentChart}/${studentId}?month=${month}`);
//         setStudentChart(res1.data);

//         // Batch-wise Bar Chart
//         const res2 = await axios.get(`${Endpoint.BatchChart}/${batch}?month=${month}`);
//         setBatchChart(res2.data);

//         // Month-wise Line Chart
//         const res3 = await axios.get(`${Endpoint.MonthTrend}/${studentId}?month=${month}`);
//         setMonthTrend(res3.data);
//       } catch (err) {
//         console.error("Chart fetch error", err);
//       }
//     };
//     fetchCharts();
//   }, [month, user]);

//   const handleLogout = async () => {
//     try {
//       await axios.post(Endpoint.Logout, {}, { withCredentials: true });
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       toast.success("Logout successful");
//       navigate("/Home");
//     } catch (error) {
//       toast.error("Failed to logout");
//     }
//   };

//   // Filter Attendance Data
//   const filteredData = dashboardData.allAttendance?.filter((record) => {
//     if (!record.date) return false;
//     const [day, monthD, year] = record.date.split("/");
//     const recordDateStr = `${year}-${monthD.padStart(2, "0")}-${day.padStart(2, "0")}`;
//     const selectedDateStr = selectedDate?.toLocaleDateString("en-CA");
//     if (selectedDate && recordDateStr !== selectedDateStr) return false;

//     return (
//       (!searchEmail || record.email?.includes(searchEmail)) &&
//       (!filterClass || record.class === filterClass) &&
//       (!filterstatus || record.record === filterstatus)
//     );
//   }) || [];

//   // Total Students Count
//   const totalStudentsCount = React.useMemo(() => {
//     if (!dashboardData.allAttendance) return 0;
//     const uniqueByEmail = filterClass
//       ? new Set(dashboardData.allAttendance.filter((r) => r.class === filterClass).map((r) => r.email))
//       : new Set(dashboardData.allAttendance.map((r) => r.email));
//     return uniqueByEmail.size;
//   }, [dashboardData.allAttendance, filterClass]);

//   // Present / Absent Count
//   const presentCount = filteredData.filter((r) => r.record === "present").length;
//   const absentCount = filteredData.filter((r) => r.record === "absent").length;

//   return (
//     <div className="tdashboard-container">
//       <aside className="sidebar">
//         {isLoggedIn && (
//           <div className="user-info" style={{ color: "white", marginRight: "1rem" }}>
//             <h2>{userRole} Panel</h2>
//           </div>
//         )}
//         <ul>
//           <li><Link className="nav-link" to="/Home">Home</Link></li>
//           {isLoggedIn && userRole === "teacher" && <li><Link className="nav-link" to="/GenerateQR">Generate QR</Link></li>}
//           <li><Link className="nav-link" to="/Sprofile">Profile</Link></li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </aside>

//       <main className="dashboard-main">
//         <h1 className="mb-3">Dashboard Overview</h1>

//         {/* Cards */}
//         <div className="cards">
//           <div className="card">Total Students <strong>{totalStudentsCount}</strong></div>
//           <div className="card">Total Teachers <strong>{desh.totalTeachers}</strong></div>
//           <div className="card">Present {selectedDate ? `on ${selectedDate.toISOString().slice(0, 10)}` : ""} <strong>{presentCount}</strong></div>
//           <div className="card">Absent {selectedDate ? `on ${selectedDate.toISOString().slice(0, 10)}` : ""} <strong>{absentCount}</strong></div>
//         </div>

//         {/* Filters */}
//         <div className="filters">
//           <input type="text" placeholder="Search by Email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
//           <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
//             <option value="">All Classes</option>
//             <option value="13th">Batch-13th</option>
//             <option value="14th">Batch-14th</option>
//             <option value="12th">Batch-12th</option>
//           </select>
//           <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Select Date" isClearable />
//           <select onChange={(e) => setfilterstatus(e.target.value)}>
//             <option value="">Status</option>
//             <option value="present">Present</option>
//             <option value="absent">Absent</option>
//           </select>
//           <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
//           <button className="scan-btn"> Scan QR</button>
//         </div>

//         {/* Attendance Table */}
//         <div className="table-wrapper">
//           <table className="attendance-table">
//             <thead>
//               <tr><th>Name</th><th>Email</th><th>Date</th><th>Class</th><th>Status</th></tr>
//             </thead>
//             <tbody>
//               {filteredData.length > 0 ? filteredData.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.name || "N/A"}</td>
//                   <td>{record.email || "N/A"}</td>
//                   <td>{record.date || "N/A"}</td>
//                   <td>{record.class || "N/A"}</td>
//                   <td>
//                     <span className={`px-3 py-2 rounded text-white badge ${record.record === "present" ? "bg-success" : "bg-danger"}`}>{record.record || "N/A"}</span>
//                   </td>
//                 </tr>
//               )) : <tr><td colSpan="5" style={{ textAlign: "center" }}>No records found</td></tr>}
//             </tbody>
//           </table>
//         </div>

//         {/* Charts */}
//         <div className="charts">
//           <h3>Student Attendance (Pie)</h3>
//           <Pie data={{ labels: ["Present", "Absent"], datasets: [{ data: [studentChart.present, studentChart.absent], backgroundColor: ["#4caf50", "#f44336"] }] }} />

//           <h3>Batch Attendance (Bar)</h3>
//           <Bar data={{
//             labels: batchChart.map((s) => s.name),
//             datasets: [{ label: "Days Present", data: batchChart.map((s) => s.presentDays), backgroundColor: "#2196f3" }]
//           }} />

//           <h3>Monthly Trend (Line)</h3>
//           <Line data={{
//             labels: monthTrend.map((t) => t.date),
//             datasets: [{ label: "Attendance", data: monthTrend.map((t) => t.present), fill: false, borderColor: "#4caf50" }]
//           }} />
//         </div>

//       </main>
//     </div>
//   );
// }

// export default Tdashboard;
