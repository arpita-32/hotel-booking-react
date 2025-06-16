const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

// Main authentication middleware
exports.auth = async (req, res, next) => {
    try {
        // Extract token from cookies, body, or header
        const token =
            req.cookies.token ||
            req.body.token ||
            (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Authorization token missing" 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid or expired token" 
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};

// Customer role middleware
exports.isCustomer = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (user.role !== "Customer") {
            return res.status(403).json({
                success: false,
                message: "This route is restricted to customers only"
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

// Admin role middleware
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "This route is restricted to administrators only"
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