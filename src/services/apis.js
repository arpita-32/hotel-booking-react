const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const profileEndpoints = {
  GET_USER_PROFILE_API:BASE_URL + "/profile/details",
  UPDATE_PROFILE_API: BASE_URL + "/profile/update",
};

export const roomEndpoints = {
  GET_ALL_ROOMS_API:BASE_URL + "/rooms",
  CREATE_ROOM_API:BASE_URL + "/rooms/create",
  UPDATE_ROOM_API:BASE_URL + "/rooms/update",
  DELETE_ROOM_API:BASE_URL + "/rooms/delete",
};

export const bookingEndpoints = {
  CREATE_BOOKING:BASE_URL + "/bookings/create",
  GET_ALL_BOOKINGS:BASE_URL + "/bookings",
 
};