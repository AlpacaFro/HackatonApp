import React, { useState } from "react";
import axios from "axios";

// Define types for messages
interface Message {
  role: "user" | "bot"; // Role can be either "user" or "bot"
  content: string; // Content of the message
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Stores the chat history
  const [input, setInput] = useState<string>(""); // User's current input
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the API request

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]); // Add user's message to chat

    setInput(""); // Clear input
    setLoading(true);

    try {
      const response = await axios.post<{ response: string }>(
        "http://localhost:3000/api/chat",
        {
          prompt: input,
        }
      );

      setTimeout(() => {
        const botMessage: Message = { role: "bot", content: response.data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot's response
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error communicating with API:", error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Error: Unable to connect to ChatGPT API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 h-auto">
      <div className="chat-box bg-white rounded-lg shadow-lg p-4 h-[70vh] overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <p
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border rounded-l-lg p-2"
          placeholder="...תרגיש חופשי לשתף"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AIChat;
