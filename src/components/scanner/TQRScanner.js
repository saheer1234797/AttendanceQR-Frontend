import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Endpoint from "../../apis/Endpoint"; 
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../scanner/TQRScanner.css"


  function TQRScanner(){
  const qrCodeRegionId = "qr-reader";
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const navigate = useNavigate();

  const stopScanner = async () => {
    if (scannerRef.current && scanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        setScanning(false);
        toast.info(" Scanner Stopped", { position: "top-right" });
      } catch (err) {
        console.error("Stop failed", err);
        toast.error("Failed to stop scanner", { position: "top-right" });
      }
    }
  };

  const handleScanSuccess = async (decodedText) => {
    try {
      const qrData = JSON.parse(decodedText);
      const filename = qrData.qrId + ".png";

      const response = await fetch(Endpoint.QR, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, { position: "top-right" });
        await stopScanner();
      
        setTimeout(() => {
          navigate("/studentdashboard");
        }, 2000);
      } else {
        toast.error(data.message, { position: "top-right" });
       
        await stopScanner();
      }
    } catch (error) {
      toast.error("Failed to mark attendance", { position: "top-right" });
      console.error("Attendance API error:", error);
      await stopScanner();
    }
  };

  const startScanner = () => {
    setLoadingCamera(true);
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(qrCodeRegionId);
    }

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          let cameraId = devices[0].id;
          scannerRef.current
            .start(
              cameraId,
              { fps: 10, qrbox: 300 },
              handleScanSuccess,
              (errorMessage) => {
                console.warn("QR Scan Error", errorMessage);
              }
            )
            .then(() => {
              setScanning(true);
              toast.info(" Scanner Started", { position: "top-right" });
              setLoadingCamera(false);
            })
            .catch((err) => {
              toast.error("Failed to start scanner", { position: "top-right" });
              setLoadingCamera(false);
            });
        } else {
          toast.error(" No camera found", { position: "top-right" });
          setLoadingCamera(false);
        }
      })
      .catch((err) => {
        toast.error("Camera error", { position: "top-right" });
        console.error("Camera Error:", err);
        setLoadingCamera(false);
      });
  };

  return <>

    < Header/>
    <div className="qr-scanner-container">
      <h2> Studnet  QR Scanner</h2>

      <div className="scanner-controls">
        {!scanning && !loadingCamera && (
          <button id="b" className="btn start-btn " onClick={startScanner}>
            Start Scanning
          </button>
        )}
        {loadingCamera && (
          <button className="btn loading-btn" disabled>
             Starting Camera...
          </button>
        )}
        {scanning && (
          <button className="btn stop-btn" onClick={stopScanner}>
            Stop Scanning
          </button>
        )}
      </div>

      <div id={qrCodeRegionId} className="qr-reader-box"></div>

      <ToastContainer />
    </div>
    <Footer/>
   </>
};

export default TQRScanner;
