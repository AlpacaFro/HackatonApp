const express = require("express");
const router = express.Router();
const { sendChatMessage } = require("../controllers/chatController"); // Import controller

// Define the route for sending chat messages
router.post("/", sendChatMessage);

module.exports = router;
