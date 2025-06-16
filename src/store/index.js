import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import roomReducer from "../slices/roomSlice";
import bookingReducer from "../slices/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;