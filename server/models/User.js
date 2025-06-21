// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Customer"],
      required: true,
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/5.x/initials/svg?seed=${this.firstName} ${this.lastName}`
      },
    },
    // THIS WAS MISSING - Add the reference to Profile
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: false, // Make it optional initially
    },
  },
  { timestamps: true },
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema)
