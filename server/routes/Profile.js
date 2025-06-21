const express = require("express")
const router = express.Router()

// Import controllers
const { updateProfile, updateDisplayPicture, deleteAccount, getAllUserDetails } = require("../controllers/Profile")

// Import middleware
const { auth } = require("../middlewares/auth")

// Profile routes
router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.delete("/deleteProfile", auth, deleteAccount)
router.get("/getUserDetails", auth, getAllUserDetails)

module.exports = router
