import React, { useState, useEffect } from 'react';
import chatService from './ChatService';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await chatService.fetchMessages();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await chatService.sendMessage(input);
    setInput('');
    loadMessages();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Chat Repo Test</h2>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'auto', padding: '10px' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ margin: '5px 0' }}>
            <strong>{new Date(m.created_at).toLocaleTimeString()}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ marginTop: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;