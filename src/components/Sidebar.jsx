import { useState } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

function Sidebar({
  chats,
  setChats,
  currentChatId,
  setCurrentChatId,
  defaultChat,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [editingId, setEditingId] = useState(null);
const [newTitle, setNewTitle] = useState("");
  function createNewChat() {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: defaultChat,
    };

    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }
  function saveTitle(chatId) {
  if (!newTitle.trim()) {
    setEditingId(null);
    return;
  }


  setChats((prev) =>
    prev.map((chat) =>
      chat.id === chatId
        ? { ...chat, title: newTitle.trim() }
        : chat
    )
  );

  setEditingId(null);
}
function deleteChat(chatId) {
  if (chats.length === 1) {
    alert("You must have at least one chat.");
    return;
  }

  const updatedChats = chats.filter((chat) => chat.id !== chatId);

 console.log("Before:", chats);
console.log("After:", updatedChats);

setChats(updatedChats);

  if (currentChatId === chatId) {
    setCurrentChatId(updatedChats[0].id);
  }
}
  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">

    <div className="brand-logo">
        🐉
    </div>

    <div>

        <h2>Rayquaza AI</h2>

        <p>AI Assistant</p>

    </div>

</div>

          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <button
          className="new-chat"
          onClick={createNewChat}
        >
          <FaPlus />
          New Chat
        </button>

        <div className="history">
          {chats.map((chat) => (
            <div
  key={chat.id}
  className={`chat-item ${
    currentChatId === chat.id ? "active-chat" : ""
  }`}
>
 {editingId === chat.id ? (
  <input
  className="rename-input"
  value={newTitle}
  onChange={(e) => setNewTitle(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      saveTitle(chat.id);
    }
  }}
  autoFocus
/>
) : (
  <p
    onClick={() => {
      setCurrentChatId(chat.id);

      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }}
  >
    💬 {chat.title}
  </p>
)}

 <button
  className="edit-chat"
  onClick={(e) => {
    e.stopPropagation();
    setEditingId(chat.id);
    setNewTitle(chat.title);
  }}
>
  <FaEdit />
</button>
<button
  className="delete-chat"
  onClick={(e) => {
    e.stopPropagation();

    if (window.confirm("Delete this chat?")) {
      deleteChat(chat.id);
    }
  }}
>
  <FaTrash />
</button>
</div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;