import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomAPI } from '../services/operations/roomAPI';
export const fetchRooms = createAsyncThunk(
  'rooms/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await roomAPI.getAllRooms();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const createRoom = createAsyncThunk(
  'rooms/create',
  async (roomData, { rejectWithValue }) => {
    try {
      return await roomAPI.createRoom(roomData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const updateRoom = createAsyncThunk(
  'rooms/update',
  async ({ id, roomData }, { rejectWithValue }) => {
    try {
      return await roomAPI.updateRoom(id, roomData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const deleteRoom = createAsyncThunk(
  'rooms/delete',
  async (id, { rejectWithValue }) => {
    try {
      await roomAPI.deleteRoom(id);
      return id; // Return the ID for the fulfilled case
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);