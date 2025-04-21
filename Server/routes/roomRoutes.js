const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/', async (req, res) => {
  try {
    const rooms = await roomController.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const room = await roomController.getRoomById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room details' });
  }
});

module.exports = router;