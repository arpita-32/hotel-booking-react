import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { setUser as setAuthUser } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const { UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API, DELETE_PROFILE_API } = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading image...")
    try {
      if (!token) {
        throw new Error("Authentication token is missing")
      }

      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        {},
        60000,
      )

      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Display Picture Updated Successfully")

      // Update both Redux slices
      const updatedUser = response.data.data
      dispatch(setUser(updatedUser))
      dispatch(setAuthUser(updatedUser))

      return response.data
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)

      if (error.message.includes("timeout")) {
        toast.error("Upload timed out. Please try with a smaller image.")
      } else if (error.message.includes("File size")) {
        toast.error("File too large. Please choose a smaller image.")
      } else if (error.message.includes("Invalid file")) {
        toast.error("Invalid file type. Please upload an image file.")
      } else if (error.message.includes("not authenticated")) {
        toast.error("Please login again")
      } else {
        toast.error(error.response?.data?.message || "Could Not Update Display Picture")
      }

      throw error
    } finally {
      toast.dismiss(toastId)
    }
  }
}


export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting profile...")
    try {
      if (!token) {
        throw new Error("Authentication token is missing")
      }

      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)

      if (error.message.includes("not authenticated")) {
        toast.error("Please login again")
      } else {
        toast.error(error.response?.data?.message || "Could Not Delete Profile")
      }
    } finally {
      toast.dismiss(toastId)
    }
  }
}
