import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Endpoint from "../../apis/Endpoint";
import { useNavigate } from "react-router-dom";


function UploadStudents() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate();
  const handleUpload = async () => {
    if (!file) {
      toast.warning(" Please select a file before uploading");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(Endpoint.BulkUplodeStudent, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(
          ` Upload Completed!\nTotal Rows: ${data.totalRows}\nInserted: ${data.insertedCount}\nFailed: ${data.failedCount}`,
          { autoClose: 5000 }
        );
      } else {
        toast.error(`Upload failed: ${data.message || "Server Error"}`);
      }
    } catch (err) {
      toast.error(" Something went wrong while uploading");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return <>
               <button 
    className="btn btn-outline-primary mb-3" 
    onClick={() => navigate(-1)}
  >
    ⬅ Back
  </button>

    <div className="container mt-5">
   
      <div className="card shadow-lg p-4">
        <h3 className="mb-3 text-center bi bi-upload"> Bulk Upload Students</h3>
        <p className="text-muted text-center">
          Upload an Excel/CSV file to add multiple students at once.
        </p>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept=".xlsx, .xls, .csv"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="d-flex justify-content-between">
 
          <button
            className="btn btn-secondary"
            onClick={() => setFile(null)}
            disabled={loading}
          >
            Reset
          </button>
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
    </>
}

export default UploadStudents;
