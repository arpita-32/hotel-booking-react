const Room = require('../models/Room');
const cloudinary = require('cloudinary').v2;
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Add a new room with image uploads
exports.addRoom = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['roomNumber', 'roomType', 'price', 'capacity'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Check for thumbnail image
    if (!req.files?.thumbnailImage) {
      return res.status(400).json({
        success: false,
        message: 'Thumbnail image is required'
      });
    }

    // Upload thumbnail
    const thumbnailUpload = await uploadImageToCloudinary(
      req.files.thumbnailImage,
      process.env.FOLDER_NAME
    );

    // Process additional images
    const images = req.files.images || [];
    const uploadedImages = await Promise.all(
      images.map(image => 
        uploadImageToCloudinary(image, process.env.FOLDER_NAME)
      )
    );

    // Create room
    const room = await Room.create({
      roomNumber: req.body.roomNumber,
      roomType: req.body.roomType,
      price: req.body.price,
      capacity: req.body.capacity,
      description: req.body.description || '',
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
      thumbnail: thumbnailUpload.secure_url,
      images: uploadedImages.map(img => img.secure_url),
      isAvailable: true
    });

    return res.status(201).json({
      success: true,
      message: 'Room added successfully',
      room
    });

  } catch (error) {
    console.error('Error adding room:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Room number already exists'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to add room',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


exports.updateRoom = async (req, res) => {
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
    const { roomId } = req.params; // Get roomId from URL params

    // Find and delete the room
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
        `${process.env.FOLDER_NAME || 'web'}/${publicId}`
      );
    }

    // Delete additional images from Cloudinary
    if (room.images?.length > 0) {
      await Promise.all(
        room.images.map(image => {
          const publicId = image.split('/').pop().split('.')[0];
          return cloudinary.uploader.destroy(
            `${process.env.FOLDER_NAME || 'web'}/${publicId}`
          );
        })
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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};