// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    // Extracting JWT from request cookies, body or header
    let token;
    if (req.header("Authorization")) {
      token = req.header("Authorization").replace("Bearer ", "");
    } else {
      token = req.cookies.token || req.body.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Token Missing" });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({ 
        success: false, 
        message: "Token is invalid or expired",
        error: err.message // Optional: include error details in development
      });
    }
  } catch (error) {
    console.error("Authentication Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

exports.isCustomer = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userDetails.accountType !== "Customer") {
      return res.status(403).json({ // Changed to 403 Forbidden
        success: false,
        message: "This is a Protected Route for Customer",
      });
    }
    next();
  } catch (error) {
    console.error("isCustomer Middleware Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "User role verification failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userDetails.accountType !== "Admin") {
      return res.status(403).json({ // Changed to 403 Forbidden
        success: false,
        message: "This is a Protected Route for Admin",
      });
    }
    next();
  } catch (error) {
    console.error("isAdmin Middleware Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Admin verification failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};