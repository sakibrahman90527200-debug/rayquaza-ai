import { FaPaperPlane, FaPaperclip, FaMicrophone } from "react-icons/fa";

function InputBar({
  input,
  setInput,
  handleSend,
  loading,
}) {
  return (
    <div className="input-area">
      <button className="icon-btn">
        <FaPaperclip />
      </button>

      <input
  className="chat-input"
        type="text"
        value={input}
        placeholder="Ask Rayquaza anything..."
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
        disabled={loading}
      >
        {loading ? "..." : <FaPaperPlane />}
      </button>
    </div>
  );
}

export default InputBar;