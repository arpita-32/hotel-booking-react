import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearProfile(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;