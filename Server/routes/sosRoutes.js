const express = require("express");
const router = express.Router();
const { sendSOSAlert } = require("../controllers/sosController"); // Import the controller

// Define the SOS endpoint
router.post("/api/sos", sendSOSAlert);

module.exports = router;
