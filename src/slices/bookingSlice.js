import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBookings,
  createNewBooking,
  cancelUserBooking
} from './bookingThunks';

const initialState = {
  bookings: [],
  userBookings: [],
  currentBooking: null,
  status: 'idle',
  error: null
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    clearBookingError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(createNewBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.userBookings.push(action.payload);
      })
      .addCase(cancelUserBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map(booking => 
          booking.id === action.payload.id ? action.payload : booking
        );
        state.userBookings = state.userBookings.filter(
          booking => booking.id !== action.payload.id
        );
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  }
});

export const { setCurrentBooking, clearBookingError } = bookingSlice.actions;
export default bookingSlice.reducer;