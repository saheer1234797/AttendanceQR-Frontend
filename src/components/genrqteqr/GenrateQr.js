// src/components/GenerateQR/GenerateQR.jsx
import React, { useState } from "react";
import axios from "axios";
import "../genrqteqr/GenrateQr.css"
import Endpoint from "../../apis/Endpoint"; // 

export default function GenerateQR() {
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");



const handleGenerate = async () => {
  setError("");
  setLoading(true);

  try {
    const res = await axios.get(Endpoint.GenerateQR, { withCredentials: true });

  
    const { filePath, qrData } = res.data;
    ///ye ,ane add kiya hai
const backendBaseURL = "http://localhost:3000"; 
//end of the code 
    // const clientPath = filePath.startsWith("/public")
    //   ? `${window.location.origin}${filePath.replace("/public", "")}`
    //   : `${window.location.origin}${filePath}`;

    const clientPath = filePath.startsWith("/public")
      ? `${backendBaseURL}${filePath.replace("/public", "")}`
      : `${backendBaseURL}${filePath}`;


    setQrData(qrData || null);
    setImageUrl(clientPath);
  } catch (err) {
    console.error("Generate QR error:", err);
    setError(err?.response?.data?.message || "Failed to generate QR");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="qr-wrapper">
      <div className="qr-card">
        <h2>Generate QR Code</h2>

        <p className="hint">
          Click the button below to generate your personal QR code. Only students can generate.
        </p>

        <div className="controls">
          <button
            className="btn-generate"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate QR"}
          </button>
        </div>

        {error && <div className="qr-error">{error}</div>}

        {qrData && (
          <div className="qr-info">
            <h3>QR Details</h3>
            <table>
              <tbody>
                <tr><td>Name</td><td>{qrData.name}</td></tr>
                <tr><td>Email</td><td>{qrData.email}</td></tr>
                <tr><td>UUID</td><td>{qrData.uuid}</td></tr>
                <tr><td>Time</td><td>{new Date(qrData.timeStamp).toLocaleString()}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {imageUrl ? (
          <div className="qr-preview">
            <h3>Your QR Code</h3>
            <img src={imageUrl} alt="Student QR" />
            <div className="qr-actions">
              <a href={imageUrl} download={`qr-${qrData?.studentId || "code"}.png`} className="btn-download">Download</a>
              <button className="btn-refresh" onClick={() => { setImageUrl(""); setQrData(null); }}>Clear</button>
            </div>
            <p className="scan-note">Teacher can now scan this QR using the scanner page.</p>
          </div>
        ) : (
          <div className="qr-empty">
            <img src="/qr-placeholder.png" alt="placeholder" className="placeholder" />
            <small>QR preview will show here after generation</small>
          </div>
        )}
      </div>
    </div>
  );
}
