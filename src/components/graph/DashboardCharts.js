// // src/components/graph/DashboardCharts.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
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
// import Endpoint from "../../apis/Endpoint";
// import "./DashboardCharts.css";

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

// const DashboardCharts = ({ user }) => {
//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
//   const [batch, setBatch] = useState(""); // Batch filter
//   const [email, setEmail] = useState(""); // Student email search
//   const [loading, setLoading] = useState(true);

//   const [studentChart, setStudentChart] = useState({ present: 0, absent: 0 });
//   const [batchChart, setBatchChart] = useState([]);
//   const [monthTrend, setMonthTrend] = useState([]);

//   useEffect(() => {
//     const fetchCharts = async () => {
//       try {
//         setLoading(true);
//         const studentId = user._id;

//         // Student-wise Pie chart
//         const res1 = await axios.get(
//           `${Endpoint.Teacherdashbpord}?month=${month}&email=${email}`
//         );

//         const studentData = res1.data.data.filter(
//           (rec) =>
//             (!email || rec.email.includes(email)) &&
//             (!batch || rec.class === batch)
//         );

//         const present = studentData.filter((r) => r.record === "present").length;
//         const absent = studentData.filter((r) => r.record === "absent").length;
//         setStudentChart({ present, absent });

//         // Batch-wise Bar chart
//         const batchMap = {};
//         studentData.forEach((r) => {
//           if (!batchMap[r.class]) batchMap[r.class] = 0;
//           if (r.record === "present") batchMap[r.class] += 1;
//         });

//         const batchChartData = Object.keys(batchMap).map((b) => ({
//           name: b,
//           presentDays: batchMap[b],
//         }));
//         setBatchChart(batchChartData);

//         // Month-wise Line chart
//         const monthMap = {};
//         studentData.forEach((r) => {
//           const dateObj = new Date(r.date);
//           const day = dateObj.getDate();
//           if (!monthMap[day]) monthMap[day] = 0;
//           if (r.record === "present") monthMap[day] += 1;
//         });

//         const monthTrendData = Object.keys(monthMap)
//           .sort((a, b) => a - b)
//           .map((d) => ({ date: d, present: monthMap[d] }));

//         setMonthTrend(monthTrendData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching chart data", err);
//         setLoading(false);
//       }
//     };

//     fetchCharts();
//   }, [month, batch, email, user]);

//   if (loading) return <p>Loading charts...</p>;

//   return (
//     <div className="dashboard-charts">
//       <h2>Attendance Analysis</h2>

//       {/* Filters */}
//       <div className="chart-filters">
//         <div className="filter-item">
//           <label>Month:</label>
//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </div>

//         <div className="filter-item">
//           <label>Batch:</label>
//           <select value={batch} onChange={(e) => setBatch(e.target.value)}>
//             <option value="">All Batches</option>
//             <option value="12th">Batch-12th</option>
//             <option value="13th">Batch-13th</option>
//             <option value="14th">Batch-14th</option>
//           </select>
//         </div>

//         <div className="filter-item">
//           <label>Email:</label>
//           <input
//             type="text"
//             placeholder="Search student email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="charts-container">
//         {/* Student Pie */}
//         <div className="chart-box">
//           <h4>Student Attendance</h4>
//           <Pie
//             data={{
//               labels: ["Present", "Absent"],
//               datasets: [
//                 {
//                   data: [studentChart.present, studentChart.absent],
//                   backgroundColor: ["#4caf50", "#f44336"],
//                 },
//               ],
//             }}
//             options={{ plugins: { legend: { position: "bottom" } } }}
//           />
//         </div>

//         {/* Batch Bar */}
//         <div className="chart-box">
//           <h4>Batch Attendance</h4>
//           <Bar
//             data={{
//               labels: batchChart.map((b) => b.name),
//               datasets: [
//                 {
//                   label: "Present Days",
//                   data: batchChart.map((b) => b.presentDays),
//                   backgroundColor: "#2196f3",
//                 },
//               ],
//             }}
//             options={{ responsive: true, plugins: { legend: { display: false } } }}
//           />
//         </div>

//         {/* Month Line */}
//         <div className="chart-box">
//           <h4>Month-wise Trend</h4>
//           <Line
//             data={{
//               labels: monthTrend.map((t) => t.date),
//               datasets: [
//                 {
//                   label: "Present Students",
//                   data: monthTrend.map((t) => t.present),
//                   fill: false,
//                   borderColor: "#4caf50",
//                   tension: 0.1,
//                 },
//               ],
//             }}
//             options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCharts;





// // src/components/dashboard/AnalysisDashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
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
// import Endpoint from "../../apis/Endpoint";
// import "./DashboardCharts.css";

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

// function DashboardCharts() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   // Filters
//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
//   const [batch, setBatch] = useState("");
//   const [email, setEmail] = useState("");

//   // Data
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Charts
//   const [studentPie, setStudentPie] = useState({ present: 0, absent: 0 });
//   const [batchBar, setBatchBar] = useState([]);
//   const [monthLine, setMonthLine] = useState([]);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${Endpoint.Teacherdashbpord}?month=${month}`);
//         let data = res.data.data || [];

//         // Apply filters
//         if (batch) data = data.filter((r) => r.class === batch);
//         if (email) data = data.filter((r) => r.email.includes(email));

//         setAttendanceData(data);

//         // Student Pie chart
//         const presentCount = data.filter((r) => r.record === "present").length;
//         const absentCount = data.filter((r) => r.record === "absent").length;
//         setStudentPie({ present: presentCount, absent: absentCount });

