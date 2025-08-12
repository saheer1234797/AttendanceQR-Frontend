

// import React, { useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./TQRScanner.css";  // 
// import Endpoint from "../../apis/Endpoint";

// const TQRScanner = () => {
//   const qrCodeRegionId = "qr-reader";
//   const scannerRef = useRef(null);
//   const [scanning, setScanning] = useState(false);

//   const handleScanSuccess = async (decodedText, decodedResult) => {
//     try {
      
//       const response = await get(Endpoint.ScanQR, {
//         method: "POST",
//         credentials: "include",  // cookie 
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ qrData: decodedText }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(` ${data.message}`, { position: "top-right" });
//       } else {
//         toast.error(` ${data.message}`, { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("Failed to mark attendance", { position: "top-right" });
//       console.error("Attendance API error:", error);
//     }

//     console.log("Scanned Result:", decodedResult);
//     stopScanner(); // 
//   };

//   const startScanner = () => {
//     if (!scannerRef.current) {
//       scannerRef.current = new Html5Qrcode(qrCodeRegionId);
//     }

//     Html5Qrcode.getCameras()
//       .then((devices) => {
//         if (devices && devices.length) {
//           let cameraId = devices[0].id;
//           scannerRef.current
//             .start(
//               cameraId,
//               {
//                 fps: 10,
//                 qrbox: 250,
//               },
//               handleScanSuccess,
//               (errorMessage) => {
//                 console.warn("QR Scan Error", errorMessage);
//               }
//             )
//             .then(() => {
//               setScanning(true);
//               toast.info("📸 Scanner Started", { position: "top-right" });
//             });
//         } else {
//           toast.error("❌ No camera found", { position: "top-right" });
//         }
//       })
//       .catch((err) => {
//         toast.error(" Camera error", { position: "top-right" });
//         console.error("Camera Error:", err);
//       });
//   };

//   const stopScanner = () => {
//     if (scannerRef.current) {
//       scannerRef.current
//         .stop()
//         .then(() => {
//           scannerRef.current.clear();
//           setScanning(false);
//           toast.info("📴 Scanner Stopped", { position: "top-right" });
//         })
//         .catch((err) => {
//           console.error("Stop failed", err);
//           toast.error(" Failed to stop scanner", { position: "top-right" });
//         });
//     }
//   };

//   return (
//     <div className="qr-scanner-container">
//       <h2>📷 Teacher QR Scanner</h2>

//       <div className="scanner-controls">
//         {!scanning ? (
//           <button className="btn start-btn" onClick={startScanner}>
//             Start Scanning
//           </button>
//         ) : (
//           <button className="btn stop-btn" onClick={stopScanner}>
//             Stop Scanning
//           </button>
//         )}
//       </div>

//       <div id={qrCodeRegionId} className="qr-reader-box"></div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default TQRScanner;






















// import React, { useState } from 'react';
// import { QrReader } from 'react-qr-reader';
// import axios from 'axios';
// import Endpoint from '../../apis/Endpoint';

// function QRScanner() {
//   const [scanResult, setScanResult] = useState('');
//   const [message, setMessage] = useState('');

//   const handleScan = async (result) => {
//     if (result) {
//       setScanResult(result.text);

//       try {
//         // Send filename to backend (assuming filename extracted or uploaded)
//         // If QR reader gives QR content directly, send that directly instead of filename

//         const response = await axios.post(Endpoint.ScanQR, {
//           filename: result.text,  // if using filename approach, else send qrData string
//         }, { withCredentials: true });

//         setMessage(response.data.message);
//       } catch (err) {
//         setMessage(err.response?.data?.message || 'Scan failed');
//       }
//     }
//   };

//   return (
//     <div>
//       <h3>Scan QR Code</h3>
//       <QrReader
//         onResult={(result, error) => {
//           if (!!result) {
//             handleScan(result);
//           }
//         }}
//         constraints={{ facingMode: 'environment' }}
//         style={{ width: '100%' }}
//       />
//       <p>Scan Result: {scanResult}</p>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default QRScanner;














// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";  // or import QrReader from 'react-qr-reader';
// import axios from "axios";
// import Endpoint from "../../apis/Endpoint";
// import "./TQRScanner.css";

// function TQRScanner() {
//   const [scanResult, setScanResult] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleScan = async (result) => {
//     if (result) {
//        console.log("Scanned Result:", result.text);
//       setScanResult(result.text);
//       setLoading(true);
//       setMessage("");

//       try {
//         // Backend expects qr data string, so send the scanned QR content directly
//         const response = await axios.post(
//           Endpoint.ScanQR,
//           { qrString: result.text },  // backend me isko read karo
//           { withCredentials: true }
//         );

//         setMessage(response.data.message);
//       } catch (error) {
//         setMessage(error.response?.data?.message || "Scan failed");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="qr-scanner-container">
//       <h3>Scan QR Code</h3>
//       <div className="qr-reader-wrapper">
//         <QrReader
//           onResult={(result, error) => {
//             if (!!result) {
//               handleScan(result);
//             }
//             if (!!error) {
//               // Optional: handle errors if needed
//             }
//           }}
//           constraints={{ facingMode: "environment" }}
//           containerStyle={{ width: "300px", margin: "auto" }}
//           videoStyle={{ width: "100%" }}
//         />
//       </div>
//       <div className="scan-result">
//         <p><b>Scanned QR Data:</b> {scanResult || "No QR scanned yet"}</p>
//         <p className={`message ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>{loading ? "Processing..." : message}</p>
//       </div>
//     </div>
//   );
// }

// export default TQRScanner;







































// import React, { useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Endpoint from "../../apis/Endpoint"; // jahan API url rakha hai

// const TQRScanner = () => {
//   const qrCodeRegionId = "qr-reader";
//   const scannerRef = useRef(null);
//   const [scanning, setScanning] = useState(false);

//   const handleScanSuccess = async (decodedText, decodedResult) => {
//     try {
//       // decodedText me QR code ki jo string hai wo aayegi
//       // Agar aap QR me pura filename store kar rahe ho to use decodedText bhejo, varna QR me sirf qrId rakho aur yaha filename banalo
      
//       // For example, agar QR me qrId hai:
//       const filename = decodedText + ".png";  // agar filename is tarah banta hai
      
//       const response = await fetch(Endpoint.ScanQR, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message, { position: "top-right" });
//       } else {
//         toast.error(data.message, { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("Failed to mark attendance", { position: "top-right" });
//       console.error("Attendance API error:", error);
//     }

//     stopScanner();
//   };

//   const startScanner = () => {
//     if (!scannerRef.current) {
//       scannerRef.current = new Html5Qrcode(qrCodeRegionId);
//     }

//     Html5Qrcode.getCameras()
//       .then((devices) => {
//         if (devices && devices.length) {
//           let cameraId = devices[0].id;
//           scannerRef.current
//             .start(
//               cameraId,
//               { fps: 10, qrbox: 250 },
//               handleScanSuccess,
//               (errorMessage) => {
//                 console.warn("QR Scan Error", errorMessage);
//               }
//             )
//             .then(() => {
//               setScanning(true);
//               toast.info("📸 Scanner Started", { position: "top-right" });
//             });
//         } else {
//           toast.error("❌ No camera found", { position: "top-right" });
//         }
//       })
//       .catch((err) => {
//         toast.error("Camera error", { position: "top-right" });
//         console.error("Camera Error:", err);
//       });
//   };

//   const stopScanner = () => {
//     if (scannerRef.current) {
//       scannerRef.current
//         .stop()
//         .then(() => {
//           scannerRef.current.clear();
//           setScanning(false);
//           toast.info("📴 Scanner Stopped", { position: "top-right" });
//         })
//         .catch((err) => {
//           console.error("Stop failed", err);
//           toast.error("Failed to stop scanner", { position: "top-right" });
//         });
//     }
//   };

