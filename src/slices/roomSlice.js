import { createSlice } from "@reduxjs/toolkit"
import {
  addNewRoom,
  fetchAllRooms,
  updateRoomDetails,
  deleteRoomById,
  getRoomDetails,
} from "../services/roomAPI"

const initialState = {
  rooms: [],
  currentRoom: null,
  loading: false,
  error: null,
}

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearRoomError: (state) => {
      state.error = null
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload
    },
    clearCurrentRoom: (state) => {
      state.currentRoom = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Room
      .addCase(addNewRoom.pending, (state) => {
        state.loading = true
      })
      .addCase(addNewRoom.fulfilled, (state, action) => {
        state.loading = false
        state.rooms.push(action.payload)
      })
      .addCase(addNewRoom.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Fetch All Rooms
      .addCase(fetchAllRooms.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        state.loading = false
        state.rooms = action.payload
      })
      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Room
      .addCase(updateRoomDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(updateRoomDetails.fulfilled, (state, action) => {
        state.loading = false
        state.rooms = state.rooms.map(room =>
          room._id === action.payload._id ? action.payload : room
        )
        if (state.currentRoom?._id === action.payload._id) {
          state.currentRoom = action.payload
        }
      })
      .addCase(updateRoomDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Delete Room
      .addCase(deleteRoomById.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteRoomById.fulfilled, (state, action) => {
        state.loading = false
        state.rooms = state.rooms.filter(room => room._id !== action.payload)
        if (state.currentRoom?._id === action.payload) {
          state.currentRoom = null
        }
      })
      .addCase(deleteRoomById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Get Room Details
      .addCase(getRoomDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.loading = false
        state.currentRoom = action.payload
      })
      .addCase(getRoomDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearRoomError, setCurrentRoom, clearCurrentRoom } = roomSlice.actions
export default roomSlice.reducer