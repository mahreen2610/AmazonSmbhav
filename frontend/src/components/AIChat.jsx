import React, { useState } from 'react';

function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const aiMessage = { text: data.reply, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI Chatbot</h1>
      <div style={{ maxWidth: '500px', margin: '2rem auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem' }}>
        <div style={{ height: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '0.5rem', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              <span style={{ backgroundColor: msg.sender === 'user' ? '#4a90e2' : '#f0f0f0', color: msg.sender === 'user' ? 'white' : 'black', padding: '0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flexGrow: 1, padding: '0.5rem', marginRight: '0.5rem' }}
            placeholder="Type your message..."
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default AIChat;

