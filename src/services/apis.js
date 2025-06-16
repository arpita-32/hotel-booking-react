const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";

export const authEndpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API:BASE_URL +  "/auth/signup",
  LOGOUT_API: BASE_URL + "/auth/logout",
  SEND_OTP_API: BASE_URL + "/auth/send-otp",
};

export const profileEndpoints = {
  GET_USER_PROFILE_API: "/profile/details",
  UPDATE_PROFILE_API: "/profile/update",
};

export const roomEndpoints = {
  GET_ALL_ROOMS_API: "/rooms",
  CREATE_ROOM_API: "/rooms/create",
  UPDATE_ROOM_API: "/rooms/update",
  DELETE_ROOM_API: "/rooms/delete",
};

export const bookingEndpoints = {
  CREATE_BOOKING: "/bookings/create",
  GET_ALL_BOOKINGS: "/bookings",
  GET_USER_BOOKINGS: (userId) => `/bookings/user/${userId}`,
  CANCEL_BOOKING: (bookingId) => `/bookings/cancel/${bookingId}`,
  GET_BOOKING_DETAILS: (bookingId) => `/bookings/${bookingId}`,
  UPDATE_BOOKING: (bookingId) => `/bookings/update/${bookingId}`
};