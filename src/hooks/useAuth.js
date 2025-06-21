// Custom hook for authentication
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../slices/authSlice"
import { isTokenExpired, clearAuthStorage } from "../utils/authUtils"

export const useAuth = () => {
  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkAuthStatus = () => {
    if (!token || isTokenExpired(token)) {
      clearAuthStorage()
      dispatch(logout())
      navigate("/login")
      return false
    }
    return true
  }

  const logoutUser = () => {
    clearAuthStorage()
    dispatch(logout())
    navigate("/login")
  }

  return {
    token,
    user,
    isAuthenticated: token && !isTokenExpired(token),
    checkAuthStatus,
    logoutUser,
  }
}
