import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { sendOtp, signUp  } from "../services/operations/authAPI";


function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [navigate, signupData]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

  dispatch(
    signUp(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      otp,
      navigate
    )
  );


  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow grid place-items-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600 mb-6">
            We've sent a verification code to {signupData?.email}
          </p>
          
          <form onSubmit={handleVerifyAndSignup} className="mb-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-12 h-12 border-2 border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-orange-500 mx-1"
                />
              )}
              containerStyle="flex justify-center my-6"
              inputStyle=""
            />
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-500 text-white py-3 rounded-md font-medium ${
                loading ? "opacity-75" : "hover:bg-orange-600"
              } transition-colors`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
          
          <div className="flex justify-between items-center text-sm">
            <Link 
              to="/signup" 
              className="text-gray-600 hover:text-orange-500 flex items-center"
            >
              <BiArrowBack className="mr-1" />
              Back to Signup
            </Link>
            
            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className="text-orange-500 hover:text-orange-600 flex items-center"
            >
              <RxCountdownTimer className="mr-1" />
              Resend OTP
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerifyEmail;