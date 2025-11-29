const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")

exports.signup = async (req, res) => {
  try {
    console.log("=== 🚀 SIGNUP REQUEST STARTED ===");
    console.log("📨 FULL REQUEST BODY:", JSON.stringify(req.body, null, 2));
    console.log("📨 Headers:", req.headers['content-type']);
    
    // Destructure with defaults to avoid undefined errors
    const { 
      firstName = '', 
      lastName = '', 
      email = '', 
      password = '', 
      confirmPassword = '', 
      role = 'Customer' 
    } = req.body;

    // Log each field individually
    console.log("🔍 FIELD ANALYSIS:");
    console.log(`firstName: "${firstName}" [type: ${typeof firstName}, length: ${firstName.length}]`);
    console.log(`lastName: "${lastName}" [type: ${typeof lastName}, length: ${lastName.length}]`);
    console.log(`email: "${email}" [type: ${typeof email}, length: ${email.length}]`);
    console.log(`password: "${password ? '***' : ''}" [type: ${typeof password}, length: ${password.length}]`);
    console.log(`confirmPassword: "${confirmPassword ? '***' : ''}" [type: ${typeof confirmPassword}, length: ${confirmPassword.length}]`);
    console.log(`role: "${role}" [type: ${typeof role}]`);

    // Check for empty strings after trimming
    const trimmedFirstName = firstName.toString().trim();
    const trimmedLastName = lastName.toString().trim();
    const trimmedEmail = email.toString().trim();
    const trimmedPassword = password.toString().trim();
    const trimmedConfirmPassword = confirmPassword.toString().trim();

    console.log("✂️  TRIMMED FIELD ANALYSIS:");
    console.log(`firstName: "${trimmedFirstName}" [length: ${trimmedFirstName.length}]`);
    console.log(`lastName: "${trimmedLastName}" [length: ${trimmedLastName.length}]`);
    console.log(`email: "${trimmedEmail}" [length: ${trimmedEmail.length}]`);
    console.log(`password: "${trimmedPassword ? '***' : ''}" [length: ${trimmedPassword.length}]`);
    console.log(`confirmPassword: "${trimmedConfirmPassword ? '***' : ''}" [length: ${trimmedConfirmPassword.length}]`);

    // Validation checks
    if (!trimmedFirstName) {
      console.log("❌ VALIDATION FAILED: First name is empty");
      return res.status(403).json({
        success: false,
        message: "First name is required",
      });
    }
    
    if (!trimmedLastName) {
      console.log("❌ VALIDATION FAILED: Last name is empty");
      return res.status(403).json({
        success: false,
        message: "Last name is required",
      });
    }
    
    if (!trimmedEmail) {
      console.log("❌ VALIDATION FAILED: Email is empty");
      return res.status(403).json({
        success: false,
        message: "Email is required",
      });
    }
    
    if (!trimmedPassword) {
      console.log("❌ VALIDATION FAILED: Password is empty");
      return res.status(403).json({
        success: false,
        message: "Password is required",
      });
    }
    
    if (!trimmedConfirmPassword) {
      console.log("❌ VALIDATION FAILED: Confirm password is empty");
      return res.status(403).json({
        success: false,
        message: "Confirm password is required",
      });
    }

    console.log("✅ ALL FIELDS VALIDATED");

    if (trimmedPassword !== trimmedConfirmPassword) {
      console.log("❌ VALIDATION FAILED: Passwords don't match");
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Check existing user
    console.log("🔍 Checking for existing user with email:", trimmedEmail);
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      console.log("❌ USER ALREADY EXISTS:", trimmedEmail);
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log("✅ No existing user found");

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Create Profile
    console.log("👤 Creating profile...");
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // Create user
    console.log("👤 Creating user...");
    const user = await User.create({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      password: hashedPassword,
      role: role,
      additionalDetails: profileDetails._id,
    });

    user.password = undefined;

    console.log("✅ USER CREATED SUCCESSFULLY:", user.email);
    console.log("=== 🎉 SIGNUP COMPLETED SUCCESSFULLY ===");
    
    return res.status(201).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("❌ ERROR IN SIGNUP:", error);
    console.error("❌ ERROR STACK:", error.stack);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
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

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id)

    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}