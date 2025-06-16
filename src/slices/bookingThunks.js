import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookingAPI } from '../services/operations/bookingAPI';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await bookingAPI.getAllBookings();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createNewBooking = createAsyncThunk(
  'bookings/create',
  async (bookingData, { rejectWithValue }) => {
    try {
      return await bookingAPI.createBooking(bookingData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const cancelUserBooking = createAsyncThunk(
  'bookings/cancel',
  async (bookingId, { rejectWithValue }) => {
    try {
      return await bookingAPI.cancelBooking(bookingId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);