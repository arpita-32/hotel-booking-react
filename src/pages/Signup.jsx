import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import hotelImage from "../assets/Images/signuppage.png";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signUp } from "../services/operations/authAPI";

const USER_ROLE = {
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState(USER_ROLE.CUSTOMER);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(signUp(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.confirmPassword,
        role,
        navigate
      ));
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 order-2 md:order-1">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Join Luxury Haven for exclusive benefits
              </p>
            </div>
            
            {/* Role Selection */}
            <div className="flex bg-gray-100 p-1 gap-x-1 my-4 sm:my-6 rounded-full max-w-max mx-auto">
              <button
                type="button"
                onClick={() => setRole(USER_ROLE.CUSTOMER)}
                className={`${
                  role === USER_ROLE.CUSTOMER
                    ? "bg-yellow-500 text-white"
                    : "bg-transparent text-gray-700"
                } py-1 sm:py-2 px-4 sm:px-5 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole(USER_ROLE.ADMIN)}
                className={`${
                  role === USER_ROLE.ADMIN
                    ? "bg-yellow-500 text-white"
                    : "bg-transparent text-gray-700"
                } py-1 sm:py-2 px-4 sm:px-5 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium`}
              >
                Admin
              </button>
            </div>
            
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-3 sm:gap-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-x-4">
                <label className="w-full">
                  <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-700">
                    First Name <sup className="text-yellow-500">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                    className="w-full rounded-[0.5rem] bg-gray-100 p-2 sm:p-[12px] text-gray-800 text-sm sm:text-base"
                    autoComplete="given-name"
                  />
                </label>
                <label className="w-full">
                  <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-700">
                    Last Name <sup className="text-yellow-500">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                    className="w-full rounded-[0.5rem] bg-gray-100 p-2 sm:p-[12px] text-gray-800 text-sm sm:text-base"
                    autoComplete="family-name"
                  />
                </label>
              </div>
              
              <label className="w-full">
                <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-700">
                  Email Address <sup className="text-yellow-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full rounded-[0.5rem] bg-gray-100 p-2 sm:p-[12px] text-gray-800 text-sm sm:text-base"
                  autoComplete="email"
                />
              </label>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-x-4">
                <label className="relative w-full">
                  <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-700">
                    Password <sup className="text-yellow-500">*</sup>
                  </p>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Create Password"
                    className="w-full rounded-[0.5rem] bg-gray-100 p-2 sm:p-[12px] pr-8 sm:pr-10 text-gray-800 text-sm sm:text-base"
                    autoComplete="new-password"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 sm:right-3 top-[30px] sm:top-[38px] z-[10] cursor-pointer text-gray-500"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={20} className="sm:w-6 sm:h-6 w-5 h-5" />
                    ) : (
                      <AiOutlineEye fontSize={20} className="sm:w-6 sm:h-6 w-5 h-5" />
                    )}
                  </span>
                </label>
                
                <label className="relative w-full">
                  <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-700">
                    Confirm Password <sup className="text-yellow-500">*</sup>
                  </p>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="w-full rounded-[0.5rem] bg-gray-100 p-2 sm:p-[12px] pr-8 sm:pr-10 text-gray-800 text-sm sm:text-base"
                    autoComplete="new-password"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-2 sm:right-3 top-[30px] sm:top-[38px] z-[10] cursor-pointer text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={20} className="sm:w-6 sm:h-6 w-5 h-5" />
                    ) : (
                      <AiOutlineEye fontSize={20} className="sm:w-6 sm:h-6 w-5 h-5" />
                    )}
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 sm:mt-6 rounded-[8px] bg-yellow-500 py-2 sm:py-[8px] px-4 sm:px-[12px] font-medium text-white text-sm sm:text-base ${
                  isLoading ? "opacity-75" : "hover:bg-yellow-600"
                } transition-colors`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
              
              <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-yellow-500 hover:text-yellow-600"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-100 order-1 md:order-2">
            <img
              src={hotelImage}
              alt="Luxury hotel room"
              className="w-full h-24 sm:h-64 md:h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;