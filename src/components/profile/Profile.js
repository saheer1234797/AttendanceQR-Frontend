

import React, { useState, useEffect } from "react";
import axios from "axios";
import Endpoint from "../../apis/Endpoint";
import "./Profile.css";

function Sprofile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(Endpoint.Profile, {
          withCredentials: true, // session cookie
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

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!student) {
    return <div className="no-profile">No profile found. Please login.</div>;
  }

  return (
    <div className="student-container">
      <div className="student-card">
        <div className="profile-header">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=007bff&color=fff`}
            alt="avatar"
            className="profile-avatar"
          />
          <h2>{student.name}</h2>
          <p className="role">{student.role}</p>
        </div>

        <div className="student-info">
          <div className="info-row">
            <span className="label">Roll Number:</span>
            <span>{student.rollNumber}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span>{student.email}</span>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Sprofile;


