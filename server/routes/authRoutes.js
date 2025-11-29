const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/authController");
const resetPasswordController = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

const {
  login,
  signup,
  changePassword
} = authController;

const {
  resetPasswordToken,
  resetPassword
} = resetPasswordController;

// Authentication routes
router.post("/login", login);
router.post("/signup", signup);
router.post("/changepassword", auth, changePassword);

// Reset Password routes
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;