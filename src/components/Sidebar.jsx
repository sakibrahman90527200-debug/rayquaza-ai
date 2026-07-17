import { FaPlus } from "react-icons/fa";

function Sidebar({
  chats,
  setChats,
  currentChatId,
  setCurrentChatId,
  defaultChat,
}) {
  function createNewChat() {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: defaultChat,
    };

    setChats((prev) => [...prev, newChat]);

    setCurrentChatId(newChat.id);
  }

  return (
    <aside className="sidebar">
      <h2>🐉 Rayquaza AI</h2>

      <button
        className="new-chat"
        onClick={createNewChat}
      >
        <FaPlus />
        New Chat
      </button>

      <div className="history">
        {chats.map((chat) => (
          <p
            key={chat.id}
            onClick={() => setCurrentChatId(chat.id)}
            style={{
              cursor: "pointer",
              fontWeight:
                currentChatId === chat.id ? "bold" : "normal",
            }}
          >
            💬 {chat.title}
          </p>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;