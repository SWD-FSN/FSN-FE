import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://api.openai.com/v1/chat/completions";
  const API_KEY = "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"; // Thay bằng API key thật

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        }),
      });
      
      const data = await response.json();
      const aiMessage = {
        sender: "ai",
        text: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="h-80 overflow-y-auto border-b p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-2 rounded ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100"}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-gray-400">Đang phản hồi...</p>}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l focus:outline-none"
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
