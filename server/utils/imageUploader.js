const cloudinary = require("cloudinary").v2

const isFileTypeSupported = (type, supportedTypes) => {
  return supportedTypes.includes(type)
}

const uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    console.log("📤 Starting Cloudinary upload...")
    console.log("File details:", {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      mimetype: file.mimetype,
      tempFilePath: file.tempFilePath,
    })

    // Validate file exists
    if (!file || !file.tempFilePath) {
      throw new Error("Invalid file or missing temp file path")
    }

    const options = {
      folder: folder || "profile-pictures",
      resource_type: "auto",
      timeout: 60000,
      use_filename: true,
      unique_filename: true,
    }

    if (height) {
      options.height = height
      options.crop = "scale"
    }

    if (quality) {
      options.quality = quality
    }

    // Add optimization transformations
    options.transformation = [
      { width: 1000, height: 1000, crop: "limit" },
      { quality: "auto:good" },
      { fetch_format: "auto" },
    ]

    console.log("Upload options:", {
      folder: options.folder,
      resource_type: options.resource_type,
      timeout: options.timeout,
    })

    const result = await cloudinary.uploader.upload(file.tempFilePath, options)

    console.log("✅ Cloudinary upload successful:", {
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      bytes: `${(result.bytes / 1024 / 1024).toFixed(2)} MB`,
    })

    return result
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error)

    // Handle specific Cloudinary errors
    if (error.message.includes("timeout")) {
      throw new Error("Upload timeout - please try again with a smaller image")
    }

    if (error.message.includes("Invalid image file")) {
      throw new Error("Invalid image file format")
    }

    if (error.message.includes("File size too large")) {
      throw new Error("File size too large - maximum 10MB allowed")
    }

    if (error.message.includes("Invalid API key")) {
      throw new Error("Cloudinary API key is invalid")
    }

    throw new Error(`Image upload failed: ${error.message}`)
  }
}

// Export both functions
module.exports = {
  uploadImageToCloudinary,
  isFileTypeSupported,
}
