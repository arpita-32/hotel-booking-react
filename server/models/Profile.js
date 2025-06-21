const mongoose = require("mongoose")

// Define the Profile schema
const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      default: null,
    },
    dateOfBirth: {
      type: Date, // Changed from String to Date for better data handling
      default: null,
    },
    about: {
      type: String,
      trim: true,
      maxlength: 500, // Add reasonable limit
      default: null,
    },
    contactNumber: {
      type: String, // Changed from Number to String to handle international formats
      trim: true,
      validate: {
        validator: (v) => {
          // Basic phone number validation (optional)
          return !v || /^[+]?[1-9][\d]{0,15}$/.test(v)
        },
        message: "Please enter a valid phone number",
      },
      default: null,
    },
  },
  { timestamps: true },
) // Add timestamps for better tracking

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema)
