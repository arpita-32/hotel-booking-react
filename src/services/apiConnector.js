import axios from "axios";

// Create axios instance with default configuration
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // http://localhost:4000/api/v1
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (token expired/invalid)
      localStorage.removeItem('token');
      window.location.href = '/login?session=expired';
    }
    return Promise.reject(error);
  }
);

/**
 * Enhanced API connector function
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {string} url - API endpoint URL
 * @param {object} [bodyData] - Request body data
 * @param {object} [headers] - Additional headers
 * @param {object} [params] - Query parameters
 * @returns {Promise} - Axios response
 */
export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    // Log request details
    console.groupCollapsed(`API Request: ${method} ${url}`);
    console.log('Request Data:', bodyData);
    console.log('Headers:', headers);
    console.log('Params:', params);
    console.groupEnd();

    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers: {
        ...headers,
        'X-Request-ID': generateRequestId(), // Add unique request ID
      },
      params
    });

    // Log successful response
    console.groupCollapsed(`API Response: ${method} ${url} (${response.status})`);
    console.log('Response Data:', response.data);
    console.log('Full Response:', response);
    console.groupEnd();

    return response;
  } catch (error) {
    // Enhanced error logging
    const errorDetails = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      requestData: error.config?.data,
      responseData: error.response?.data,
      message: error.message,
    };

    console.groupCollapsed(`API Error: ${method} ${url} (${error.response?.status || 'No Response'})`);
    console.error('Error Details:', errorDetails);
    console.groupEnd();

    // Convert specific error statuses to more readable messages
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(data.message || 'Bad request');
        case 401:
          throw new Error(data.message || 'Unauthorized access');
        case 403:
          throw new Error(data.message || 'Forbidden');
        case 404:
          throw new Error(data.message || 'Resource not found');
        case 500:
          throw new Error(data.message || 'Internal server error');
        default:
          throw new Error(data.message || `Request failed with status ${status}`);
      }
    } else if (error.request) {
      throw new Error('Network error - no response received');
    } else {
      throw new Error(error.message || 'Request setup error');
    }
  }
};

// Helper function to generate unique request IDs
function generateRequestId() {
  return 'req_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}