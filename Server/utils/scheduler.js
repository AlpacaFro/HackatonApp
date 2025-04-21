const cron = require("node-cron");
const Room = require("../models/Room");

const scheduleRoomAvailability = async () => {
    // Immediate availability for all rooms on server start
    console.log("Making all rooms available now...");
    const rooms = await Room.find();
    rooms.forEach(async (room) => {
        room.available = true; // Mark as available
        room.availableUntil = new Date(Date.now() + 60 * 60 * 1000); // 1-hour availability
        await room.save();
        console.log(`Room "${room.roomName}" is now available.`);
    });

    // Make rooms available at specific times
    cron.schedule(
        "09 45 * * *", //
        async () => {
            console.log("Making rooms available at scheduled time...");
            const rooms = await Room.find();
            rooms.forEach(async (room) => {
                room.available = true;
                room.availableUntil = new Date(Date.now() + 60 * 60 * 1000); // 1-hour availability
                await room.save();
                console.log(`Room "${room.roomName}" is now available.`);
            });
        },
        {
            timezone: "Asia/Jerusalem", // Set timezone for Israel
        }
    );

    // Close expired rooms
    cron.schedule(
        "* * * * *", // Run every minute to check for expired rooms
        async () => {
            const now = new Date();
            const rooms = await Room.find({ available: true, availableUntil: { $lte: now } });
            rooms.forEach(async (room) => {
                room.available = false; // Mark as unavailable
                room.availableUntil = null; // Clear the availability time
                await room.save();
                console.log(`Room "${room.roomName}" is now unavailable.`);
            });
        },
        {
            timezone: "Asia/Jerusalem", // Set timezone for Israel
        }
    );
};

module.exports = scheduleRoomAvailability;
