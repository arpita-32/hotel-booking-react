import { createSlice } from "@reduxjs/toolkit"

// Read from localStorage
const storedProfileUser = localStorage.getItem("profileUser")

const initialState = {
  user: storedProfileUser ? JSON.parse(storedProfileUser) : null,
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      // Persist to localStorage
      if (action.payload) {
        localStorage.setItem("profileUser", JSON.stringify(action.payload))
      } else {
        localStorage.removeItem("profileUser")
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions
export default profileSlice.reducer
