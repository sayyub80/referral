"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function CommonLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat box visibility
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "ai" },
  ]); // Chat history
  const [inputValue, setInputValue] = useState(""); // Input field value

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: inputValue, sender: "user" },
      ]);

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, text: "I'm here to help!", sender: "ai" },
        ]);
      }, 1000);

      setInputValue(""); // Clear input
    }
  };

  return (
    <div className="flex h-screen text-black bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* AI Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-lg shadow-lg border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">AI Chat Assistant</h2>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {/* Chat Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 ${
                  message.sender === "ai" ? "text-left" : "text-right"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "ai"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full p-2 border rounded"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}