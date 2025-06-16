import axios from "axios";

// 1. Axios instance with defaults
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000", // Fallback for dev
  withCredentials: true, // For cookies/auth headers
  timeout: 10000, // Avoid hanging requests
});

// 2. Generic API connector
export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers: headers || {
        "Content-Type": "application/json", // Default to JSON
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error; // Re-throw for error handling in components
  }
};