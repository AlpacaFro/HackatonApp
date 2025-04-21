import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import axios from 'axios';
import { socket } from '../services/socket';

interface Message {
  userId: string;
  text: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Room ID from URL
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomFull, setRoomFull] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error('Room ID is missing!');
      navigate('/rooms');
      return;
    }

    // Fetch room data and check capacity
    const fetchRoom = async () => {
      try {
        const roomResponse = await axios.get(`http://localhost:3000/api/rooms/${id}`);
        if (roomResponse.data.currentUsers >= roomResponse.data.maxUsers) {
          setRoomFull(true);
        } else {
          // Join room via WebSocket
          socket.emit('joinRoom', { roomId: id });
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        navigate('/rooms');
      }
    };

    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const messagesResponse = await axios.get(`http://localhost:3000/api/messages/${id}`);
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchRoom();
    fetchMessages();

    // Handle incoming messages via WebSocket
    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('message', handleNewMessage);

    // Cleanup on component unmount
    return () => {
      socket.emit('leaveRoom', { roomId: id });
      socket.off('message', handleNewMessage);
    };
  }, [id, navigate]);

  if (roomFull) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">No place in the room</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate('/rooms')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ChatBox messages={messages} />
      <MessageInput roomId={id || ''} />
    </div>
  );
};

export default ChatPage;
