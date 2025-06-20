const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const profileEndpoints = {
  GET_USER_PROFILE_API:BASE_URL + "/profile/getProfile",
};
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}
export const adminEndpoints = {
  ADD_ROOM_API: BASE_URL + "/rooms/createRoom",
  GET_ALL_ROOMS_API: BASE_URL + "/rooms/getAllRooms",
  GET_ROOM_DETAILS_API: BASE_URL + "/rooms/getRoomDetails",
  UPDATE_ROOM_API: BASE_URL + "/rooms/updateRoom",
  DELETE_ROOM_API: BASE_URL + "/rooms/deleteRoom",
  
  PUBLIC_GET_ALL_ROOMS_API: BASE_URL + "/public/rooms",
  PUBLIC_GET_ROOM_DETAILS_API: BASE_URL + "/public/rooms/:roomId",
};
