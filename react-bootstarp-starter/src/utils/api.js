import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://localhost:7175/api", // Your API URL
});

// Request Interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add JWT to headers
  }

  return config;
});

export default api;
