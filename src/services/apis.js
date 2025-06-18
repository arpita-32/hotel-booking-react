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
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}
export const adminEndpoints = {
  ADD_ROOM_API: "/admin/rooms/add",
  GET_ALL_ROOMS_API: "/admin/rooms",
  UPDATE_ROOM_API: "/admin/rooms/update",
  DELETE_ROOM_API: "/admin/rooms/delete",
  GET_ROOM_DETAILS_API: "/admin/rooms/details",
  GET_ALL_BOOKINGS_API: "/admin/bookings",
  UPDATE_BOOKING_STATUS_API: "/admin/bookings/update-status",
  GET_ALL_USERS_API: "/admin/users",
  UPDATE_USER_ROLE_API: "/admin/users/update-role",
};
