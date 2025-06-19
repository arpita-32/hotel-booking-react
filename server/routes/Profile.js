const express = require("express");
const router = express.Router();
const {
  createOrUpdateProfile,
  getUserProfile,
  deleteProfile,
  updateDisplayPicture
} = require("../controllers/Profile");

router.put("/updateProfile",  createOrUpdateProfile);
router.get("/getProfile",  getUserProfile);
router.delete("/deleteProfile",deleteProfile);
router.put("/updateDisplayPicture",  updateDisplayPicture);

module.exports = router;