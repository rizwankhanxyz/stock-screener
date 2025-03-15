import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:5000/api/ai/ask-ai", { userQuery: query });
            setResponse(data.response);
        } catch (error) {
            setResponse("Error: Unable to fetch response.");
        }
    };

    return (
        <div className="chatbot-container">
            <h3>Ask AI about Stock Compliance</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about NSE/BSE stocks..."
                />
                <button type="submit">Ask</button>
            </form>
            {response && <div className="chat-response">{response}</div>}
        </div>
    );
};

export default Chatbot;