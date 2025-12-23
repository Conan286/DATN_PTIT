import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chatbot.css";
import {
  MessageOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Tạo hoặc lấy sessionId từ localStorage
  const [sessionId] = useState(() => {
    let id = localStorage.getItem("goalguard_session");
    if (!id) {
      id = "ss_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("goalguard_session", id);
    }
    return id;
  });

  const scrollRef = useRef(null);

  // 1. Lấy lịch sử chat khi mở khung chat 
  useEffect(() => {
    if (open) {
      fetchHistory();
    }
  }, [open]);

  // Tự động cuộn xuống cuối
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:3100/api/chatbot/history?sessionId=${sessionId}`); // 
      if (res.data.status) {
        // Lọc bỏ tin nhắn System Prompt nếu có trong mảng trả về
        const history = res.data.data
          .filter(m => m.role !== "user" || (m.parts[0].text && !m.parts[0].text.includes("Nhiệm vụ:")))
          .map(m => ({
            from: m.role === "user" ? "user" : "bot",
            text: m.parts[0].text
          }));
        setMessages(history);
      }
    } catch (err) {
      console.error("Lỗi lấy lịch sử:", err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim() || loading) return;

    const userMsg = { from: "user", text: text };
    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3100/api/chatbot/send", { // 
        message: text,
        sessionId: sessionId,
      });

      if (res.data.status) {
        setMessages((prev) => [...prev, { from: "bot", text: res.data.data.reply }]); // 
      }
    } catch (error) {
      setMessages((prev) => [...prev, { from: "bot", text: "Lỗi kết nối máy chủ!" }]);
    } finally {
      setLoading(false);
    }
  };

  // 2. Xóa lịch sử trò chuyện 
  const clearChat = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch sử trò chuyện?")) {
      try {
        const res = await axios.post("http://localhost:3100/api/chatbot/clear-history", { sessionId }); // 
        if (res.data.status) {
          setMessages([]);
        }
      } catch (err) {
        console.error("Lỗi xóa lịch sử:", err);
      }
    }
  };

  return (
    <>
      <div className="chatbot-icon" onClick={() => setOpen(!open)}>
  <span className="icon-pulse"></span>
  <MessageOutlined />
</div>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <div className="header-info">
              <div className="online-dot"></div>
              <span>AI Support</span>
            </div>
            <div className="header-actions">
             <span
  className="action-btn"
  title="Xóa lịch sử"
  onClick={clearChat}
>
  <DeleteOutlined />
</span>

<span
  className="action-btn"
  onClick={() => setOpen(false)}
>
  <CloseOutlined />
</span>
            </div>
          </div>

          <div className="chatbot-body" ref={scrollRef}>
            {messages.length === 0 && !loading && (
              <div className="bot-welcome">Chào bạn! Mình có thể giúp gì cho bạn?</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`message-wrapper ${m.from}`}>
                <div className="message-bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="message-wrapper bot">
                <div className="message-bubble typing">•••</div>
              </div>
            )}
          </div>

          <div className="chatbot-footer">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage} disabled={loading || !text.trim()}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}