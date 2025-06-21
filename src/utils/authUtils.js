// Utility functions for authentication
export const getTokenFromStorage = () => {
  try {
    const token = localStorage.getItem("token")
    // JWT tokens are stored as plain strings, not JSON
    return token || null
  } catch (error) {
    console.error("Error getting token from localStorage:", error)
    localStorage.removeItem("token")
    return null
  }
}

export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Error parsing user from localStorage:", error)
    localStorage.removeItem("user")
    return null
  }
}

export const clearAuthStorage = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const isTokenExpired = (token) => {
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch (error) {
    console.error("Error checking token expiration:", error)
    return true
  }
}
