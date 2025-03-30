'use client'; // Mark as a Client Component

import { useEffect, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const chatContainer = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainer.current) {
      console.log('Before Scroll - Scroll Height:', chatContainer.current.scrollHeight);
      console.log('Before Scroll - Scroll Top:', chatContainer.current.scrollTop);

      setTimeout(() => {
        chatContainer.current!.scrollTop = chatContainer.current!.scrollHeight;
        console.log('After Scroll - Scroll Top:', chatContainer.current!.scrollTop);
      }, 0);
    }
  }, [messages]);

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
      <div className="flex flex-col h-full">
        {/* Chat Messages */}
        <div
            ref={chatContainer}
            className="flex-1 overflow-y-auto p-4 space-y-4 pb-24"
            style={{ maxHeight: 'calc(100vh - 200px)' }} /* Adjust as needed */>
          {messages.map((msg, index) => (
              <div
                  key={index}
                  className={`p-4 rounded-lg max-w-[80%] ${
                      msg.role === 'user'
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-gray-600 text-white mr-auto'
                  }`}
              >
                {msg.content}
              </div>
          ))}
        </div>

        {/* Fixed Input at the Bottom */}
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-gray-800"> {/* left-64 to account for the sidebar width */}
          <div className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                placeholder="Type a message..."
            />
            <button
                onClick={handleSend}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
  );
}