//         // Batch Bar chart
//         const batchMap = {};
//         data.forEach((r) => {
//           if (!batchMap[r.class]) batchMap[r.class] = 0;
//           if (r.record === "present") batchMap[r.class] += 1;
//         });
//         const batchData = Object.keys(batchMap).map((b) => ({
//           name: b,
//           presentDays: batchMap[b],
//         }));
//         setBatchBar(batchData);

//         // Month Line chart
//         const dayMap = {};
//         data.forEach((r) => {
//           const dateObj = new Date(r.date);
//           const day = dateObj.getDate();
//           if (!dayMap[day]) dayMap[day] = 0;
//           if (r.record === "present") dayMap[day] += 1;
//         });
//         const monthTrendData = Object.keys(dayMap)
//           .sort((a, b) => a - b)
//           .map((d) => ({ date: d, present: dayMap[d] }));
//         setMonthLine(monthTrendData);

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching attendance", err);
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, [month, batch, email]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/Home");
//   };

//   if (!isLoggedIn) return <p>Please login first.</p>;
//   if (loading) return <p>Loading analysis...</p>;

//   return (
//     <div className="analysis-dashboard">
//       <aside className="sidebar">
//         <div className="user-info">
//           <h2>{userRole} Panel</h2>
//         </div>
//         <ul>
//           <li><Link to="/Home">Home</Link></li>
//           <li><Link to="/Tdashboard">Dashboard</Link></li>
//           <li><Link to="/Sprofile">Profile</Link></li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </aside>

//       <main className="main-content">
//         <h1>Attendance Analysis</h1>

//         {/* Filters */}
//         <div className="filters">
//           <div>
//             <label>Month:</label>
//             <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
//           </div>

//           <div>
//             <label>Batch:</label>
//             <select value={batch} onChange={(e) => setBatch(e.target.value)}>
//               <option value="">All Batches</option>
//               <option value="12th">Batch-12th</option>
//               <option value="13th">Batch-13th</option>
//               <option value="14th">Batch-14th</option>
//             </select>
//           </div>

//           <div>
//             <label>Email:</label>
//             <input
//               type="text"
//               placeholder="Search by student email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="charts-grid">
//           {/* Student Pie */}
//           <div className="chart-box">
//             <h3>Student Attendance</h3>
//             <Pie
//               data={{
//                 labels: ["Present", "Absent"],
//                 datasets: [{ data: [studentPie.present, studentPie.absent], backgroundColor: ["#4caf50", "#f44336"] }],
//               }}
//               options={{ plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>

//           {/* Batch Bar */}
//           <div className="chart-box">
//             <h3>Batch Attendance</h3>
//             <Bar
//               data={{
//                 labels: batchBar.map((b) => b.name),
//                 datasets: [{ label: "Present Days", data: batchBar.map((b) => b.presentDays), backgroundColor: "#2196f3" }],
//               }}
//               options={{ responsive: true, plugins: { legend: { display: false } } }}
//             />
//           </div>

//           {/* Month Line */}
//           <div className="chart-box">
//             <h3>Month-wise Trend</h3>
//             <Line
//               data={{
//                 labels: monthLine.map((t) => t.date),
//                 datasets: [{ label: "Present Students", data: monthLine.map((t) => t.present), fill: false, borderColor: "#4caf50", tension: 0.1 }],
//               }}
//               options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-wrapper">
//           <table>
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
//               {attendanceData.length > 0 ? attendanceData.map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.name}</td>
//                   <td>{r.email}</td>
//                   <td>{r.date}</td>
//                   <td>{r.class}</td>
//                   <td>
//                     <span className={r.record === "present" ? "badge present" : "badge absent"}>
//                       {r.record}
//                     </span>
//                   </td>
//                 </tr>
//               )) : <tr><td colSpan="5">No records found</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardCharts;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
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
// import Endpoint from "../../apis/Endpoint";
// import "./DashboardCharts.css";

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

// function DashboardCharts() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   // Filters
//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
//   const [batch, setBatch] = useState("");
//   const [email, setEmail] = useState("");

//   // Data
//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Charts
//   const [studentPie, setStudentPie] = useState({ present: 0, absent: 0 });
//   const [batchBar, setBatchBar] = useState([]);
//   const [monthLine, setMonthLine] = useState([]);

