import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiConnector } from '../apiconnector';
import { adminEndpoints } from '../apis';
import { toast } from 'react-hot-toast';

const { 
  ADD_ROOM_API, 
  GET_ALL_ROOMS_API, 
  UPDATE_ROOM_API, 
  DELETE_ROOM_API, 
  GET_ROOM_DETAILS_API 
} = adminEndpoints;

// Fetch all rooms
export const fetchAllRooms = createAsyncThunk(
  'room/fetchAllRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector("GET", GET_ALL_ROOMS_API);
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data.rooms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add new room
// Update the addNewRoom thunk to properly handle FormData
// roomAPI.js
export const addNewRoom = createAsyncThunk(
  'room/addNewRoom',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "POST", 
        adminEndpoints.ADD_ROOM_API, 
        formData,
        {
          // No Content-Type header - handled by apiConnector
        }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to add room');
      }
      
      return response.data.room;
    } catch (error) {
      // The apiConnector already enhanced the error
      return rejectWithValue(error);
    }
  }
);

// Delete room
export const deleteRoomById = createAsyncThunk(
  'room/deleteRoomById',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_ROOM_API}/${roomId}`,
        null, // No body needed for DELETE
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete room');
      }
      
      toast.success("Room deleted successfully");
      return roomId;
    } catch (error) {
      toast.error(error.message || 'Failed to delete room');
      return rejectWithValue(error.message);
    }
  }
);

// Update room details
export const updateRoomDetails = createAsyncThunk(
  'room/updateRoomDetails',
  async ({ roomId, formData }, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "PUT", 
        `${UPDATE_ROOM_API}/${roomId}`, 
        formData,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      );
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      toast.success("Room updated successfully");
      return response.data.room;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get room details
export const getRoomDetails = createAsyncThunk(
  'room/getRoomDetails',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        `${GET_ROOM_DETAILS_API}/${roomId}`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      );
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data.room;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);