const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const {
  getUserProfile,
  createOrUpdateProfile,
  deleteProfile
} = require("../controllers/Profile")


router.post("/createOrUpdateProfile", auth, createOrUpdateProfile);
router.get("/getUserProfile", auth, getUserProfile);
router.delete("/deleteProfile", auth, deleteProfile);

module.exports = router