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
export const apiConnector = async (method, url, bodyData, headers = {}, params = {}) => {
  try {
    const config = {
      method,
      url,
      headers: {
        ...headers,
        'X-Request-ID': generateRequestId(),
      },
      params,
    };

    // Handle FormData differently from regular JSON
    if (bodyData instanceof FormData) {
      config.data = bodyData;
      // Don't set Content-Type header - browser will set it with boundary
      delete config.headers['Content-Type'];
    } else {
      config.data = bodyData;
      config.headers['Content-Type'] = 'application/json';
    }

    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    // Enhanced error handling
    let errorMessage = 'Something went wrong';
    
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data?.message || 
                    error.response.statusText || 
                    `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server - is the backend running?';
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || 'Request setup error';
    }

    // Create a new Error object with the proper message
    const apiError = new Error(errorMessage);
    // Attach additional info
    apiError.isAxiosError = true;
    apiError.response = error.response;
    apiError.config = error.config;
    
    throw apiError;
  }
};

// Helper function to generate unique request IDs
function generateRequestId() {
  return 'req_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}