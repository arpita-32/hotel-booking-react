import { createSlice } from "@reduxjs/toolkit"
import { getTokenFromStorage, getUserFromStorage, isTokenExpired, clearAuthStorage } from "../utils/authUtils"

const initialState = {
  signupData: null,
  loading: false,
  token: getTokenFromStorage(),
  user: getUserFromStorage(),
  isAuthenticated: !isTokenExpired(getTokenFromStorage()),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
      state.isAuthenticated = !isTokenExpired(action.payload)
      if (action.payload) {
        localStorage.setItem("token", action.payload)
      } else {
        localStorage.removeItem("token")
      }
    },
    setUser(state, action) {
      const user = action.payload
      state.user = user
      
      if (user) {
        // Ensure additionalDetails exists
        const userWithDetails = {
          ...user,
          additionalDetails: user.additionalDetails || {}
        }
        localStorage.setItem("user", JSON.stringify(userWithDetails))
      } else {
        localStorage.removeItem("user")
      }
    },
    logout(state) {
      state.token = null
      state.user = null
      state.signupData = null
      state.isAuthenticated = false
      clearAuthStorage()
    },
    checkAuth(state) {
      const token = getTokenFromStorage()
      const isExpired = isTokenExpired(token)
      state.isAuthenticated = !!token && !isExpired
      if (isExpired) {
        state.token = null
        state.user = null
        clearAuthStorage()
      }
    }
  },
})

export const { 
  setSignupData, 
  setLoading, 
  setToken, 
  setUser, 
  logout,
  checkAuth
} = authSlice.actions

export default authSlice.reducer