// routes/Profile.js
const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth"); // Import the auth middleware
const {
  updateProfile,
  getUserProfile,
  deleteProfile,
  updateDisplayPicture
} = require("../controllers/Profile");

// Protect all routes with auth middleware
router.put("/updateProfile", auth, updateProfile);
router.get("/getProfile", auth, getUserProfile);
router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;