import React, { useState } from 'react';

function ChatBox() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const sendMessage = async () => {
    const response = await fetch('/api/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setReply(data.reply);
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your query..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <strong>AI Reply:</strong> {reply}
      </div>
    </div>
  );
}

export default ChatBox;