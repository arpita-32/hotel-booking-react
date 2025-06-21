// Utility functions for authentication
export const getTokenFromStorage = () => {
  try {
    const token = localStorage.getItem("token")
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
    if (!user) return null
    
    const parsedUser = JSON.parse(user)
    // Ensure consistent structure
    return {
      ...parsedUser,
      additionalDetails: parsedUser.additionalDetails || {}
    }
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

export const verifyAuthOnLoad = () => {
  const token = getTokenFromStorage()
  const isExpired = isTokenExpired(token)
  
  if (isExpired) {
    clearAuthStorage()
  }
  
  return {
    isAuthenticated: !!token && !isExpired,
    token: isExpired ? null : token,
    user: isExpired ? null : getUserFromStorage()
  }
}