import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/reports";

export const getReportData = async () => {
  return axios.get(API_BASE_URL);
};

export const uploadXML = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};