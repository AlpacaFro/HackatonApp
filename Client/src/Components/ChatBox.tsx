import React from 'react';

interface ChatBoxProps {
  messages: { userId: string; text: string }[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="border p-4 h-64 overflow-y-scroll">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <span className="font-bold">אח:</span> {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;