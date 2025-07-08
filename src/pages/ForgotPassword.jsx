import React,{ useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import HighlightText from "../components/common/HighlightText";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-black px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-[500px] p-4 sm:p-6 lg:p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-xl sm:text-2xl md:text-[1.875rem] font-semibold leading-[1.5] sm:leading-[2.375rem] text-yellow-50 mb-4">
            {!emailSent ? (
              <>
                Reset your <HighlightText text="password" />
              </>
            ) : (
              "Check your email"
            )}
          </h1>
          <p className="my-3 sm:my-4 text-sm sm:text-base md:text-[1.125rem] leading-[1.5] sm:leading-[1.625rem] text-gray-300">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} className="mt-6">
            {!emailSent && (
              <label className="w-full block mb-4">
                <p className="mb-1 text-xs sm:text-sm md:text-[0.875rem] leading-[1.375rem] text-yellow-50">
                  Email Address <sup className="text-yellow-400">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-lg bg-gray-700 p-3 text-yellow-50 border-b border-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-4 sm:mt-6 w-full rounded-lg bg-yellow-500 py-3 px-4 font-medium text-black hover:bg-yellow-400 transition-colors duration-200"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="group">
              <p className="flex items-center gap-x-2 text-yellow-50 text-sm sm:text-base group-hover:text-yellow-400 transition-colors">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;