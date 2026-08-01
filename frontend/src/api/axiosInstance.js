import axios from "axios";

/**
 * Centralized Axios API Instance
 * Base URL from VITE_API_URL in .env
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Attach JWT token automatically to all private requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
