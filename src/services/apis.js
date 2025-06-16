export const authEndpoints = {
  LOGIN_API: "/auth/login",
  SIGNUP_API: "/auth/signup",
  LOGOUT_API: "/auth/logout",
  SEND_OTP_API: "/auth/send-otp",
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