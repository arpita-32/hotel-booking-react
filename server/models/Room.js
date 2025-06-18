const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  roomType: {
    type: String,
    required: true,
    enum: ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'],
    index: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  amenities: {
    type: [String],
    default: []
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically manage createdAt and updatedAt
});

// Indexes for better query performance
roomSchema.index({ roomType: 1, price: 1, capacity: 1 });

module.exports = mongoose.model('Room', roomSchema);