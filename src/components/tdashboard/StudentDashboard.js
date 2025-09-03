

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Tdashboard.css"; 
import axios from "axios";
import { toast } from "react-toastify";
import Endpoint from "../../apis/Endpoint";

function StudentDashboard() {
  const navigate = useNavigate();

  const [filterMonth, setFilterMonth] = useState(
    new Date().toISOString().slice(0, 7) // default: current month (exmple kai liye "2025-09")
  );
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

      if (response.status === 200) {
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

  //  Filter Logic
  const filteredData = attendanceData.filter((record) => {
    const date = (record.scannedAt || record.createdAt || "").slice(0, 10); // "YYYY-MM-DD"
    const month = date.slice(0, 7); // "YYYY-MM"
    return (
      (!filterMonth || month === filterMonth) &&
      (!filterStatus || record.status === filterStatus)
    );
  });

  return (
    <div className="tdashboard-container">
      {/* Sidebar */}
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

      {/* Main */}
      <main className="dashboard-main">
        <h1 className="mb-3">Welcome {userName}</h1>

        {/* Cards */}
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

        {/* Filters */}
        <div className="filters">
          <select
            className="form-select"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {/* generate months dynamically */}
            {Array.from({ length: 6 }).map((_, i) => {
              const d = new Date();
              d.setMonth(d.getMonth() - i);
              const val = d.toISOString().slice(0, 7);
              const label =
                d.toLocaleString("default", { month: "long" }) +
                " " +
                d.getFullYear();
              return (
                <option key={val} value={val}>
                  {label}
                </option>
              );
            })}
          </select>

          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <Link className="nav-link" to="/TQRScanner">
            <button className="scan-btn">Scan QR</button>
          </Link>
        </div>

        {/* Attendance Table */}
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
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  <tr key={index}>
                    <td>
                      {(record.scannedAt || record.createdAt || "").slice(0, 10)}
                    </td>
                    <td>{record.student?.class || "N/A"}</td>
                    <td>{record.student?.email || "N/A"}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          record.status === "present"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
