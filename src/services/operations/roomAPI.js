import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { adminEndpoints } from "../apis";

const {
  ADD_ROOM_API,
  GET_ALL_ROOMS_API,
  UPDATE_ROOM_API,
  DELETE_ROOM_API,
  GET_ROOM_DETAILS_API,
} = adminEndpoints;

export const addNewRoom = (formData) => async () => {
  const toastId = toast.loading("Adding room...");
  try {
    const response = await apiConnector(
      "POST",
      ADD_ROOM_API,
      formData,
      {
        // Don't set Content-Type here - let browser set it with boundary
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Room added successfully");
    return response.data;
  } catch (error) {
    console.error("ADD_ROOM_API ERROR:", error);
    toast.error(error.message || "Failed to add room");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const fetchAllRooms = () => async () => {
  const toastId = toast.loading("Loading rooms...");
  try {
    const response = await apiConnector("GET", GET_ALL_ROOMS_API);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.rooms;
  } catch (error) {
    console.error("GET_ALL_ROOMS_API ERROR:", error);
    toast.error("Failed to fetch rooms");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteRoomById = (roomId) => async () => {
  const toastId = toast.loading("Deleting room...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_ROOM_API}/${roomId}`
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Room deleted successfully");
    return roomId;
  } catch (error) {
    console.error("DELETE_ROOM_API ERROR:", error);
    toast.error("Failed to delete room");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Add other API functions (updateRoomDetails, getRoomDetails) similarly
export function updateRoomDetails(token, roomId, formData) {
  return async () => {
    const toastId = toast.loading("Updating room...")
    try {
      const response = await apiConnector("PUT", `${UPDATE_ROOM_API}/${roomId}`, formData, {
        Authorization: `Bearer ${token}`,
      })
      
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Room updated successfully")
      return response.data.room
    } catch (error) {
      console.log("UPDATE_ROOM_API ERROR............", error)
      toast.error(error.response?.data?.message || "Failed to update room")
      throw error
    } finally {
      toast.dismiss(toastId)
    }
  }
}

export function getRoomDetails(token, roomId) {
  return async () => {
    const toastId = toast.loading("Fetching room details...")
    try {
      const response = await apiConnector("GET", `${GET_ROOM_DETAILS_API}/${roomId}`, null, {
        Authorization: `Bearer ${token}`,
      })
      
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      return response.data.room
    } catch (error) {
      console.log("GET_ROOM_DETAILS_API ERROR............", error)
      toast.error("Failed to fetch room details")
      throw error
    } finally {
      toast.dismiss(toastId)
    }
  }
}