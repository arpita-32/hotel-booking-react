const Profile = require("../models/Profile")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName = "", lastName = "", dateOfBirth = "", about = "", contactNumber = "", gender = "" } = req.body

    console.log("📝 Profile update request received:", {
      userId: req.user?.id,
      data: { firstName, lastName, dateOfBirth, about, contactNumber, gender },
    })

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      })
    }

    const id = req.user.id

    // Find the user
    const userDetails = await User.findById(id)
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    let profile

    // Check if profile exists, if not create one
    if (!userDetails.additionalDetails) {
      console.log("Creating new profile for user")
      // Create a new profile
      profile = await Profile.create({
        gender: gender || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        about: about || null,
        contactNumber: contactNumber || null,
      })

      // Update user with profile reference
      await User.findByIdAndUpdate(id, { additionalDetails: profile._id })
    } else {
      // Get existing profile
      profile = await Profile.findById(userDetails.additionalDetails)
      if (!profile) {
        console.log("Profile reference exists but document missing, creating new one")
        // Profile reference exists but profile document is missing, create new one
        profile = await Profile.create({
          gender: gender || null,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          about: about || null,
          contactNumber: contactNumber || null,
        })

        // Update user with new profile reference
        await User.findByIdAndUpdate(id, { additionalDetails: profile._id })
      } else {
        console.log("Updating existing profile")
        // Update existing profile
        profile.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : profile.dateOfBirth
        profile.about = about !== undefined ? about : profile.about
        profile.contactNumber = contactNumber !== undefined ? contactNumber : profile.contactNumber
        profile.gender = gender !== undefined ? gender : profile.gender
        await profile.save()
      }
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName || userDetails.firstName,
        lastName: lastName || userDetails.lastName,
      },
      { new: true },
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Failed to update user details",
      })
    }

    // Find the updated user details with populated profile
    const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()

    console.log("✅ Profile updated successfully")

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log("❌ Error in updateProfile:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    })
  }
}

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