//   // Fetch data once
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${Endpoint.Teacherdashbpord}`);
//         const data = res.data.data || [];
//         setAllData(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching attendance", err);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Apply filters locally
//   useEffect(() => {
//     if (!allData.length) return;

//     const data = allData.filter((r) => {
//       if (!r.date) return false;
//       const d = new Date(r.date);
//       if (isNaN(d)) return false;
//       const recordMonth = d.toISOString().slice(0, 7);
//       if (month && recordMonth !== month) return false;
//       if (batch && r.class !== batch) return false;
//       if (email && !r.email.includes(email)) return false;
//       return true;
//     });

//     setFilteredData(data);

//     // Student Pie
//     const presentCount = data.filter((r) => r.record === "present").length;
//     const absentCount = data.filter((r) => r.record === "absent").length;
//     setStudentPie({ present: presentCount, absent: absentCount });

//     // Batch Bar
//     const batchMap = {};
//     data.forEach((r) => {
//       if (!r.class) return;
//       if (!batchMap[r.class]) batchMap[r.class] = 0;
//       if (r.record === "present") batchMap[r.class] += 1;
//     });
//     setBatchBar(
//       Object.keys(batchMap).map((b) => ({ name: b, presentDays: batchMap[b] }))
//     );

//     // Month Line
//     const dayMap = {};
//     data.forEach((r) => {
//       if (!r.date) return;
//       const dateObj = new Date(r.date);
//       if (isNaN(dateObj)) return;
//       const day = dateObj.getDate();
//       if (!dayMap[day]) dayMap[day] = 0;
//       if (r.record === "present") dayMap[day] += 1;
//     });
//     setMonthLine(
//       Object.keys(dayMap)
//         .sort((a, b) => a - b)
//         .map((d) => ({ date: d, present: dayMap[d] }))
//     );
//   }, [month, batch, email, allData]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/Home");
//   };

//   if (!isLoggedIn) return <p>Please login first.</p>;
//   if (loading) return <p>Loading data...</p>;

//   return (
//     <div className="analysis-dashboard">
//       <aside className="sidebar">
//         <div className="user-info">
//           <h2>{userRole} Panel</h2>
//         </div>
//         <ul>
//           <li><Link to="/Home">Home</Link></li>
//           <li><Link to="/Tdashboard">Dashboard</Link></li>
//           <li><Link to="/Sprofile">Profile</Link></li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </aside>

//       <main className="main-content">
//         <h1>Attendance Analysis</h1>

//         <div className="filters">
//           <div>
//             <label>Month:</label>
//             <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
//           </div>
//           <div>
//             <label>Batch:</label>
//             <select value={batch} onChange={(e) => setBatch(e.target.value)}>
//               <option value="">All Batches</option>
//               <option value="12th">Batch-12th</option>
//               <option value="13th">Batch-13th</option>
//               <option value="14th">Batch-14th</option>
//             </select>
//           </div>
//           <div>
//             <label>Email:</label>
//             <input
//               type="text"
//               placeholder="Search by email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="charts-grid">
//           <div className="chart-box">
//             <h3>Student Attendance</h3>
//             <Pie
//               data={{
//                 labels: ["Present", "Absent"],
//                 datasets: [{ data: [studentPie.present, studentPie.absent], backgroundColor: ["#4caf50", "#f44336"] }],
//               }}
//               options={{ plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>

//           <div className="chart-box">
//             <h3>Batch Attendance</h3>
//             <Bar
//               data={{
//                 labels: batchBar.map((b) => b.name),
//                 datasets: [{ label: "Present Days", data: batchBar.map((b) => b.presentDays), backgroundColor: "#2196f3" }],
//               }}
//               options={{ responsive: true, plugins: { legend: { display: false } } }}
//             />
//           </div>

//           <div className="chart-box">
//             <h3>Month-wise Trend</h3>
//             <Line
//               data={{
//                 labels: monthLine.map((t) => t.date),
//                 datasets: [{ label: "Present Students", data: monthLine.map((t) => t.present), fill: false, borderColor: "#4caf50", tension: 0.1 }],
//               }}
//               options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>
//         </div>

//         <div className="table-wrapper">
//           <table>
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
//               {filteredData.length ? (
//                 filteredData.map((r, i) => (
//                   <tr key={i}>
//                     <td>{r.name || "N/A"}</td>
//                     <td>{r.email || "N/A"}</td>
//                     <td>{r.date || "N/A"}</td>
//                     <td>{r.class || "N/A"}</td>
//                     <td>
//                       <span className={r.record === "present" ? "badge present" : "badge absent"}>
//                         {r.record || "N/A"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" style={{ textAlign: "center" }}>No records found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardCharts;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
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
// import Endpoint from "../../apis/Endpoint";
// import "./DashboardCharts.css";

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

// function DashboardCharts() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
//   const [batch, setBatch] = useState("");
//   const [email, setEmail] = useState("");

//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Charts
//   const [studentPie, setStudentPie] = useState({ present: 0, absent: 0 });
//   const [batchBar, setBatchBar] = useState([]);
//   const [monthLine, setMonthLine] = useState([]);

//   // Helper to parse API date (d/m/yyyy)
//   const parseDate = (dateStr) => {
//     if (!dateStr) return null;
//     const parts = dateStr.split("/");
//     if (parts.length !== 3) return null;
//     const [day, month, year] = parts;
//     return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
//   };

//   const formatDate = (dateStr) => {
//     const d = parseDate(dateStr);
//     if (!d) return "N/A";
//     return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth()+1).toString().padStart(2,"0")}/${d.getFullYear()}`;
//   };

//   // Fetch attendance data
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(Endpoint.Teacherdashbpord);
//         setAllData(res.data.data || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching attendance", err);
//         setLoading(false);
//       }
//     };
//     fetchAttendance();
//   }, []);

//   // Apply filters and update charts
//   useEffect(() => {
//     if (!allData.length) return;

//     const data = allData.filter((r) => {
//       const d = parseDate(r.date);
//       if (!d) return false;

//       // Month filter
//       if (month) {
//         const recordMonth = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
//         if (recordMonth !== month) return false;
//       }

//       // Batch filter
//       if (batch && r.class !== batch) return false;

//       // Email filter
//       if (email && !r.email.toLowerCase().includes(email.toLowerCase())) return false;

//       return true;
//     });

//     setFilteredData(data);

//     // Student Pie Chart (total present vs absent)
//     const presentCount = data.filter((r) => r.record === "present").length;
//     const absentCount = data.filter((r) => r.record === "absent").length;
//     setStudentPie({ present: presentCount, absent: absentCount });

