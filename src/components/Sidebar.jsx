import { FaPlus, FaTimes } from "react-icons/fa";

function Sidebar({
  chats,
  setChats,
  currentChatId,
  setCurrentChatId,
  defaultChat,
  sidebarOpen,
  setSidebarOpen,
}) {
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
            <p
              key={chat.id}
              onClick={() => {
                setCurrentChatId(chat.id);

                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              className={
                currentChatId === chat.id ? "active-chat" : ""
              }
            >
              💬 {chat.title}
            </p>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;