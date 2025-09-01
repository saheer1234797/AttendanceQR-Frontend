
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Tdashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import Endpoint from "../../apis/Endpoint";


  function  StudentDashboard(){
  const navigate = useNavigate();

  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [userName, setUserName] = useState("Student");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUserName(userObj.name || "Student");
    }

    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(Endpoint.StudentAttendance, {
        withCredentials: true, 
      });
      console.log("Response Data:", response.data);

      if (response.status === 200) {
              console.log("Response Data:", response.data);
       
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
            <Link className="nav-link" to="/TQRScanner">
              Scan QR
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
           Current Month:{" "}
         <strong>
               {new Date().toLocaleString("default", { month: "long" })}{" "}
                {new Date().getFullYear()}
                  </strong>
         </div>
        </div>

        <div className="filters">
          <select onChange={(e) => setFilterMonth(e.target.value)}>
            <option value="">All Months</option>
            <option value="2025-08">August 2025</option>
            <option value="2025-07">July 2025</option>
          </select>

          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

         
           <Link className="nav-link" to="/TQRScanner">
           
                  <button className="scan-btn" >  Scan QR</button>
            </Link>
        </div>

        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                    <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
           
            <tbody>
  {filteredData.map((record, index) => (
    <tr key={index}>
      <td>{(record.scannedAt || record.createdAt || "").slice(0, 10)}</td>
      <td>{record.student?.class || "N/A"}</td>
      <td>{record.student?.email || "N/A"}</td>
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