//     // Batch Bar Chart
//     const batchMap = {};
//     data.forEach((r) => {
//       if (!r.class) return;
//       if (!batchMap[r.class]) batchMap[r.class] = 0;
//       if (r.record === "present") batchMap[r.class] += 1;
//     });
//     setBatchBar(Object.keys(batchMap).map((b) => ({ name: b, presentDays: batchMap[b] })));

//     // Month Line Chart (day-wise attendance)
//     const dayMap = {};
//     data.forEach((r) => {
//       const d = parseDate(r.date);
//       if (!d) return;
//       const day = d.getDate();
//       if (!dayMap[day]) dayMap[day] = 0;
//       if (r.record === "present") dayMap[day] += 1;
//     });
//     setMonthLine(
//       Object.keys(dayMap)
//         .sort((a, b) => a - b)
//         .map((d) => ({ date: d, present: dayMap[d] }))
//     );
//   }, [month, batch, email, allData]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/Home");
//   };

//   if (!isLoggedIn) return <p>Please login first.</p>;
//   if (loading) return <p>Loading attendance data...</p>;

//   return (
//     <div className="analysis-dashboard">
//       <aside className="sidebar">
//         <div className="user-info"><h2>{userRole} Panel</h2></div>
//         <ul>
//           <li><Link to="/Home">Home</Link></li>
//           <li><Link to="/Tdashboard">Dashboard</Link></li>
//           <li><Link to="/Sprofile">Profile</Link></li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </aside>

//       <main className="main-content">
//         <h1>Attendance Analysis</h1>

//         {/* Filters */}
//         <div className="filters">
//           <div>
//             <label>Month:</label>
//             <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
//           </div>
//           <div>
//             <label>Batch:</label>
//             <select value={batch} onChange={(e) => setBatch(e.target.value)}>
//               <option value="">All Batches</option>
//               <option value="12th">Batch-12th</option>
//               <option value="13th">Batch-13th</option>
//               <option value="14th">Batch-14th</option>
//             </select>
//           </div>
//           <div>
//             <label>Email:</label>
//             <input type="text" placeholder="Search by email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="charts-grid">
//           <div className="chart-box">
//             <h3>Student Attendance</h3>
//             <Pie
//               data={{
//                 labels: ["Present", "Absent"],
//                 datasets: [{ data: [studentPie.present, studentPie.absent], backgroundColor: ["#4caf50", "#f44336"] }],
//               }}
//               options={{ plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>

//           <div className="chart-box">
//             <h3>Batch Attendance</h3>
//             <Bar
//               data={{
//                 labels: batchBar.map((b) => b.name),
//                 datasets: [{ label: "Present Days", data: batchBar.map((b) => b.presentDays), backgroundColor: "#2196f3" }],
//               }}
//               options={{ responsive: true, plugins: { legend: { display: false } } }}
//             />
//           </div>

//           <div className="chart-box">
//             <h3>Month-wise Trend</h3>
//             <Line
//               data={{
//                 labels: monthLine.map((t) => t.date),
//                 datasets: [{ label: "Present Students", data: monthLine.map((t) => t.present), fill: false, borderColor: "#4caf50", tension: 0.1 }],
//               }}
//               options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-wrapper">
//           <table>
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
//               {filteredData.length > 0 ? filteredData.map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.name || "N/A"}</td>
//                   <td>{r.email || "N/A"}</td>
//                   <td>{formatDate(r.date)}</td>
//                   <td>{r.class || "N/A"}</td>
//                   <td><span className={r.record === "present" ? "badge present" : "badge absent"}>{r.record || "N/A"}</span></td>
//                 </tr>
//               )) : <tr><td colSpan="5" style={{ textAlign: "center" }}>No records found</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardCharts;




//top uper wala working hai 


// import React, { useState, useEffect } from "react";
// import header from "../header/Header.js"
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
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
// import Endpoint from "../../apis/Endpoint";
// import "./DashboardCharts.css";
// import Header from "../header/Header";


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

// function DashboardCharts() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
//   const [batch, setBatch] = useState("");
//   const [email, setEmail] = useState("");

//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Charts
//   const [studentPie, setStudentPie] = useState({ present: 0, absent: 0 });
//   const [batchBar, setBatchBar] = useState([]);
//   const [monthLine, setMonthLine] = useState([]);
//   const [batchPercent, setBatchPercent] = useState({}); // New: Batch-wise %

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null;
//     const parts = dateStr.split("/");
//     if (parts.length !== 3) return null;
//     const [day, month, year] = parts;
//     return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
//   };

//   const formatDate = (dateStr) => {
//     const d = parseDate(dateStr);
//     if (!d) return "N/A";
//     return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth()+1).toString().padStart(2,"0")}/${d.getFullYear()}`;
//   };

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(Endpoint.Teacherdashbpord);
//         setAllData(res.data.data || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching attendance", err);
//         setLoading(false);
//       }
//     };
//     fetchAttendance();
//   }, []);

//   useEffect(() => {
//     if (!allData.length) return;

//     const data = allData.filter((r) => {
//       const d = parseDate(r.date);
//       if (!d) return false;

//       if (month) {
//         const recordMonth = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
//         if (recordMonth !== month) return false;
//       }

//       if (batch && r.class !== batch) return false;
//       if (email && !r.email.toLowerCase().includes(email.toLowerCase())) return false;

//       return true;
//     });

//     setFilteredData(data);

//     // Student Pie Chart
//     const presentCount = data.filter((r) => r.record === "present").length;
//     const absentCount = data.filter((r) => r.record === "absent").length;
//     setStudentPie({ present: presentCount, absent: absentCount });

