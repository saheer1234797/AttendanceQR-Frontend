
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
      <p className="footer-text">
  QR Attendance System | Designed & Developed by Saheer
</p>
        <div className="social-links">
          <a
            href="https://linkedin.com/in/saheer-khan-9b7995285"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://github.com/saheer1234797"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="bi bi-github"></i>
          </a>
          <a href="mailto:saheer@example.com" className="social-icon">
            <i className="bi bi-envelope-fill"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;



