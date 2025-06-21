import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  timeout: 30000, // Increased default timeout to 30 seconds
  maxContentLength: 10 * 1024 * 1024, // 10MB max content length
  maxBodyLength: 10 * 1024 * 1024, // 10MB max body length
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (as plain string)
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Don't overwrite Content-Type if sending FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access detected")
      // Clear invalid token
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      // Redirect to login if needed
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }

    // Handle timeout errors specifically
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      error.message = "Request timeout - please try again"
    }

    return Promise.reject(error)
  },
)

/**
 * Enhanced API connector function
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {string} url - API endpoint URL
 * @param {object} [bodyData] - Request body data
 * @param {object} [headers] - Additional headers (e.g. Authorization)
 * @param {object} [params] - Query parameters
 * @param {number} [customTimeout] - Custom timeout in milliseconds
 * @returns {Promise} - Axios response
 */
export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}, customTimeout = null) => {
  try {
    const config = {
      method,
      url,
      params,
      headers: {
        ...headers,
        "X-Request-ID": generateRequestId(),
      },
      // Use custom timeout if provided, otherwise use default
      timeout: customTimeout || axiosInstance.defaults.timeout,
    }

    // Set body
    if (bodyData instanceof FormData) {
      config.data = bodyData
      // Let browser set Content-Type for multipart
      delete config.headers["Content-Type"]
    } else if (bodyData !== null && bodyData !== undefined) {
      config.data = bodyData
      config.headers["Content-Type"] = "application/json"
    }

    // Add upload progress for FormData
    if (bodyData instanceof FormData) {
      config.onUploadProgress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(`Upload Progress: ${percentCompleted}%`)
        }
      }
    }

    const response = await axiosInstance(config)
    return response
  } catch (error) {
    // Enhanced error handling
    let errorMessage = "Something went wrong"

    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timeout - please try again"
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }

    const apiError = new Error(errorMessage)
    apiError.response = error.response
    apiError.status = error.response?.status
    apiError.code = error.code
    throw apiError
  }
}

// Helper function to generate unique request IDs
function generateRequestId() {
  return "req_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
}