//     // Batch Bar Chart
//     const batchMap = {};
//     data.forEach((r) => {
//       if (!r.class) return;
//       if (!batchMap[r.class]) batchMap[r.class] = 0;
//       if (r.record === "present") batchMap[r.class] += 1;
//     });
//     setBatchBar(Object.keys(batchMap).map((b) => ({ name: b, presentDays: batchMap[b] })));

//     // Month Line Chart
//     const dayMap = {};
//     data.forEach((r) => {
//       const d = parseDate(r.date);
//       if (!d) return;
//       const day = d.getDate();
//       if (!dayMap[day]) dayMap[day] = 0;
//       if (r.record === "present") dayMap[day] += 1;
//     });
//     setMonthLine(
//       Object.keys(dayMap)
//         .sort((a, b) => a - b)
//         .map((d) => ({ date: d, present: dayMap[d] }))
//     );

//     // **Batch-wise % Calculation**
//     const batchCountMap = {};
//     data.forEach(r => {
//       if (!r.class) return;
//       if (!batchCountMap[r.class]) batchCountMap[r.class] = { total: 0, present: 0 };
//       batchCountMap[r.class].total += 1;
//       if (r.record === "present") batchCountMap[r.class].present += 1;
//     });
//     const percentMap = {};
//     Object.keys(batchCountMap).forEach(b => {
//       const { total, present } = batchCountMap[b];
//       percentMap[b] = total ? Math.round((present / total) * 100) : 0;
//     });
//     setBatchPercent(percentMap);

//   }, [month, batch, email, allData]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/Home");
//   };

//   if (!isLoggedIn) return <p>Please login first.</p>;
//   if (loading) return <p>Loading attendance data...</p>;

//   return <>
//   < Header/>
    
//     <div className="analysis-dashboard">
//       {/* <aside className="sidebar">
//         <div className="user-info"><h2>{userRole} Panel</h2></div>
//         <ul>
//           <li><Link to="/Home">Home</Link></li>
//           <li><Link to="/Tdashboard">Dashboard</Link></li>
//           <li><Link to="/Sprofile">Profile</Link></li>
//           <li onClick={handleLogout}>Logout</li>
//         </ul>
//       </aside> */}

//       <main className="main-content">
//         {/* <h1>Attendance Analysis</h1> */}

//         <div className="filters">
//           <div>
//             <label>Month:</label>
//             <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
//           </div>
//           <div>
//             <label>Batch:</label>
//             <select value={batch} onChange={(e) => setBatch(e.target.value)}>
//               <option value="">All Batches</option>
//               <option value="12th">Batch-12th</option>
//               <option value="13th">Batch-13th</option>
//               <option value="14th">Batch-14th</option>
//             </select>
//           </div>
//           <div>
//             <label>Email:</label>
//             <input type="text" placeholder="Search by email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//         </div>

//         <div className="charts-grid">
//           <div className="chart-box">
//             <h3>Student Attendance</h3>
//             <Pie
//               data={{
//                 labels: ["Present", "Absent"],
//                 datasets: [{ data: [studentPie.present, studentPie.absent], backgroundColor: ["#4caf50", "#f44336"] }],
//               }}
//               options={{ plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>
// <div className="chart-box">
//   <h3>Batch-wise Attendance %</h3>
//   <div className="batch-pie-wrapper">
//     <Pie
//       data={{
//         labels: Object.keys(batchPercent),
//         datasets: [{
//           data: Object.values(batchPercent),
//           backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#9c27b0"], // हर batch अलग color
//         }],
//       }}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false, // height adjust के लिए
//         plugins: {
//           legend: {
//             position: "bottom",
//             labels: {
//               font: { size: 14 },
//               generateLabels: (chart) => {
//                 const data = chart.data;
//                 return data.labels.map((label, i) => {
//                   const value = data.datasets[0].data[i];
//                   return {
//                     text: `${label} - ${value}%`,
//                     fillStyle: data.datasets[0].backgroundColor[i],
//                     hidden: false,
//                     index: i
//                   };
//                 });
//               }
//             }
//           },
//           tooltip: {
//             callbacks: {
//               label: function(context) {
//                 return `${context.label}: ${context.parsed}%`;
//               }
//             }
//           }
//         }
//       }}
//     />
//   </div>
// </div>



//           <div className="chart-box">
//             <h3>Batch Attendance</h3>
//             <Bar
//               data={{
//                 labels: batchBar.map((b) => b.name),
//                 datasets: [{ label: "Present Days", data: batchBar.map((b) => b.presentDays), backgroundColor: "#2196f3" }],
//               }}
//               options={{ responsive: true, plugins: { legend: { display: false } } }}
//             />
//           </div>

//           <div className="chart-box">
//             <h3>Month-wise Trend</h3>
//             <Line
//               data={{
//                 labels: monthLine.map((t) => t.date),
//                 datasets: [{ label: "Present Students", data: monthLine.map((t) => t.present), fill: false, borderColor: "#4caf50", tension: 0.1 }],
//               }}
//               options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
//             />
//           </div>
//         </div>

//         {/* <div className="table-wrapper">
//           <table>
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
//               {filteredData.length > 0 ? filteredData.map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.name || "N/A"}</td>
//                   <td>{r.email || "N/A"}</td>
//                   <td>{formatDate(r.date)}</td>
//                   <td>{r.class || "N/A"}</td>
//                   <td><span className={r.record === "present" ? "badge present" : "badge absent"}>{r.record || "N/A"}</span></td>
//                 </tr>
//               )) : <tr><td colSpan="5" style={{ textAlign: "center" }}>No records found</td></tr>}
//             </tbody>
//           </table>
//         </div> */}




