// slices/roomSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewRoom,
  fetchAllRooms,
  updateRoomDetails,
  deleteRoomById,
  getRoomDetails,
} from "../services/operations/roomAPI";

const initialState = {
  rooms: [],           // ✅ always initialize as array
  currentRoom: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearRoomError: (state) => {
      state.error = null;
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    clearCurrentRoom: (state) => {
      state.currentRoom = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Rooms
      .addCase(fetchAllRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Safely extract rooms array from payload
        state.rooms = Array.isArray(action.payload.rooms)
          ? action.payload.rooms
          : [];
      })
      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Room
      .addCase(addNewRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
      })
      .addCase(addNewRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Room
      .addCase(updateRoomDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoomDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.map(room =>
          room._id === action.payload._id ? action.payload : room
        );
        if (state.currentRoom?._id === action.payload._id) {
          state.currentRoom = action.payload;
        }
      })
      .addCase(updateRoomDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Room
      .addCase(deleteRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter(room => room._id !== action.payload);
        if (state.currentRoom?._id === action.payload) {
          state.currentRoom = null;
        }
      })
      .addCase(deleteRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Room Details
      .addCase(getRoomDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload;
      })
      .addCase(getRoomDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRoomError, setCurrentRoom, clearCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;
