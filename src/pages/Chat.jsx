import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Chat.css";

const generateSessionId = () =>
    `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

function BotAvatar() {
    return (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-xs font-semibold text-gray-500 select-none">
            A
        </div>
    );
}

function UserAvatar() {
    return (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 text-xs font-semibold text-white select-none">
            U
        </div>
    );
}

function TypingBubble() {
    return (
        <div className="flex items-end gap-2 msg-enter">
            <BotAvatar />
            <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-gray-100">
                <span className="flex gap-1 items-center">
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animationDelay: "0.18s" }} />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animationDelay: "0.36s" }} />
                </span>
            </div>
        </div>
    );
}

export default function Chat() {
    const [sessionId] = useState(generateSessionId);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!message.trim() || loading) return;
        const text = message.trim();
        setMessage("");
        inputRef.current?.focus();
        setLoading(true);
        setMessages((prev) => [...prev, { type: "user", text, id: Date.now() }]);
        try {
            const res = await api.post("/chat/message", {
                sessionId,
                message: text,
            });
            setMessages((prev) => [
                ...prev,
                { type: "bot", text: res.data.data.reply, id: Date.now() + 1 },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { type: "error", text: "Something went wrong. Please try again.", id: Date.now() + 1 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat-root">

            {/* Top bar */}
            <div className="chat-topbar">
                <button onClick={() => navigate("/dashboard")} className="dashboard-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
                <div className="chat-messages-inner">

                    {messages.length === 0 && (
                        <div className="chat-empty empty-fade">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" width="40" height="40" opacity="0.2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <p>Send a message to get started</p>
                        </div>
                    )}

                    {messages.map((msg) => {
                        if (msg.type === "user") {
                            return (
                                <div key={msg.id} className="msg-row msg-row--user msg-enter">
                                    <div className="bubble bubble--user">{msg.text}</div>
                                    <UserAvatar />
                                </div>
                            );
                        }
                        if (msg.type === "error") {
                            return (
                                <div key={msg.id} className="msg-row msg-enter">
                                    <BotAvatar />
                                    <div className="bubble bubble--error">{msg.text}</div>
                                </div>
                            );
                        }
                        const parts = msg.text.split("\n").filter(Boolean);
                        return (
                            <div key={msg.id} className="msg-row msg-enter">
                                <BotAvatar />
                                <div className="bubble-stack">
                                    {parts.map((part, i) => (
                                        <div key={i} className={`bubble bubble--bot${i === parts.length - 1 ? " bubble--bot-last" : ""}`}>
                                            {part}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {loading && <TypingBubble />}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="chat-inputbar">
                <div className="chat-inputbar-inner">
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Write your message!"
                        disabled={loading}
                        className="chat-input"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading || !message.trim()}
                        className="send-btn"
                    >
                        {loading ? (
                            <svg className="spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                                <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        ) : (
                            <>
                                Send
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" style={{ transform: "rotate(90deg)" }}>
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}