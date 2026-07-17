import { useState, useEffect } from "react";
import "./App.css";
import { askAI } from "./api";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import InputBar from "./components/InputBar";

function App() {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const defaultChat = [
  {
    sender: "ai",
    text: "🐉 Greetings, Trainer. How may I assist you today?",
  },
];

const [chats, setChats] = useState(() => {
  const saved = localStorage.getItem("rayquaza-chats");

  if (saved) return JSON.parse(saved);

  return [
    {
      id: Date.now(),
      title: "New Chat",
      messages: defaultChat,
    },
  ];
});

const [currentChatId, setCurrentChatId] = useState(chats[0].id);

const messages =
  chats.find(chat => chat.id === currentChatId)?.messages || defaultChat;

useEffect(() => {
  localStorage.setItem(
    "rayquaza-chats",
    JSON.stringify(chats)
  );
}, [chats]);

async function handleSend() {
  if (!input.trim() || loading) return;

  const question = input;

  const updatedMessages = [
    ...messages,
    {
      sender: "user",
      text: question,
    },
  ];

  setChats((prev) =>
    prev.map((chat) =>
      chat.id === currentChatId
        ? { ...chat, messages: updatedMessages }
        : chat
    )
  );

  setInput("");
  setLoading(true);

  try {
    const chatHistory = updatedMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const reply = await askAI(chatHistory);

    setChats((prev) =>
  prev.map((chat) => {
    if (chat.id !== currentChatId) return chat;

    return {
      ...chat,
      title:
        chat.title === "New Chat"
          ? question.substring(0, 25)
          : chat.title,
      messages: [
        ...updatedMessages,
        {
          sender: "ai",
          text: reply,
        },
      ],
    };
  })
);
  } catch (err) {
    console.error(err);

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [
  ...updatedMessages,
  {
    sender: "ai",
    text:
      "⚠ Rayquaza couldn't connect to the AI server. Please try again.",
  },
],
            }
          : chat
      )
    );
  }

  setLoading(false);
}

  return (
    <div className="container">
      <Sidebar
  chats={chats}
  setChats={setChats}
  currentChatId={currentChatId}
  setCurrentChatId={setCurrentChatId}
  defaultChat={defaultChat}
/>

      <main className="main">
        <Header />

        <ChatArea
          messages={messages}
          loading={loading}
        />

        <InputBar
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;