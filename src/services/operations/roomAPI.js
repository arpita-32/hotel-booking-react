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
  async (data, { rejectWithValue }) => {
    try {
      const { roomId, formData } = data;
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      // Ensure roomId is included in the formData
      const formDataWithId = new FormData();
      formDataWithId.append('roomId', roomId);
      
      // Copy all entries from original formData
      for (let [key, value] of formData.entries()) {
        formDataWithId.append(key, value);
      }

      const response = await apiConnector(
        "PUT",
        UPDATE_ROOM_API,
        formDataWithId,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Ensure the response includes the full updated room object
      if (!response.data.room || !response.data.room._id) {
        throw new Error('Invalid room data received from server');
      }


      toast.success("Room updated successfully");
      return response.data.room;
    } catch (error) {
      console.error('Update room error:', error);
      toast.error(error.message || 'Failed to update room');
      
      if (error.response?.status === 401) {
        // Optional: Handle logout here if needed
      }
      
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
