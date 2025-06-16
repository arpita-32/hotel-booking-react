import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { setUser, setToken, setLoading, setError } from "../../slices/authSlice";
import { setProfile } from "../../slices/profileSlice";
import { toast } from "react-hot-toast";

const { LOGIN_API, SIGNUP_API, LOGOUT_API, SEND_OTP_API } = authEndpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setProfile(response.data.user));
      
      // Redirect based on role
      if (response.data.user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function signup(formData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, formData);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await apiConnector("POST", LOGOUT_API);
      
      dispatch(setUser(null));
      dispatch(setToken(null));
      dispatch(setProfile(null));
      
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SEND_OTP_API, { email });
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}