// middleware/auth.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// Authentication middleware
exports.auth = async (req, res, next) => {
  try {
    // Extract token from Authorization header, cookies, or body
    const token = req.header("Authorization")?.replace("Bearer ", "") ||
                  req.cookies.token ||
                  req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing"
      });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the decoded token
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }

      req.user = user; // Attach user to the request
      next();
    } catch (err) {
      const isTokenExpired = err.name === 'TokenExpiredError';
      return res.status(401).json({
        success: false,
        message: isTokenExpired ? "Token expired. Please log in again." : "Invalid token",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Authorization middleware: Customer only
exports.isCustomer = (req, res, next) => {
  if (req.user?.role !== "Customer") {
    return res.status(403).json({
      success: false,
      message: "This route is restricted to customers",
    });
  }
  next();
};

// Authorization middleware: Admin only
exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "This route is restricted to admins",
    });
  }
  next();
};
