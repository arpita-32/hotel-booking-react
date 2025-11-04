import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { sendOtp, signUp } from "../services/operations/authAPI";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("📧 VerifyEmail - signupData:", signupData);
    
    if (!signupData) {
      console.log("❌ No signup data, redirecting to signup");
      navigate("/signup");
    } else {
      console.log("✅ Signup data available:", {
        email: signupData.email,
        firstName: signupData.firstName
      });
    }
  }, [navigate, signupData]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    
    // Validate OTP length
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    console.log("🔄 Starting verification with OTP:", otp);
    console.log("📝 Signup data:", signupData);

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

  const handleResendOTP = () => {
    if (!signupData?.email) {
      toast.error("No email found. Please go back to signup.");
      return;
    }

    console.log("🔄 Resending OTP to:", signupData.email);
    dispatch(sendOtp(signupData.email, navigate));
    toast.success("OTP resent successfully!");
    setOtp(""); // Clear previous OTP
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow grid place-items-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h1>
          
          {signupData?.email ? (
            <p className="text-gray-600 mb-6">
              We've sent a verification code to <span className="font-medium">{signupData.email}</span>
            </p>
          ) : (
            <p className="text-red-500 mb-6">
              No email found. Please complete signup first.
            </p>
          )}
          
          <form onSubmit={handleVerifyAndSignup} className="mb-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-12 h-12 border-2 border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-yellow-500 mx-1"
                  disabled={loading}
                />
              )}
              containerStyle="flex justify-center my-6"
              inputStyle=""
              shouldAutoFocus={true}
            />
            
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className={`w-full bg-yellow-500 text-white py-3 rounded-md font-medium ${
                (loading || otp.length !== 6) ? "opacity-75 cursor-not-allowed" : "hover:bg-yellow-600"
              } transition-colors`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
          
          <div className="flex justify-between items-center text-sm">
            <Link 
              to="/signup" 
              className="text-gray-600 hover:text-yellow-500 flex items-center"
            >
              <BiArrowBack className="mr-1" />
              Back to Signup
            </Link>
            
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-yellow-500 hover:text-yellow-600 flex items-center disabled:opacity-50"
            >
              <RxCountdownTimer className="mr-1" />
              Resend OTP
            </button>
          </div>

          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === 'development' && signupData && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
              <p className="font-medium">Debug Info:</p>
              <p>Email: {signupData.email}</p>
              <p>OTP Length: {otp.length}/6</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerifyEmail;