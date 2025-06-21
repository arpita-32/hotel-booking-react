const Profile = require("../models/Profile")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    const id = req.user.id;

    // Find the user
    const userDetails = await User.findById(id).populate("additionalDetails");

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update basic user fields
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;

    // Handle additionalDetails
    let profile = userDetails.additionalDetails;

    if (!profile) {
      // Create a new profile document if not present
      profile = await Profile.create({
        dateOfBirth,
        about,
        contactNumber,
        gender,
      });

      userDetails.additionalDetails = profile._id;
    } else {
      // Update existing profile
      profile.dateOfBirth = dateOfBirth;
      profile.about = about;
      profile.contactNumber = contactNumber;
      profile.gender = gender;
      await profile.save();
    }

    // Save updated user
    await userDetails.save();

    // Fetch updated user with populated details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log("❌ UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    console.log("🖼️  Starting display picture update...")

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      })
    }

    console.log("📁 Files received:", req.files ? Object.keys(req.files) : "No files")

    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No display picture uploaded",
      })
    }

    const displayPicture = req.files.displayPicture
    const userId = req.user.id

    console.log("📄 File details:", {
      name: displayPicture.name,
      size: `${(displayPicture.size / 1024 / 1024).toFixed(2)} MB`,
      mimetype: displayPicture.mimetype,
      tempFilePath: displayPicture.tempFilePath,
    })

    // Validate file size (limit to 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (displayPicture.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size allowed is 5MB",
      })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(displayPicture.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed",
      })
    }

    console.log("🔧 Function check - uploadImageToCloudinary:", typeof uploadImageToCloudinary)

    // Upload to Cloudinary with timeout handling
    const image = await Promise.race([
      uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME || "profile-pictures", 1000, "auto:good"),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Upload timeout after 60 seconds")), 60000)),
    ])

    console.log("✅ Cloudinary upload successful, updating database...")

    const updatedProfile = await User.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true }).populate(
      "additionalDetails",
    )

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Failed to update profile picture in database",
      })
    }

    console.log("✅ Profile picture updated successfully")

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
      imageUrl: image.secure_url,
    })
  } catch (error) {
    console.error("❌ Error in updateDisplayPicture:", error)

    // Handle specific error types
    if (error.message.includes("timeout")) {
      return res.status(408).json({
        success: false,
        message: "Image upload timed out. Please try again with a smaller image.",
      })
    }

    if (error.message.includes("Invalid image file")) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file. Please upload a valid image.",
      })
    }

    if (error.message.includes("File size too large")) {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum 5MB allowed.",
      })
    }

    if (error.message.includes("API key")) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary configuration error. Please contact support.",
      })
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update display picture",
      error: error.message,
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      })
    }

    const id = req.user.id
    console.log("🗑️  Delete account request for user:", id)

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // TODO: Implement actual deletion logic
    // await User.findByIdAndDelete(id);
    // await Profile.findByIdAndDelete(user.additionalDetails);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.log("❌ Error in deleteAccount:", error)
    res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
    })
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      })
    }

    const id = req.user.id
    const userDetails = await User.findById(id).populate("additionalDetails").exec()

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    console.log("✅ User details fetched successfully")
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    console.log("❌ Error in getAllUserDetails:", error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
