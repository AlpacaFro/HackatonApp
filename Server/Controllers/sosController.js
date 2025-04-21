require("dotenv").config();
const axios = require("axios");
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendSOSAlert = async (req, res) => {
  const { latitude, longitude, message } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      error: "Couldn't receive the coordinates.",
    });
  }

  try {
    // Call BigDataCloud Reverse Geocoding API
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    const city = response.data.city || "Unknown City";
    const country = response.data.countryName || "Unknown Country";

    console.log("SOS Alert Received:", {
      latitude,
      longitude,
      city,
      country,
      message: message || "No message provided",
    });

    // Send SMS using Twilio API
    const smsBody = `🚨 SOS Alert! 🚨\nLocation: ${city}, ${country}\nCoords: ${latitude}, ${longitude}\nMessage: ${
      message || "No message provided"
    }`;

    await client.messages.create({
      body: smsBody,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: process.env.RECIPIENT_PHONE_NUMBER, // Recipient's number
    });

    // Response to the client
    res.status(200).json({
      success: true,
      message: "SOS alert sent successfully via SMS.",
      location: {
        city,
        country,
        Coords: `${latitude},${longitude}`,
      },
    });
  } catch (error) {
    console.error("Error processing SOS alert:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to process SOS alert.",
    });
  }
};
