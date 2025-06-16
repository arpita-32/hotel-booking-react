import { createSlice } from '@reduxjs/toolkit';
import { fetchRooms, createRoom } from './roomThunks'; // Thunks moved to separate file

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // Synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default roomSlice.reducer;