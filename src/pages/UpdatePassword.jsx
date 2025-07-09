import React,{ useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import HighlightText from "../components/common/HighlightText";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-[500px] p-4 sm:p-6 lg:p-8 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-xl sm:text-2xl md:text-[1.875rem] font-semibold leading-[1.5] sm:leading-[2.375rem] text-yellow-50 mb-4">
            Choose new <HighlightText text="password" />
          </h1>
          <p className="my-3 sm:my-4 text-sm sm:text-base md:text-[1.125rem] leading-[1.5] sm:leading-[1.625rem] text-gray-300">
            Almost done. Enter your new password and you're all set.
          </p>
          <form onSubmit={handleOnSubmit} className="mt-6">
            <label className="relative block mb-4">
              <p className="mb-1 text-xs sm:text-sm md:text-[0.875rem] leading-[1.375rem] text-yellow-50">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full rounded-lg bg-gray-800 p-3 text-yellow-50 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} className="text-gray-300" />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-gray-300" />
                )}
              </span>
            </label>
            <label className="relative block mb-6">
              <p className="mb-1 text-xs sm:text-sm md:text-[0.875rem] leading-[1.375rem] text-yellow-50">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-gray-800 p-3 text-yellow-50 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} className="text-gray-300" />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-gray-300" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-500 py-3 px-4 font-medium text-white hover:bg-yellow-600 transition-colors duration-200"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="group">
              <p className="flex items-center gap-x-2 text-yellow-50 text-sm sm:text-base group-hover:text-yellow-200 transition-colors">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;