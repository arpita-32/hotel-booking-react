const Profile = require("../models/Profile")
const User = require("../models/User")
const uploadImageToCloudinary = require("../utils/imageUploader")


// controllers/Profile.js
exports.updateProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Add this line
    console.log("Authenticated user:", req.user); // Add this line

    const { firstName, lastName, gender, dateOfBirth, about, contactNumber } = req.body;
    const userId = req.user._id;

    // Update User document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    ).select("-password");

    // Update Profile document
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { gender, dateOfBirth, about, contactNumber },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        ...updatedUser.toObject(),
        additionalDetails: updatedProfile.toObject()
      }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message
    });
  }
};
// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user info in req.user

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

// Delete User Profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOneAndDelete({ user: userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting profile",
      error: error.message,
    });
  }
};
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}