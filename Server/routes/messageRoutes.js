const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/:roomId', async (req, res) => {
  try {
    const messages = await messageController.getMessagesByRoomId(req.params.roomId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;