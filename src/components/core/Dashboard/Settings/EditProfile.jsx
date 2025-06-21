"use client"

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"
import HighlightText from "../../../common/HighlightText"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"

const GENDERS = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  // Set form values when user data is available
  useEffect(() => {
    if (user) {
      console.log("Setting form values with user data:", user)

      setValue("firstName", user.firstName || "")
      setValue("lastName", user.lastName || "")
      setValue("gender", user.additionalDetails?.gender || "")
      setValue("about", user.additionalDetails?.about || "")
      setValue("contactNumber", user.additionalDetails?.contactNumber || "")

      // Format date properly for input[type="date"]
      if (user.additionalDetails?.dateOfBirth) {
        const date = new Date(user.additionalDetails.dateOfBirth)
        const formattedDate = date.toISOString().split("T")[0]
        setValue("dateOfBirth", formattedDate)
      }
    }
  }, [user, setValue])

  const submitProfileForm = async (data) => {
    try {
      setLoading(true)

      // Format the data properly
      const formData = {
        firstName: data.firstName?.trim(),
        lastName: data.lastName?.trim(),
        gender: data.gender,
        dateOfBirth: data.dateOfBirth || null,
        about: data.about?.trim() || "",
        contactNumber: data.contactNumber?.trim() || "",
      }

      console.log("Submitting profile data:", formData)

      // Wait for the dispatch to complete
      const result = await dispatch(updateProfile(token, formData))

      console.log("Profile update result:", result)

      // Force a re-render by resetting form with new values
      if (result && result.updatedUserDetails) {
        const updatedUser = result.updatedUserDetails
        setValue("firstName", updatedUser.firstName || "")
        setValue("lastName", updatedUser.lastName || "")
        setValue("gender", updatedUser.additionalDetails?.gender || "")
        setValue("about", updatedUser.additionalDetails?.about || "")
        setValue("contactNumber", updatedUser.additionalDetails?.contactNumber || "")

        if (updatedUser.additionalDetails?.dateOfBirth) {
          const date = new Date(updatedUser.additionalDetails.dateOfBirth)
          const formattedDate = date.toISOString().split("T")[0]
          setValue("dateOfBirth", formattedDate)
        }
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error(error.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  // Watch form values for controlled inputs

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-10 md:p-8">
        <h2 className="text-lg font-semibold text-richblack-5 mb-6">
          Edit <HighlightText text="Profile" />
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="form-style w-full"
                {...register("firstName", { required: "First name is required" })}
                disabled={loading}
              />
              {errors.firstName && <span className="-mt-1 text-xs text-yellow-100">{errors.firstName.message}</span>}
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="form-style w-full"
                {...register("lastName", { required: "Last name is required" })}
                disabled={loading}
              />
              {errors.lastName && <span className="-mt-1 text-xs text-yellow-100">{errors.lastName.message}</span>}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-style w-full"
                {...register("dateOfBirth", {
                  required: "Please enter your Date of Birth",
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future",
                  },
                })}
                disabled={loading}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-xs text-yellow-100">{errors.dateOfBirth.message}</span>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                id="gender"
                className="form-style w-full"
                {...register("gender", { required: "Please select your gender" })}
                disabled={loading}
              >
                <option value="">Select Gender</option>
                {GENDERS.map((gender, i) => (
                  <option key={i} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && <span className="-mt-1 text-xs text-yellow-100">{errors.gender.message}</span>}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style w-full"
                {...register("contactNumber", {
                  required: "Please enter your Contact Number",
                  pattern: {
                    value: /^[+]?[1-9][\d]{0,15}$/,
                    message: "Please enter a valid contact number",
                  },
                })}
                disabled={loading}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-xs text-yellow-100">{errors.contactNumber.message}</span>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <textarea
                id="about"
                placeholder="Enter Bio Details"
                className="form-style w-full h-24"
                {...register("about", {
                  maxLength: {
                    value: 500,
                    message: "About section cannot exceed 500 characters",
                  },
                })}
                disabled={loading}
              />
              {errors.about && <span className="-mt-1 text-xs text-yellow-100">{errors.about.message}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-lg bg-richblack-700 py-2 px-5 font-medium text-richblack-50 hover:bg-richblack-600 transition-all"
          disabled={loading}
        >
          Cancel
        </button>
        <IconBtn
          type="submit"
          text={loading ? "Saving..." : "Save"}
          customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
          disabled={loading}
        />
      </div>
    </form>
  )
}
