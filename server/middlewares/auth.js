// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// auth middleware
exports.auth = async (req, res, next) => {
  try {
    // Check multiple possible token locations
    let token = req.header("Authorization")?.replace("Bearer ", "") || 
               req.cookies.token || 
               req.body.token ||
               req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Authorization token required",
        code: "TOKEN_MISSING"
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user still exists
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
          code: "USER_NOT_FOUND"
        });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: "Token expired",
          code: "TOKEN_EXPIRED"
        });
      }
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token",
        code: "INVALID_TOKEN"
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
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