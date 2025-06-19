import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import roomReducer from '../slices/roomSlice'; // Adjust path as needed


const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    room: roomReducer, // Add the room reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;