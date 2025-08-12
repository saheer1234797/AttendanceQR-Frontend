
import React, { useEffect, useState } from "react";
import axios from "axios";
function Attendance() {
  // return (
  //   <div className="page">
  //     <h2> Attendance Report</h2>
  //     <p>Feature coming soon...</p>
  //   </div>
  // );





  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/qr/generateQR")
      .then(res => {
        setStats(res.data.data);
      })
      .catch(err => {
        console.error(err);
        setError("Dashboard load failed");
      });
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!stats) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <div className="card-container">
        <div className="card"> Students: <strong>{stats.totalStudents}</strong></div>
        {/* <div className="card"> Teachers: <strong>{stats.totalTeachers}</strong></div>
        <div className="card">Attendance Records: <strong>{stats.totalAttendance || 56}</strong></div>
        <div className="card"> Today’s Attendance: <strong>{stats.todayAttendance || 18}</strong></div> */}
      </div> 
    </div>
  );
}

export default Attendance;