//    <div className="table-wrapper">
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
//               {filteredData.length > 0 ? (
//                 filteredData.map((record, index) => (
//                   <tr key={index}>
//                     <td>{record.name || "N/A"}</td>
//                     <td>{record.email || "N/A"}</td>
//                     <td>{record.date || "N/A"}</td>
//                     <td>{record.class || "N/A"}</td>
//   <td>    
// <span
//     className={`px-3 py-2 rounded text-white badge ${record.record === "present" ? "bg-success" : "bg-danger"}`}
//   >
//     {record.record || "N/A"}
//   </span>
//   </td>   
  

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" style={{ textAlign: "center" }}>
//                     No records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>



//         {/* sisi */}
//       </main>
//     </div>
//   </>
// }

// export default DashboardCharts;











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
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
// import Endpoint from "../../apis/Endpoint";
// import "./DashboardCharts.css";
// import Header from "../header/Header";
// import api from "../../apis/api";


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

// function DashboardCharts() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
//   const [batch, setBatch] = useState("");
//   const [email, setEmail] = useState("");

//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [studentPie, setStudentPie] = useState({ present: 0, absent: 0 });
//   const [batchBar, setBatchBar] = useState([]);
//   const [monthLine, setMonthLine] = useState([]);
//   const [batchPercent, setBatchPercent] = useState({});

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null;
//     const parts = dateStr.split("/");
//     if (parts.length !== 3) return null;
//     const [day, month, year] = parts;
//     return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
//   };

// // ✅ Universal Date Parser
// // const parseDate = (dateStr) => {
// //   if (!dateStr) return null;

// //   // अगर पहले से ISO format है (yyyy-mm-dd)
// //   if (dateStr.includes("-")) {
// //     return new Date(dateStr);
// //   }

// //   const parts = dateStr.split("/");
// //   if (parts.length !== 3) return null;

// //   let day, month, year;

// //   // Localhost (dd/mm/yyyy) → पहला part day
// //   // Render (mm/dd/yyyy) → पहला part month
// //   if (Number(parts[0]) > 12) {
// //     // Localhost case (22/7/2025 → 22 is day)
// //     [day, month, year] = parts;
// //   } else {
// //     // Render case (7/22/2025 → 7 is month)
// //     [month, day, year] = parts;
// //   }

// //   return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
// // };























//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(Endpoint.Teacherdashbpord);
//         setAllData(res.data.data || []);
      
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching attendance", err);
//         setLoading(false);
//       }
//     };
//     fetchAttendance();
//   }, []);

//   useEffect(() => {
//     if (!allData.length) return;
//         console.log("KHAP Debug Sample Record 👉", allData[0]);

//     const data = allData.filter((r) => {
//       const d = parseDate(r.date);
//       if (!d) return false;
//         console.log("localhost Data Sample:", allData[0]);

//       if (month) {
//         const recordMonth = `${d.getFullYear()}-${(d.getMonth() + 1)
//           .toString()
//           .padStart(2, "0")}`;
//         if (recordMonth !== month) return false;
//       }

//       if (batch && r.class !== batch) return false;
//       if (email && !r.email.toLowerCase().includes(email.toLowerCase()))
//         return false;

//       return true;
//     });

//     setFilteredData(data);

//     // Student Pie Chart
//     const presentCount = data.filter((r) => r.record === "present").length;
//     const absentCount = data.filter((r) => r.record === "absent").length;
//     setStudentPie({ present: presentCount, absent: absentCount });

//     // Batch Bar Chart
//     const batchMap = {};
//     data.forEach((r) => {
//       if (!r.class) return;
//       if (!batchMap[r.class]) batchMap[r.class] = 0;
//       if (r.record === "present") batchMap[r.class] += 1;
//     });
//     setBatchBar(
//       Object.keys(batchMap).map((b) => ({ name: b, presentDays: batchMap[b] }))
//     );

//     // Month Line Chart
//     const dayMap = {};
//     data.forEach((r) => {
//       const d = parseDate(r.date);
//       if (!d) return;
//       const day = d.getDate();
//       if (!dayMap[day]) dayMap[day] = 0;
//       if (r.record === "present") dayMap[day] += 1;
//     });
//     setMonthLine(
//       Object.keys(dayMap)
//         .sort((a, b) => a - b)
//         .map((d) => ({ date: d, present: dayMap[d] }))
//     );

//     // Batch-wise % Calculation
//     const batchCountMap = {};
//     data.forEach((r) => {
//       if (!r.class) return;
//       if (!batchCountMap[r.class])
//         batchCountMap[r.class] = { total: 0, present: 0 };
//       batchCountMap[r.class].total += 1;
//       if (r.record === "present") batchCountMap[r.class].present += 1;
//     });
//     const percentMap = {};
//     Object.keys(batchCountMap).forEach((b) => {
//       const { total, present } = batchCountMap[b];
//       percentMap[b] = total ? Math.round((present / total) * 100) : 0;
//     });
//     setBatchPercent(percentMap);
//   }, [month, batch, email, allData]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/Home");
//   };

//   if (!isLoggedIn) return <p>Please login first.</p>;
//   if (loading) return <p>Loading attendance data...</p>;

//   return (
//     <>
//       <Header />

