const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://hotel-booking-react-2926.onrender.com";

export const endpoints = {
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/api/v1/profile/getUserDetails",

}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/api/v1/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/api/v1/profile/deleteProfile",
}
export const adminEndpoints = {
  ADD_ROOM_API: BASE_URL + "/api/v1/rooms/createRoom",
  GET_ALL_ROOMS_API: BASE_URL + "/api/v1/rooms/getAllRooms",
  GET_ROOM_DETAILS_API: BASE_URL + "/api/v1/rooms/getRoomDetails",
  UPDATE_ROOM_API: BASE_URL + "/api/v1/rooms/updateRoom",
  DELETE_ROOM_API: BASE_URL + "/api/v1/rooms/deleteRoom",

  PUBLIC_GET_ALL_ROOMS_API: BASE_URL + "/api/v1/public/rooms",
  PUBLIC_GET_ROOM_DETAILS_API: BASE_URL + "/api/v1/public/rooms/:roomId",
};