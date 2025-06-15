import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import hotelImage from "../assets/Images/loginpage.png";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import React from "react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Section - Now on the left */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 order-1 md:order-1">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="mt-2 text-gray-600">
                Sign in to your Luxury Haven account
              </p>
            </div>
            
            <form onSubmit={handleOnSubmit} className="mt-6 flex flex-col gap-y-4">
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
              
              <label className="relative">
                <p className="mb-1 text-sm font-medium text-gray-700">
                  Password <span className="text-orange-500">*</span>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter your password"
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
                <Link to="/forgot-password">
                  <p className="mt-1 ml-auto max-w-max text-xs text-orange-500 hover:text-orange-600">
                    Forgot Password?
                  </p>
                </Link>
              </label>
              
              <button
                type="submit"
                className="mt-4 rounded-md bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 font-medium transition-colors duration-300"
              >
                Sign In
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
          
          {/* Image Section - Now on the right */}
          <div className="hidden md:block md:w-1/2 bg-gray-100 order-2 md:order-2">
            <img
              src={hotelImage}
              alt="Luxury hotel lobby"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;