//       <div className="analysis-dashboard">
//         <main className="main">
//           {/* Filters */}
//           <div className="fitlter">
//             <div>
//               <label>Month:</label>
//               <input
//                 type="month"
//                 value={month}
//                 onChange={(e) => setMonth(e.target.value)}
//               />
//             </div>
//             <div>
//               <label>Batch:</label>
//               <select value={batch} onChange={(e) => setBatch(e.target.value)}>
//                 <option value="">All Batches</option>
//                 <option value="12th">Batch-12th</option>
//                 <option value="13th">Batch-13th</option>
//                 <option value="14th">Batch-14th</option>
//               </select>
//             </div>
//             <div>
//               <label>Email:</label>
//               <input
//                 type="text"
//                 placeholder="Search by email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="charts-grid">
//             <div className="chart-box">
//               <h3>Student Attendance</h3>
//               <Pie
//                 data={{
//                   labels: ["Present", "Absent"],
//                   datasets: [
//                     {
//                       data: [studentPie.present, studentPie.absent],
//                       backgroundColor: ["#4caf50", "#f44336"],
//                     },
//                   ],
//                 }}
//                 options={{ plugins: { legend: { position: "bottom" } } }}
//               />
//             </div>

//             <div className="chart-box">
//               <h3>Batch-wise Attendance %</h3>
//               <div className="batch-pie-wrapper">
//                 <Pie
//                   data={{
//                     labels: Object.keys(batchPercent),
//                     datasets: [
//                       {
//                         data: Object.values(batchPercent),
//                         backgroundColor: [
//                           "#4caf50",
//                           "#2196f3",
//                           "#ff9800",
//                           "#9c27b0",
//                         ],
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                       legend: {
//                         position: "bottom",
//                         labels: {
//                           font: { size: 14 },
//                           generateLabels: (chart) => {
//                             const data = chart.data;
//                             return data.labels.map((label, i) => {
//                               const value = data.datasets[0].data[i];
//                               return {
//                                 text: `${label} - ${value}%`,
//                                 fillStyle:
//                                   data.datasets[0].backgroundColor[i],
//                                 hidden: false,
//                                 index: i,
//                               };
//                             });
//                           },
//                         },
//                       },
//                       tooltip: {
//                         callbacks: {
//                           label: function (context) {
//                             return `${context.label}: ${context.parsed}%`;
//                           },
//                         },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="chart-box">
//               <h3>Batch Attendance</h3>
//               <Bar
//                 data={{
//                   labels: batchBar.map((b) => b.name),
//                   datasets: [
//                     {
//                       label: "Present Days",
//                       data: batchBar.map((b) => b.presentDays),
//                       backgroundColor: "#2196f3",
//                     },
//                   ],
//                 }}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { display: false } },
//                 }}
//               />
//             </div>

//             <div className="chart-box">
//               <h3>Month-wise Trend</h3>
//               <Line
//                 data={{
//                   labels: monthLine.map((t) => t.date),
//                   datasets: [
//                     {
//                       label: "Present Students",
//                       data: monthLine.map((t) => t.present),
//                       fill: false,
//                       borderColor: "#4caf50",
//                       tension: 0.1,
//                     },
//                   ],
//                 }}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { position: "bottom" } },
//                 }}
//               />
//             </div>
//           </div>

//           {/* Attendance Table */}
//           <div className="tablewrp">
//             <table className="attendacetable">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Date</th>
//                   <th>Class</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((record, index) => (
//                     <tr key={index}>
//                       <td>{record.name || "N/A"}</td>
//                       <td>{record.email || "N/A"}</td>
//                       <td>{record.date || "N/A"}</td>
//                       <td>{record.class || "N/A"}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             record.record === "present"
//                               ? "present"
//                               : "absent"
//                           }`}
//                         >
//                           {record.record || "N/A"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" style={{ textAlign: "center" }}>
//                       No records found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

// export default DashboardCharts;

















// ✅ Fixed DashboardCharts.js (With Debug Logs)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import Endpoint from "../../apis/Endpoint";
import "./DashboardCharts.css";
import Header from "../header/Header";
import api from "../../apis/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

function DashboardCharts() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [batch, setBatch] = useState("");
  const [email, setEmail] = useState("");

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentPie, setStudentPie] = useState({ present: 0, absent: 0 });
  const [batchBar, setBatchBar] = useState([]);
  const [monthLine, setMonthLine] = useState([]);
  const [batchPercent, setBatchPercent] = useState({});

  // ✅ Fool-Proof Date Parser (Works both Localhost & Render)
  const parseDate = (dateStr) => {
    if (!dateStr) return null;

    // Already ISO
    if (dateStr.includes("-")) {
      const d = new Date(dateStr);
      console.log("KHAP 👉 ISO Date", dateStr, "=>", d);
      return d;
    }

    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;

    let day, month, year;

    if (Number(parts[0]) > 12) {
      // Localhost: dd/mm/yyyy
      [day, month, year] = parts;
      console.log("KHAP 👉 Localhost Format Detected", dateStr);
    } else if (Number(parts[1]) > 12) {
      // Render: mm/dd/yyyy
      [month, day, year] = parts;
      console.log("KHAP 👉 Render Format Detected", dateStr);
    } else {
      // Fallback assume dd/mm/yyyy
      [day, month, year] = parts;
      console.log("KHAP 👉 Fallback Used", dateStr);
    }

    const mm = month.toString().padStart(2, "0");
    const dd = day.toString().padStart(2, "0");
    const d = new Date(`${year}-${mm}-${dd}`);
    console.log("KHAP 👉 Parsed Date", dateStr, "=>", d);
    return d;
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const res = await api.get(Endpoint.Teacherdashbpord);
        console.log("KHAP 👉 Raw API Response", res.data);
        setAllData(res.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attendance", err);
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  useEffect(() => {
    if (!allData.length) return;

    console.log("KHAP 👉 First Sample Record", allData[0]);

    const data = allData.filter((r) => {
      const d = parseDate(r.date);
      if (!d || isNaN(d.getTime())) {
        console.warn("KHAP ⚠️ Invalid Date Skipped", r.date);
        return false;
      }

      if (month) {
        const recordMonth = `${d.getFullYear()}-${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        if (recordMonth !== month) return false;
      }

      if (batch && r.class !== batch) return false;
      if (email && !r.email.toLowerCase().includes(email.toLowerCase()))
        return false;

      return true;
    });

    console.log("KHAP 👉 Filtered Data", data);

    setFilteredData(data);

    // Student Pie Chart
    const presentCount = data.filter((r) => r.record === "present").length;
    const absentCount = data.filter((r) => r.record === "absent").length;
    setStudentPie({ present: presentCount, absent: absentCount });

    // Batch Bar Chart
    const batchMap = {};
    data.forEach((r) => {
      if (!r.class) return;
      if (!batchMap[r.class]) batchMap[r.class] = 0;
      if (r.record === "present") batchMap[r.class] += 1;
    });
    setBatchBar(
      Object.keys(batchMap).map((b) => ({ name: b, presentDays: batchMap[b] }))
    );

    // Month Line Chart
    const dayMap = {};
    data.forEach((r) => {
      const d = parseDate(r.date);
      if (!d) return;
      const day = d.getDate();
      if (!dayMap[day]) dayMap[day] = 0;
      if (r.record === "present") dayMap[day] += 1;
    });
    setMonthLine(
      Object.keys(dayMap)
        .sort((a, b) => a - b)
        .map((d) => ({ date: d, present: dayMap[d] }))
    );

    // Batch-wise %
    const batchCountMap = {};
    data.forEach((r) => {
      if (!r.class) return;
      if (!batchCountMap[r.class])
        batchCountMap[r.class] = { total: 0, present: 0 };
      batchCountMap[r.class].total += 1;
      if (r.record === "present") batchCountMap[r.class].present += 1;
    });
    const percentMap = {};
    Object.keys(batchCountMap).forEach((b) => {
      const { total, present } = batchCountMap[b];
      percentMap[b] = total ? Math.round((present / total) * 100) : 0;
    });
    setBatchPercent(percentMap);

    console.log("KHAP 👉 Chart Data Ready", {
      studentPie,
      batchBar,
      monthLine,
      batchPercent: percentMap,
    });
  }, [month, batch, email, allData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Home");
  };

  if (!isLoggedIn) return <p>Please login first.</p>;
  if (loading) return <p>Loading attendance data...</p>;

  return (
    <>
      <Header />
      <div className="analysis-dashboard">
        <main className="main">
          {/* Filters */}
          <div className="fitlter">
            <div>
              <label>Month:</label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            <div>
              <label>Batch:</label>
              <select value={batch} onChange={(e) => setBatch(e.target.value)}>
                <option value="">All Batches</option>
                <option value="12th">Batch-12th</option>
                <option value="13th">Batch-13th</option>
                <option value="14th">Batch-14th</option>
              </select>
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                placeholder="Search by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Charts */}
          <div className="charts-grid">
            {/* Pie Chart */}
            <div className="chart-box">
              <h3>Student Attendance</h3>
              <Pie
                data={{
                  labels: ["Present", "Absent"],
                  datasets: [
                    {
                      data: [studentPie.present, studentPie.absent],
                      backgroundColor: ["#4caf50", "#f44336"],
                    },
                  ],
                }}
                options={{ plugins: { legend: { position: "bottom" } } }}
              />
            </div>

            {/* Batch % Pie */}
            <div className="chart-box">
              <h3>Batch-wise Attendance %</h3>
              <Pie
                data={{
                  labels: Object.keys(batchPercent),
                  datasets: [
                    {
                      data: Object.values(batchPercent),
                      backgroundColor: [
                        "#4caf50",
                        "#2196f3",
                        "#ff9800",
                        "#9c27b0",
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        generateLabels: (chart) => {
                          const data = chart.data;
                          return data.labels.map((label, i) => {
                            const value = data.datasets[0].data[i];
                            return {
                              text: `${label} - ${value}%`,
                              fillStyle: data.datasets[0].backgroundColor[i],
                              hidden: false,
                              index: i,
                            };
                          });
                        },
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Batch Bar */}
            <div className="chart-box">
              <h3>Batch Attendance</h3>
              <Bar
                data={{
                  labels: batchBar.map((b) => b.name),
                  datasets: [
                    {
                      label: "Present Days",
                      data: batchBar.map((b) => b.presentDays),
                      backgroundColor: "#2196f3",
                    },
                  ],
                }}
                options={{ plugins: { legend: { display: false } } }}
              />
            </div>

            {/* Line Chart */}
            <div className="chart-box">
              <h3>Month-wise Trend</h3>
              <Line
                data={{
                  labels: monthLine.map((t) => t.date),
                  datasets: [
                    {
                      label: "Present Students",
                      data: monthLine.map((t) => t.present),
                      borderColor: "#4caf50",
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="tablewrp">
            <table className="attendacetable">
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
                      <td>
                        <span
                          className={`badge ${
                            record.record === "present" ? "present" : "absent"
                          }`}
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
  );
}

export default DashboardCharts;
