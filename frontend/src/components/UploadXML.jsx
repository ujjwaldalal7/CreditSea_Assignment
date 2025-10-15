// src/components/UploadXML.jsx

import React, { useState } from "react";
import { uploadXML } from "../api/api";
import { Loader2 } from "lucide-react";

const UploadXML = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select an XML file!");
    try {
      setLoading(true);
      await uploadXML(file);
      onUploadSuccess();
    } catch (err) {
      alert("Upload failed. Check console/logs.");
    } finally {
      setLoading(false);
      setFile(null); // Clear file input after attempt
      document.getElementById('file-input').value = ''; // Reset input element
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-3">📂 Upload Experian XML File</h2>
      <div className="flex items-center gap-4">
        <input
          id="file-input"
          type="file"
          accept=".xml"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="bg-blue-500 hover:bg-blue-600 transition-all px-4 py-2 rounded-md font-medium disabled:bg-gray-600"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadXML;