import { FaRobot, FaUserCircle } from "react-icons/fa";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatArea({ messages, loading }) {
    const bottomRef = useRef(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);
  return (
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

          <div className="bubble">
  <ReactMarkdown
    components={{
      code({ inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");

        return !inline && match ? (
          <SyntaxHighlighter
            style={atomDark}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  >
    {msg.text}
  </ReactMarkdown>
</div>

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

          <div className="bubble thinking">
  <div className="typing-avatar">🐉</div>

  <div>
    <strong>Rayquaza</strong>

    <div className="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</div>
        </div>
      )}
      <div ref={bottomRef}></div>
    </section>
  );
}

export default ChatArea;