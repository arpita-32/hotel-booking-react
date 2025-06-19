const express = require('express');
const router = express.Router();
const {
  addRoom,
  getAllRooms,
  getRoomDetails,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

// Admin room management routes
router.post("/createRoom",addRoom)
// Get all Rooms
router.get("/getAllRooms", getAllRooms)
// Get Details for a Specific Room
router.get("/getRoomDetails/:roomId", getRoomDetails)
// Edit Room details
router.put("/updateRoom", updateRoom)
// Delete a Room
router.delete("/deleteRoom/:roomId", deleteRoom)
// Public room endpoints (accessible to all users)
router.get("/public/rooms", getAllRooms)
router.get("/public/rooms/:roomId", getRoomDetails)


module.exports = router;