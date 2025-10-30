// src/api/api.js
import axios from "axios";

// ✅ Axios instance with deployed server URL
const api = axios.create({
  baseURL: "https://panterypalsideback.onrender.com/api",
});

// ✅ Attach token automatically for each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ API functions

// Get items that will expire soon
export const getSoonExpiringItems = () => api.get("/items/alerts/soon");

// Get all alerts for the current user
export const getAllAlerts = () => api.get("/alerts");

// Mark a specific alert as seen
export const markAlertAsSeen = (alertId) =>
  api.patch(`/alerts/${alertId}/seen`);

export default api;
