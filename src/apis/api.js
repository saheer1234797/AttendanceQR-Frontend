// api.js (एक बार config कर लो)
import axios from "axios";
import  BASE_URL  from "./Endpoint";

const api = axios.create({
  baseURL: BASE_URL
});

// हर request से पहले token जोड़ दो
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
