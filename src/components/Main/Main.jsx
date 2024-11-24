import React, { useEffect, useRef, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Main = ({ activeChat }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(activeChat?.messages || []);  
    const chatEndRef = useRef(null);

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { sender: "user", text: input };
            setMessages((prevMessages) => [...prevMessages, userMessage]);  
            setInput("");

            try {
                const response = await fetch("http://172.16.10.181:1234/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        input,
                    }),
                });

                const result = await response.json();
                const botResponse = {
                    sender: "bot",
                    text: result.response,
                };
                setMessages((prevMessages) => [...prevMessages, botResponse]);  
            } catch (error) {
                console.log("Error in the handleSend function: " + error);
                const botResponse = {
                    sender: "bot",
                    text: "Sorry, something went wrong. Please try again later.",
                };
                setMessages((prevMessages) => [...prevMessages, botResponse]);  
            }
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            console.log(chatEndRef.current);
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
     
    return (
        <div className="main">
            <div className="nav">
                <p>{activeChat?.name || "Chat Kid"}</p>
                <img src={assets.user_icon} alt="User icon" />
            </div>

            <div className="main_container">
                {messages.length === 0 ? (
                    <div className="greet">
                        <p>
                            <span>How are you? Bạn có khỏe không?</span>
                        </p>
                    </div>
                ) : (
                    <div className="chat_display">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat_message ${message.sender}`}>
                                {message.sender === "bot" ? (
                                    <div className="table-container">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                            {message.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    message.text
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                )}
            </div>

            <div className="search_box">
                <input
                    type="text"
                    placeholder="Bạn muốn hỏi cái gì?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <div>
                    <img src={assets.gallery_icon} alt="Gallery icon" />
                    <img src={assets.mic_icon} alt="Mic icon" />
                    <img
                        src={assets.send_icon}
                        alt="Send icon"
                        onClick={handleSend}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>
            <p className="bottom_info">
                Website này tạo ra để phát hiện chứng trầm cảm ở các em nhỏ ^^
            </p>
        </div>
    );
};

export default Main;