//   return (
//     <div className="qr-scanner-container">
//       <h2>📷 Teacher QR Scanner</h2>

//       <div className="scanner-controls">
//         {!scanning ? (
//           <button className="btn start-btn" onClick={startScanner}>Start Scanning</button>
//         ) : (
//           <button className="btn stop-btn" onClick={stopScanner}>Stop Scanning</button>
//         )}
//       </div>

//       <div id={qrCodeRegionId} className="qr-reader-box"></div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default TQRScanner;




// import React, { useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Endpoint from "../../apis/Endpoint"; // API URL yahan rakha hai

// const TQRScanner = () => {
//   const qrCodeRegionId = "qr-reader";
//   const scannerRef = useRef(null);
//   const [scanning, setScanning] = useState(false);

//   const handleScanSuccess = async (decodedText) => {
//     try {
//       // decodedText expected hai: filename bina extension ke (jaise "9f4fb534-9560-4997-b915-67e5b51675a8")
//       //const filename = decodedText + ".png";  //this is original line // tumhari backend jo filename expect karti hai
//    const qrData=JSON.parse(decodedText);
//    console.log("qrdata "+qrData);
   
   
//    const filename=qrData.qrId+".png";
//    console.log(filename);
   
//       const response = await fetch(Endpoint.QR, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message, { position: "top-right" });
//       } else {
//         toast.error(data.message, { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("Failed to mark attendance", { position: "top-right" });
//       console.error("Attendance API error:", error);
//     }

//     stopScanner();
//   };

//   const startScanner = () => {
//     if (!scannerRef.current) {
//       scannerRef.current = new Html5Qrcode(qrCodeRegionId);
//     }

//     Html5Qrcode.getCameras()
//       .then((devices) => {
//         if (devices && devices.length) {
//           let cameraId = devices[0].id;
//           scannerRef.current
//             .start(
//               cameraId,
//               { fps: 10, qrbox: 250 },
//               handleScanSuccess,
//               (errorMessage) => {
//                 console.warn("QR Scan Error", errorMessage);
//               }
//             )
//             .then(() => {
//               setScanning(true);
//               toast.info("📸 Scanner Started", { position: "top-right" });
//             });
//         } else {
//           toast.error("❌ No camera found", { position: "top-right" });
//         }
//       })
//       .catch((err) => {
//         toast.error("Camera error", { position: "top-right" });
//         console.error("Camera Error:", err);
//       });
//   };

//   const stopScanner = () => {
//     if (scannerRef.current) {
//       scannerRef.current
//         .stop()
//         .then(() => {
//           scannerRef.current.clear();
//           setScanning(false);
//           toast.info("📴 Scanner Stopped", { position: "top-right" });
//         })
//         .catch((err) => {
//           console.error("Stop failed", err);
//           toast.error("Failed to stop scanner", { position: "top-right" });
//         });
//     }
//   };

//   return (
//     <div className="qr-scanner-container">
//       <h2>📷 Teacher QR Scanner</h2>

//       <div className="scanner-controls">
//         {!scanning ? (
//           <button className="btn start-btn" onClick={startScanner}>
//             Start Scanning
//           </button>
//         ) : (
//           <button className="btn stop-btn" onClick={stopScanner}>
//             Stop Scanning
//           </button>
//         )}
//       </div>

//       <div id={qrCodeRegionId} className="qr-reader-box"></div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default TQRScanner;


















// import React, { useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Endpoint from "../../apis/Endpoint"; // API URL yahan rakha hai

// const TQRScanner = () => {
//   const qrCodeRegionId = "qr-reader";
//   const scannerRef = useRef(null);
//   const [scanning, setScanning] = useState(false);

//   const handleScanSuccess = async (decodedText) => {
//     try {
//       const qrData = JSON.parse(decodedText);
//       console.log("qrdata ", qrData);

