import { apiConnector } from '../apiConnector';
import { bookingEndpoints } from '../apis';

export const bookingAPI = {
  createBooking: async (bookingData) => {
    const response = await apiConnector(
      'POST', 
      bookingEndpoints.CREATE_BOOKING, 
      bookingData
    );
    return response.data;
  },

  getAllBookings: async () => {
    const response = await apiConnector(
      'GET',
      bookingEndpoints.GET_ALL_BOOKINGS
    );
    return response.data;
  },

  getUserBookings: async (userId) => {
    const response = await apiConnector(
      'GET',
      bookingEndpoints.GET_USER_BOOKINGS(userId)
    );
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    const response = await apiConnector(
      'PUT',
      bookingEndpoints.CANCEL_BOOKING(bookingId)
    );
    return response.data;
  },

  getBookingDetails: async (bookingId) => {
    const response = await apiConnector(
      'GET',
      bookingEndpoints.GET_BOOKING_DETAILS(bookingId)
    );
    return response.data;
  }
};