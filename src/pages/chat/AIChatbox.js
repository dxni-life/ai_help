import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Chatbox.css';

function Chatbox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '' || image) {
      addMessage(input || 'Image uploaded', 'user');

      try {
        const formData = new FormData();
        formData.append('prompt', input);
        if (image) {
          formData.append('image', image);
        }

        const response = await axios.post('/AIchatbox', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        addMessage(response.data.text, 'ai');
      } catch (error) {
        console.error(error);
        addMessage('An error occurred while processing your request.', 'ai');
      }

      setInput('');
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      <div className="content-container">
        <h1>Welcome to our AI Chatbot!</h1>
        <p className="center-text">
          Hey there! Whether you're curious about something specific or just want to chat, I'm here to help.<br />
          If you've got plant questions or any other topic on your mind, just let me know.
        </p>
      </div>

      <div className="chatbox-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="message-form">
          <input type="text" value={input} onChange={handleInputChange} placeholder="Type your question here..." />
          <input type="file" onChange={handleImageChange} accept="image/*" style={{ margin: '10px 0' }} />
          <button type="submit">Send</button>
        </form>
      </div>

      <div style={styles.buttonContainer}>
        <Link to="/home" style={styles.button}>Home</Link>
        <Link to="/plants" style={styles.button}>Explore Plants</Link>
        <Link to="/about" style={styles.button}>About Us</Link>
      </div>
    </>
  );
}

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Chatbox;
