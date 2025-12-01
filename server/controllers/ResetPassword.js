const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not registered with us. Enter a valid email.`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
      { new: true }
    );

    console.log("DETAILS", updatedDetails);

    // 🌐 IMPORTANT: Replace localhost when deployed
    const url = `http://localhost:5173/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Click the link below to reset your password:<br><br>
       <a href="${url}">${url}</a><br><br>
       This link will expire in 1 hour.`
    );

    res.json({
      success: true,
      message: "Email sent successfully. Please check your inbox.",
    });

  } catch (error) {
    console.error("RESET TOKEN ERROR:", error);
    return res.json({
      error: error.message,
      success: false,
      message: "Some error occurred while sending the reset email.",
    });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and confirm password do not match.",
      });
    }

    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: "Token has expired. Please regenerate your reset link.",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword, token: null, resetPasswordExpires: null },
      { new: true }
    );

    res.json({
      success: true,
      message: "Password reset successful.",
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.json({
      error: error.message,
      success: false,
      message: "Some error occurred while updating the password.",
    });
  }
};
