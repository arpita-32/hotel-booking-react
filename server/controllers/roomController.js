const Room = require('../models/Room');
const cloudinary = require('cloudinary').v2;
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Configure Cloudinary (ensure this is in your config)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Add a new room with image uploads
exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, price, capacity, description, amenities } = req.body;
    const thumbnail = req.files?.thumbnailImage;

    // Validate required fields
    if (!roomNumber || !roomType || !price || !capacity || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "All fields including thumbnail are mandatory"
      });
    }

    // Upload thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME || 'hotel_rooms'
    );

    // Process amenities if provided
    const amenitiesArray = amenities 
      ? JSON.parse(amenities) 
      : [];

    // Create new room
    const newRoom = await Room.create({
      roomNumber,
      roomType,
      price,
      capacity,
      description,
      amenities: amenitiesArray,
      thumbnail: thumbnailImage.secure_url,
      isAvailable: true
    });

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room: newRoom
    });
  } catch (error) {
    console.error("Error adding room:", error);
    
    // Handle duplicate room number
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Room number already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add room",
      error: error.message
    });
  }
};

// Edit Room Details
exports.editRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const updates = req.body;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ 
        success: false,
        message: "Room not found" 
      });
    }

    // Update thumbnail if provided
    if (req.files?.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME || 'hotel_rooms'
      );
      room.thumbnail = thumbnailImage.secure_url;
    }

    // Update other fields
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        if (key === "amenities") {
          room[key] = JSON.parse(updates[key]);
        } else if (key !== "thumbnailImage" && key !== "roomId") {
          room[key] = updates[key];
        }
      }
    }

    await room.save();

    res.json({
      success: true,
      message: "Room updated successfully",
      data: room
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update room",
      error: error.message
    });
  }
};

// Get all rooms with filtering options
exports.getAllRooms = async (req, res) => {
  try {
    const { roomType, minPrice, maxPrice, capacity } = req.query;
    const filter = {};

    if (roomType) filter.roomType = roomType;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (capacity) filter.capacity = { $gte: Number(capacity) };

    const rooms = await Room.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message
    });
  }
};

// Get room details by ID
exports.getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.status(200).json({
      success: true,
      room
    });
  } catch (error) {
    console.error("Error fetching room details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch room details",
      error: error.message
    });
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    // Delete thumbnail from Cloudinary
    if (room.thumbnail) {
      const publicId = room.thumbnail.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(
        `${process.env.FOLDER_NAME || 'hotel_rooms'}/${publicId}`
      );
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete room",
      error: error.message
    });
  }
};