//       const filename = qrData.qrId + ".png";
//       console.log(filename);

//       const response = await fetch(Endpoint.QR, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filename }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message, { position: "top-right" });
//       } else {
//         toast.error(data.message, { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("Failed to mark attendance", { position: "top-right" });
//       console.error("Attendance API error:", error);
//     }

//     stopScanner();
//   };

//   const startScanner = () => {
//     if (!scannerRef.current) {
//       scannerRef.current = new Html5Qrcode(qrCodeRegionId);
//     }

//     Html5Qrcode.getCameras()
//       .then((devices) => {
//         if (devices && devices.length) {
//           let cameraId = devices[0].id;
//           scannerRef.current
//             .start(
//               cameraId,
//               { fps: 10, qrbox: 250 },
//               handleScanSuccess,
//               (errorMessage) => {
//                 console.warn("QR Scan Error", errorMessage);
//               }
//             )
//             .then(() => {
//               setScanning(true);
//               toast.info("📸 Scanner Started", { position: "top-right" });
//             });
//         } else {
//           toast.error("❌ No camera found", { position: "top-right" });
//         }
//       })
//       .catch((err) => {
//         toast.error("Camera error", { position: "top-right" });
//         console.error("Camera Error:", err);
//       });
//   };

//   const stopScanner = () => {
//     if (scannerRef.current && scanning) {  // scanning true hone par hi stop karo
//       scannerRef.current
//         .stop()
//         .then(() => {
//           scannerRef.current.clear();
//           setScanning(false);
//           toast.info("📴 Scanner Stopped", { position: "top-right" });
//         })
//         .catch((err) => {
//           console.error("Stop failed", err);
//           toast.error("Failed to stop scanner", { position: "top-right" });
//         });
//     } else {
//       console.warn("Scanner is not running, so cannot stop");
//     }
//   };

//   return (
//     <div className="qr-scanner-container">
//       <h2>📷 Teacher QR Scanner</h2>

//       <div className="scanner-controls">
//         {!scanning ? (
//           <button className="btn start-btn" onClick={startScanner}>
//             Start Scanning
//           </button>
//         ) : (
//           <button className="btn stop-btn" onClick={stopScanner}>
//             Stop Scanning
//           </button>
//         )}
//       </div>

//       <div id={qrCodeRegionId} className="qr-reader-box"></div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default TQRScanner;
//uper wla cpd working hai 





// TQRScanner.js

import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Endpoint from "../../apis/Endpoint"; // API URL yahan rakha hai
import { useNavigate } from "react-router-dom";

const TQRScanner = () => {
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
        toast.info("📴 Scanner Stopped", { position: "top-right" });
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
        // Attendance mark hone ke baad student ko dashboard pe le jao
        setTimeout(() => {
          navigate("/stundetDashboard");
        }, 2000);
      } else {
        toast.error(data.message, { position: "top-right" });
        // Agar attendance mark nahi hui toh bhi scanner band kar do taaki user dobara try kar sake
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
              toast.info("📸 Scanner Started", { position: "top-right" });
              setLoadingCamera(false);
            })
            .catch((err) => {
              toast.error("Failed to start scanner", { position: "top-right" });
              setLoadingCamera(false);
            });
        } else {
          toast.error("❌ No camera found", { position: "top-right" });
          setLoadingCamera(false);
        }
      })
      .catch((err) => {
        toast.error("Camera error", { position: "top-right" });
        console.error("Camera Error:", err);
        setLoadingCamera(false);
      });
  };

  return (
    <div className="qr-scanner-container">
      <h2>📷 Teacher QR Scanner</h2>

      <div className="scanner-controls">
        {!scanning && !loadingCamera && (
          <button className="btn start-btn" onClick={startScanner}>
            Start Scanning
          </button>
        )}
        {loadingCamera && (
          <button className="btn loading-btn" disabled>
            🔄 Starting Camera...
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
  );
};

export default TQRScanner;
