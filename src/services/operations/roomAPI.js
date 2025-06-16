import { apiConnector } from '../apiConnector';
import { roomEndpoints } from '../apis';
const { GET_ALL_ROOMS_API, CREATE_ROOM_API, UPDATE_ROOM_API, DELETE_ROOM_API } = roomEndpoints;

export const fetchAllRoomsAPI = async () => {
  const response = await apiConnector('GET', '/api/rooms');
  return response.data;
};

export const createRoomAPI = async (roomData) => {
  const response = await apiConnector('POST', '/api/rooms', roomData);
  return response.data;
};

export const updateRoomAPI = async (id, roomData) => {
  const response = await apiConnector('PUT', `/api/rooms/${id}`, roomData);
  return response.data;
};

export const deleteRoomAPI = async (id) => {
  await apiConnector('DELETE', `/api/rooms/${id}`);
};

export const roomAPI = {
  getAllRooms: fetchAllRoomsAPI,
  createRoom: createRoomAPI,
  updateRoom: updateRoomAPI,
  deleteRoom: deleteRoomAPI
};