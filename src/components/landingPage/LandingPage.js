
import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="homepage">
  
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>QR Attendance System</h1>
          <p>
            Smart, Fast and Reliable Attendance Management using QR Code & Face
            Recognition.
          </p>
          <a href="/login" className="btn-primary">
            Get Started
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2>Why QR Attend?</h2>
  
          
              
              <p>Our system helps schools, colleges, and organizations manage
            attendance in real-time using QR code scanning. Simple to use,
            secure, and easy to integrate.</p>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">


      <h2 >Key Features</h2>


    



          <div className="features-grid">
            <div className="feature-card">
              <i className="bi bi-qr-code-scan"></i>
              <h3>QR Code Attendance</h3>
              <p>Scan QR codes to record student attendance instantly.</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-person-check"></i>
              <h3>Multi-User Roles</h3>
              <p>Admin, Teacher & Student roles with customized dashboards.</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-graph-up-arrow"></i>
              <h3>Reports & Analytics</h3>
              <p>
                Get real-time reports, attendance summaries, and performance
                charts.
              </p>
            </div>


{/* 
ok

*/}
  <div className="feature-card">
              <i className="bi bi-journal-check"></i>
              <h3>Flexible Manual Attendance</h3>
              <p>
              Never miss an attendee. Quick manual entry ensures 100% accuracy when you need it.
              </p>
            </div>



{/* end add somthing for testing ok */}

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to simplify attendance?</h2>
        <p>Start with QR Attend today and join our exclusive group of early adopters.</p>
        <a href="/signup" className="btn-secondary">

          Create an Account
        </a>
      </section>

    
    </div>
  );
}

export default LandingPage;

