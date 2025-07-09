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
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      <div className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-gray-900 shadow-xl rounded-lg overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 order-2 md:order-1">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-50">Welcome Back</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-300">
                Sign in to your B.S.H RESIDENCY account
              </p>
            </div>
            
            <form onSubmit={handleOnSubmit} className="mt-4 sm:mt-6 flex flex-col gap-y-3 sm:gap-y-4">
              <label className="w-full">
                <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-300">
                  Email Address <sup className="text-yellow-400">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full rounded-[0.5rem] bg-gray-800 p-2 sm:p-[12px] text-yellow-50 text-sm sm:text-base"
                />
              </label>
              
              <label className="relative">
                <p className="mb-1 text-xs sm:text-[0.875rem] leading-[1.375rem] text-gray-300">
                  Password <sup className="text-yellow-400">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="w-full rounded-[0.5rem] bg-gray-800 p-2 sm:p-[12px] pr-8 sm:pr-10 text-yellow-50 text-sm sm:text-base"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 sm:right-3 top-[30px] sm:top-[38px] z-[10] cursor-pointer text-gray-400"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
                <Link to="/forgot-password">
                  <p className="mt-1 ml-auto max-w-max text-xs text-yellow-400">
                    Forgot Password?
                  </p>
                </Link>
              </label>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 sm:mt-6 rounded-[8px] bg-yellow-500 py-2 sm:py-[8px] px-4 sm:px-[12px] font-medium text-black text-sm sm:text-base ${
                  isLoading ? "opacity-75" : "hover:bg-yellow-400"
                } transition-colors`}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </button>
              
              <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-yellow-400 hover:text-yellow-300"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
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