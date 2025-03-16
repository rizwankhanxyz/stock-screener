import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaRobot, FaUser, FaTimes, FaComments } from "react-icons/fa";
import "../styles/Chatbot.css";

const Chatbot = () => {
    // const [response, setResponse] = useState("");
    const [response, setResponse] = useState([]); // Store chat messages
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Chatbot visibility state


    const handleSubmit = async () => {
        // e.preventDefault();
        if (!query.trim()) return; // Prevent empty messages

        // Add user message to chat
        const newUserMessage = { text: query, sender: "user" };
        setResponse((prevMessages) => [...prevMessages, newUserMessage]);
        try {
            const { data } = await axios.post("http://localhost:5000/api/ai/ask-ai",
                { userQuery: query },
                { withCredentials: true }
            );

            const newBotMessage = { text: data.response, sender: "bot" };
            // setResponse(data.response);
            setResponse((prevMessages) => [...prevMessages, newBotMessage]);

        } catch (error) {
            // setResponse("Error: Unable to fetch response.");
            const errorMessage = "Sorry, an error occurred. Please try again.";
            setResponse((prevMessages) => [...prevMessages, { text: errorMessage, sender: "bot" }]);
        }
        setQuery("");
    };

    return (
        <div className="chatbot-wrapper">
            {/* Chatbot Toggle Button */}
            {!isOpen && (
                <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
                    <FaComments size={24} />
                </button>
            )
            }
            {isOpen && (
                <div className="chatbot-container">
                    {/* Chat Header with Close Button */}
                    <div className="chat-header">
                        Your AI Assistant
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>
                    {/* Chat Messages */}
                    <div className="chat-body">
                        {response.map((msg, index) => (
                            <div key={index} className={`chat-bubble ${msg.sender}`}>
                                {msg.sender === "user" ? <FaUser className="chat-icon" /> : <FaRobot className="chat-icon" />}
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    {/* Chat Input Box */}
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask about stock compliance..."
                            onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
                        />
                        <button onClick={handleSubmit}>
                            <FaPaperPlane />
                        </button>
                    </div>
                    {/* <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about NSE/BSE stocks..."
                />
                <button type="submit">Ask</button>
            </form> */}
                    {/* {response && <div className="chat-response">{response}</div>} */}
                </div>)}
        </div>
    );
};

export default Chatbot;