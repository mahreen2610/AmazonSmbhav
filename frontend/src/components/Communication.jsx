import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Communication() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage) {
      socket.emit('sendMessage', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Real-Time Communication</h1>
      <div style={{ maxWidth: '500px', margin: '2rem auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem' }}>
        <div style={{ height: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} style={{ display: 'flex' }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            style={{ flexGrow: 1, padding: '0.5rem', marginRight: '0.5rem' }}
            placeholder="Type a message..."
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Communication;
