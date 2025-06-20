import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Don't overwrite Content-Type for FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access detected');
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
// apiConnector.js
export const apiConnector = async (method, url, bodyData, headers = {}, params = {}) => {
  try {
    const config = {
      method,
      url,
      params,
      headers: {
        ...headers,
        'X-Request-ID': generateRequestId(),
      },
    };

    // In your apiConnector.js
const token = localStorage.getItem('token');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}


if (bodyData instanceof FormData) {
  config.data = bodyData;
  delete config.headers['Content-Type'];
} else if (bodyData !== null && bodyData !== undefined) {
  config.data = bodyData;
  config.headers['Content-Type'] = 'application/json';
}


    const response = await axiosInstance(config);
    return response;
    
  } catch (error) {
    // Enhanced error handling
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       'Something went wrong';
    
    const apiError = new Error(errorMessage);
    apiError.response = error.response;
    apiError.status = error.response?.status;
    throw apiError;
  }
};

// Helper function to generate unique request IDs
function generateRequestId() {
  return 'req_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}