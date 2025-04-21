import React, { useState } from 'react';
import { socket } from '../services/socket';

interface MessageInputProps {
  roomId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ roomId }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', { roomId, text: message });
      setMessage('');
    }
  };

  return (
    <div className="flex mt-4">
      <input
        type="text"
        className="border p-2 flex-grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;