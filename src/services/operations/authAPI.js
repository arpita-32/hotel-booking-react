import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export const USER_ROLE = {
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent to your email");
      navigate("/verify-email");
    } catch (error) {
      console.error("OTP SEND ERROR:", error);
      toast.error(error.message || "Could not send OTP");
    }
    dispatch(setLoading(false));
  };
}

export function signUp(
  role,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating your account...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        role,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      toast.error(error.message || "Registration failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Welcome back!");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image || 
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      
      dispatch(setUser({ ...response.data.user, image: userImage }));
      
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify({ 
        ...response.data.user, 
        image: userImage 
      }));

      // Redirect based on role
      if (response.data.user.role === USER_ROLE.ADMIN) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error(error.message || "Login failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// In authAPI.js
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password reset link sent to your email");
      setEmailSent(true);
    } catch (error) {
      console.error("RESET TOKEN ERROR:", error);
      toast.error(error.message || "Failed to send reset email");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password updated successfully");
      navigate("/login");
    } catch (error) {
      console.error("PASSWORD RESET ERROR:", error);
      toast.error(error.message || "Password reset failed");
    }
    dispatch(setLoading(false));
  };
}