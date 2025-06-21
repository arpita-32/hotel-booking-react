const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Profile = require("../models/Profile") // Add this import
const OTP = require("../models/OTP")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role, otp } = req.body

    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      })
    }

    // Check existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }

    // Verify OTP
    const recentOtp = await OTP.findOne({ email, otp }).sort({ createdAt: -1 })
    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create Profile first
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    })

    // Create user with profile reference
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      additionalDetails: profileDetails._id, // Link the profile
    })

    user.password = undefined

    return res.status(201).json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error("Error in signup:", error)
    return res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      })
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      )

      user.token = token
      user.password = undefined

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login successful",
      })
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      })
    }
  } catch (error) {
    console.error("Error in login:", error)
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    })
  }
}

exports.sendotp = async (req, res) => {
  try {
    if (!req.body || !req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Email is required in the request body",
      })
    }

    const { email } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      })
    }

    const checkUserPresent = await User.findOne({ email })

    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      })
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    let result = await OTP.findOne({ otp })
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      })
      result = await OTP.findOne({ otp })
    }

    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload)

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp: otp,
      otpId: otpBody._id,
    })
  } catch (error) {
    console.error("Error in sendotp:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    })
  }
}

exports.changePassword = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Please login again.",
      })
    }

    const userDetails = await User.findById(req.user.id)

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const { oldPassword, newPassword, confirmNewPassword } = req.body

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      })
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password)

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The current password is incorrect",
      })
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "The new password and confirm password do not match",
      })
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the current password",
      })
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, { password: encryptedPassword }, { new: true })

    if (!updatedUserDetails) {
      return res.status(500).json({
        success: false,
        message: "Failed to update password",
      })
    }

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
        ),
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      console.error("Error occurred while sending email:", error)
      console.log("Password updated but email notification failed")
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error) {
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}
