import { createSlice } from "@reduxjs/toolkit"
import { getTokenFromStorage, getUserFromStorage } from "../utils/authUtils"

const initialState = {
  signupData: null,
  loading: false,
  token: getTokenFromStorage(),
  user: getUserFromStorage(),
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
      if (action.payload) {
        // Store JWT token as plain string, not JSON
        localStorage.setItem("token", action.payload)
      } else {
        localStorage.removeItem("token")
      }
    },
    setUser(state, action) {
      state.user = action.payload
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload))
      } else {
        localStorage.removeItem("user")
      }
    },
    logout(state) {
      state.token = null
      state.user = null
      state.signupData = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
})

export const { setSignupData, setLoading, setToken, setUser, logout } = authSlice.actions

export default authSlice.reducer
