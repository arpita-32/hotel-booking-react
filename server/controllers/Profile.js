const Profile = require("../models/Profile")
const User = require("../models/User")
const uploadImageToCloudinary = require("../utils/imageUploader")

exports.createOrUpdateProfile = async (req, res) => {
  try {
      if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const { gender, dateOfBirth, about, contactNumber } = req.body;
    const userId = req.user._id;

    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      // Update existing profile
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        {
          gender,
          dateOfBirth,
          about,
          contactNumber,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: profile,
      });
    }

    // Create new profile
    profile = await Profile.create({
      user: userId,
      gender,
      dateOfBirth,
      about,
      contactNumber,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating/updating profile",
      error: error.message,
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