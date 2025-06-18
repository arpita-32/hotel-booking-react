const express = require('express');
const router = express.Router();
const {
  addRoom,
  getAllRooms,
  getRoomDetails,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

router.post('/rooms/add', addRoom);
router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomDetails);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

module.exports = router;