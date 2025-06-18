// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization")?.replace("Bearer ", "") || 
               req.cookies.token || 
               req.body.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Authorization token required" 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch  {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

exports.isCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "Customer") {
      return res.status(403).json({
        success: false,
        message: "This route is restricted to customers",
      });
    }
    next();
  } catch  {
    return res.status(500).json({
      success: false,
      message: "Role verification failed",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This route is restricted to admins",
      });
    }
    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "Role verification failed",
    });
  }
};