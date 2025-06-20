const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    // Get token from header or cookie
    let token = req.cookies?.token || 
                req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing"
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message
    });
  }
};

exports.isCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user?.role !== "Customer") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to customers"
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Role verification failed",
      error: error.message
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user?.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to admins"
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Role verification failed",
      error: error.message
    });
  }
};