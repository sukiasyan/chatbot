'use client'; // Mark as a Client Component

import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
  };

  return (
      <div className="flex flex-col h-screen p-4 bg-gray-100">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
              <div
                  key={index}
                  className={`p-2 my-2 rounded ${
                      msg.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'
                  }`}
              >
                {msg.content}
              </div>
          ))}
        </div>
        <div className="flex">
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 border rounded-l"
              placeholder="Type a message..."
          />
          <button
              onClick={handleSend}
              className="p-2 bg-blue-500 text-white rounded-r"
          >
            Send
          </button>
        </div>
      </div>
  );
}