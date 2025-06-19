import React,{ useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import hotelImage from "../assets/Images/loginpage.png";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { useDispatch } from 'react-redux';
import { login } from "../services/operations/authAPI";
import { toast } from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(login(formData.email, formData.password, navigate));
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Section - Order changes on mobile */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 order-2 md:order-1">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Sign in to your Luxury Haven account
              </p>
            </div>
            
            <form onSubmit={handleOnSubmit} className="mt-4 sm:mt-6 flex flex-col gap-y-3 sm:gap-y-4">
              <label className="w-full">
                <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-700">
                  Email Address <sup className="text-orange-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full rounded-[0.5rem] bg-gray-100 p-2 sm:p-[12px] text-gray-800 text-sm sm:text-base"
                  autoComplete="username"
                />
              </label>
              
              <label className="relative">
                <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-700">
                  Password <sup className="text-orange-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="w-full rounded-[0.5rem] bg-gray-100 p-2 sm:p-[12px] pr-8 sm:pr-10 text-gray-800 text-sm sm:text-base"
                  autoComplete="current-password"
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
                <Link to="/forgot-password">
                  <p className="mt-1 ml-auto max-w-max text-xs text-orange-500">
                    Forgot Password?
                  </p>
                </Link>
              </label>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 sm:mt-6 rounded-[8px] bg-orange-500 py-2 sm:py-[8px] px-4 sm:px-[12px] font-medium text-white text-sm sm:text-base ${
                  isLoading ? "opacity-75" : "hover:bg-orange-600"
                } transition-colors`}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </button>
              
              <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
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
          
          {/* Image Section - Order changes on mobile */}
          <div className="w-full md:w-1/2 bg-gray-100 order-1 md:order-2">
            <img
              src={hotelImage}
              alt="Luxury hotel lobby"
              className="w-full h-48 sm:h-64 md:h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;