import React, { useState } from "react";
import { uploadXML } from "../api/api";
import { Loader2, CheckCircle, Upload } from "lucide-react";
import { toast } from "react-hot-toast";

const UploadXML = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) {
        toast.error("Please select an XML file!");
        return;
    }
    setSuccess(false); 
    
    try {
      setLoading(true);
      await uploadXML(file);
      setSuccess(true);
      toast.success("File processed and data loaded!");
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Check server logs.");
    } finally {
      setLoading(false);
      setFile(null); 
      document.getElementById('file-input').value = '';
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-2xl border border-gray-700 w-full transform transition-all duration-300 hover:shadow-blue-500/40">
      <h2 className="text-xl font-bold mb-3 text-white flex items-center">
        <Upload className="w-5 h-5 mr-2 text-blue-400"/> XML File Uploader
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          id="file-input"
          type="file"
          accept=".xml"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setSuccess(false);
          }}
          className="w-full md:w-auto text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer file:shadow-md transition-colors duration-300"
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-300 w-full md:w-32 flex justify-center items-center ${loading || !file ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5 text-white" />
          ) : success ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            "Process"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadXML;