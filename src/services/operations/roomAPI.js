import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { adminEndpoints } from '../apis';

const { 
  ADD_ROOM_API, 
  GET_ALL_ROOMS_API, 
  UPDATE_ROOM_API, 
  DELETE_ROOM_API, 
  GET_ROOM_DETAILS_API 
} = adminEndpoints;

// ✅ Fetch all rooms
export const fetchAllRooms = createAsyncThunk(
  'room/fetchAllRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector("GET", GET_ALL_ROOMS_API);
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }

      // ✅ Return full object { rooms: [...] }
      return { rooms: response.data.rooms };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add new room
export const addNewRoom = createAsyncThunk(
  'room/addNewRoom',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiConnector("POST", ADD_ROOM_API, formData);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to add room');
      }

      toast.success("Room added successfully");
      return response.data.room; // ✅ one room object
    } catch (error) {
      toast.error(error.message || 'Failed to add room');
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete room
export const deleteRoomById = createAsyncThunk(
  'room/deleteRoomById',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_ROOM_API}/${roomId}`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete room');
      }

      toast.success("Room deleted successfully");
      return roomId; // ✅ only return ID
    } catch (error) {
      toast.error(error.message || 'Failed to delete room');
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update room
export const updateRoomDetails = createAsyncThunk(
  'room/updateRoomDetails',
  async ({ roomId, formData }, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "PUT",
        `${UPDATE_ROOM_API}/${roomId}`,
        formData,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );

      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }

      toast.success("Room updated successfully");
      return response.data.room; // ✅ one updated room
    } catch (error) {
      toast.error(error.message || 'Failed to update room');
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Get room details
export const getRoomDetails = createAsyncThunk(
  'room/getRoomDetails',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        `${GET_ROOM_DETAILS_API}/${roomId}`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );

      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }

      return response.data.room; // ✅ one room object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
