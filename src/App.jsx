import { useState } from "react";
import "./App.css";
import { askAI } from "./api";

import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
  FaPlus,
  FaPaperclip,
  FaMicrophone,
} from "react-icons/fa";

function App() {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 How can I help you today?",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const reply = await askAI(question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to connect to OpenRouter.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>🐉 Rayquaza AI</h2>

        <button
          className="new-chat"
          onClick={() =>
            setMessages([
              {
                sender: "ai",
                text: "Hello 👋 How can I help you today?",
              },
            ])
          }
        >
          <FaPlus />
          New Chat
        </button>

        <div className="history">
          <p>💬 AI Project</p>
          <p>💬 College Work</p>
          <p>💬 Random Chat</p>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <h1>Rayquaza AI</h1>
          <p>Your Personal AI Assistant</p>
        </header>

        <section className="chat-area">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
            >
              {msg.sender === "ai" && (
                <div className="avatar">
                  <FaRobot />
                </div>
              )}

              <div className="bubble">{msg.text}</div>

              {msg.sender === "user" && (
                <div className="avatar user-avatar">
                  <FaUserCircle />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="message ai">
              <div className="avatar">
                <FaRobot />
              </div>

              <div className="bubble">
                Thinking...
              </div>
            </div>
          )}
        </section>

        <div className="input-area">
          <button className="icon-btn">
            <FaPaperclip />
          </button>

          <input
            type="text"
            value={input}
            placeholder="Message Rayquaza AI..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />

          <button className="icon-btn">
            <FaMicrophone />
          </button>

          <button
            className="send-btn"
            onClick={handleSend}
          >
            <FaPaperPlane />
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;