import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import hotelImage from "../assets/Images/signuppage.png";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { toast } from "react-hot-toast";
import React from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../services/operations/authAPI";

// Define role types
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

  // Tab data for role selection
  const tabData = [
    {
      id: 1,
      tabName: "Customer",
      type: USER_ROLE.CUSTOMER,
    },
    {
      id: 2,
      tabName: "Admin",
      type: USER_ROLE.ADMIN,
    },
  ];

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

 
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form submitted with:", {...formData, role}); // Debug log
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      await dispatch(signUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role
      }, navigate));
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Section - Left side */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 order-1 md:order-1">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="mt-2 text-gray-600">
                Join Luxury Haven for exclusive benefits
              </p>
            </div>
            
            {/* Role Selection Tabs */}
            <div className="flex bg-gray-100 p-1 gap-x-1 my-6 rounded-full max-w-max mx-auto">
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRole(tab.type)}
                  className={`${
                    role === tab.type
                      ? "bg-orange-500 text-white"
                      : "bg-transparent text-gray-700"
                  } py-2 px-5 rounded-full transition-all duration-200 text-sm font-medium`}
                >
                  {tab.tabName}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
              <div className="flex gap-4">
                <label className="w-full">
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    First Name <span className="text-orange-500">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                    className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </label>
                <label className="w-full">
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    Last Name <span className="text-orange-500">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                    className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </label>
              </div>
              
              <label className="w-full">
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Email Address <span className="text-orange-500">*</span>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </label>
              
              <div className="flex gap-4">
                <label className="relative w-full">
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    Password <span className="text-orange-500">*</span>
                  </p>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Create password"
                    className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition pr-10"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </label>
                
                <label className="relative w-full">
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-orange-500">*</span>
                  </p>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm password"
                    className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition pr-10"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                className="mt-4 rounded-md bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 font-medium transition-colors duration-300"
              >
                Create Account
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
          
          {/* Image Section - Right side */}
          <div className="hidden md:block md:w-1/2 bg-gray-100 order-2 md:order-2">
            <img
              src={hotelImage}
              alt="Luxury hotel room"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;