import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import HighlightText from "../../../common/HighlightText";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-richblack-5 mb-6">
          <HighlightText text="Password" />
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
  {...register("oldPassword", { required: true })}
  autoComplete="current-password"
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
            {errors.oldPassword && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please enter your Current Password.
              </span>
            )}
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
  {...register("newPassword", { required: true })}
  autoComplete="new-password"
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
            {errors.newPassword && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please enter your New Password.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-lg bg-richblack-700 py-2 px-5 font-medium text-richblack-50 hover:bg-richblack-600 transition-all"
        >
          Cancel
        </button>
        <IconBtn 
          type="submit" 
          text="Update" 
          customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
        />
      </div>
    </form>
  );
}