"use client";
import React, { useState, useEffect, useRef, use } from "react";

interface Message {
  id: number;
  text: string;
}

function debounce(fn: (...args: any) => void, delay: number) {
  // create seTimeout in a let
  let timeout: NodeJS.Timeout;
  // return
  return (...args: any) => {
    //clear the setTimeOut
    clearTimeout(timeout);
    // let recevies the setTimeOut with args
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredMessages, setFilterdMessages] = useState<Message[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const fakeMessages = [
      "Hello!",
      "How are you?",
      "This is a test message.",
      "React is great!",
      "Simulated real-time chat...",
      "Frontend interviews are intense!",
    ];

    intervalRef.current = setInterval(() => {
      const randomMessage =
        fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
      const newMessage: Message = { id: Date.now(), text: randomMessage };
      setMessages((prev) => [...prev, newMessage]);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;

    new Promise((resolve: (value: Message) => void) => {
      setTimeout(() => {
        const newMessage: Message = { id: Date.now(), text: input };
        resolve(newMessage);
      }, 500);
    }).then((newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    });
  };

  const debounceSearch = useRef(
    debounce((query, messages) => {
      if (!query) {
        setFilterdMessages(messages);
      } else {
        setFilterdMessages(
          messages.filter((m: Message) =>
            m.text.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
    }, 500)
  ).current;

  useEffect(() => {
    debounceSearch(search, messages);
  }, [search, messages]);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>🧪 Real-Time Chat</h2>

      <input
        placeholder="🔍 Search messages"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <div
        style={{
          border: "1px solid #ccc",
          height: 200,
          overflowY: "auto",
          padding: 8,
          marginBottom: 10,
          background: "#000",
        }}
      >
        {(search ? filteredMessages : messages).map((msg) => (
          <div key={msg.id} style={{ marginBottom: 4 }}>
            🗨️ {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 12px" }}>
          Send
        </button>
      </div>
    </div>
  );
}
