const Message = require('../models/Message');

exports.getMessagesByRoomId = async (roomId) => {
  return await Message.find({ roomId }).sort({ timestamp: 1 });
};

exports.createMessage = async (roomId, userId, text) => {
  const message = new Message({ roomId, userId, text });
  return await message.save();
};