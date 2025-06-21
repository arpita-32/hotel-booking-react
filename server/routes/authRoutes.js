const express = require("express");
const router = express.Router();

// Import controllers with proper error handling
const authController = require("../controllers/authController");
const resetPasswordController = require("../controllers/ResetPassword");

// Verify all imported functions exist
const {
  login,
  signup,
  sendotp,
  changePassword
} = authController;

const {
  resetPasswordToken,
  resetPassword
} = resetPasswordController;
const { auth } = require("../middlewares/auth");

// Authentication routes
router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/changepassword", auth, changePassword); // ✅ Add `auth` here

// Reset Password routes
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;