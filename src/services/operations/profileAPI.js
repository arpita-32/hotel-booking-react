import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API } = profileEndpoints

// profileAPI.js
export function getUserDetails(token, navigate) {
  return async (dispatch, getState) => {
    // Check if we already have user data
    const currentUser = getState().profile.user
    if (currentUser) return // Skip if we already have data

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.error("GET_USER_DETAILS API ERROR:", error)
      toast.error("Could Not Get User Details")
    } finally {
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
}