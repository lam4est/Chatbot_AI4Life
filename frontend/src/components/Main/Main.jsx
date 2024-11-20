import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');

      setTimeout(() => {
        const botResponse = {
          sender: 'bot',
          text: 'Oke đợi tí trả lời liền nè ^^'
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='main'>
      <div className="nav">
        <p> Chat Kid</p>
        <img src={assets.user_icon} alt="User icon" />
      </div>

      <div className="main_container">
        {messages.length === 0 ? (
          <div className="greet">
            <p><span>How are you ban co khoe khong</span></p>
          </div>
        ) : (
          <div className="chat_display">
            {messages.map((message, index) => (
              <div key={index} className={`chat_message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      <div className="search_box">
        <input
          type="text"
          placeholder='May muon hoi cai gi?'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <div>
          <img src={assets.gallery_icon} alt="Gallery icon" />
          <img src={assets.mic_icon} alt="Mic icon" />
          <img
            src={assets.send_icon}
            alt="Send icon"
            onClick={handleSend}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <p className="bottom_info">
        Cai web nay tao ra de phat hien chung tram cam o cac em nho ^^
      </p>
    </div>
  );
};

export default Main;