"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"
import HighlightText from "../../../common/HighlightText"
import { toast } from "react-hot-toast"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()

  const newPassword = watch("newPassword")

  const submitPasswordForm = async (data) => {
    try {
      console.log("🔐 Submitting password change...")
      console.log("Token available:", token ? "Yes" : "No")

      if (!token) {
        toast.error("Please login again to change password")
        navigate("/login")
        return
      }

      setLoading(true)

      // Call the API directly (not as a Redux action)
      await changePassword(token, data)

      // Reset form on success
      reset()
      setShowOldPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)

      toast.success("Password updated successfully!")
    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message)
      if (error.message.includes("not authenticated")) {
        navigate("/login")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-richblack-5 mb-6">
          Update <HighlightText text="Password" />
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="oldPassword" className="lable-style">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style w-full !pr-10"
              {...register("oldPassword", {
                required: "Current password is required",
              })}
              autoComplete="current-password"
              disabled={loading}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.oldPassword && <span className="-mt-1 text-xs text-yellow-100">{errors.oldPassword.message}</span>}
          </div>

          <div className="relative">
            <label htmlFor="newPassword" className="lable-style">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style w-full !pr-10"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              autoComplete="new-password"
              disabled={loading}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.newPassword && <span className="-mt-1 text-xs text-yellow-100">{errors.newPassword.message}</span>}
          </div>

          <div className="relative">
            <label htmlFor="confirmNewPassword" className="lable-style">
              Confirm New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              className="form-style w-full !pr-10"
              {...register("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
              autoComplete="new-password"
              disabled={loading}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.confirmNewPassword && (
              <span className="-mt-1 text-xs text-yellow-100">{errors.confirmNewPassword.message}</span>
            )}
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
          text={loading ? "Updating..." : "Update Password"}
          customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
          disabled={loading}
        />
      </div>
    </form>
  )
}
