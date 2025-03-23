import React, { useState, useEffect, useRef } from "react";
import ChatList from "../../components/Chats/ChatList";
import ChatHeader from "../../components/Chats/ChatHeader";
import ChatMessages from "../../components/Chats/ChatMessages";
import ChatInput from "../../components/Chats/ChatInput";

const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [conversations, setConversations] = useState([]); // Khởi tạo là mảng rỗng
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("http://localhost:8080/conversations/keyword");
        const data = await response.json();
        console.log(data.data);
        if (data && Array.isArray(data.data)) {
          setConversations(data.data); // Đảm bảo dữ liệu là mảng
        } else {
          console.error("Dữ liệu trả về không phải là mảng:", data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:8080/conversations`);
          const data = await response.json();
          console.log(data);
          if (data && data.data && Array.isArray(data.data.messages)) {
            setMessages(data.data.messages); // Đảm bảo dữ liệu là mảng
          } else {
            console.error("Dữ liệu trả về không đúng:", data);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [activeConversation]);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.conversation_id === activeConversation) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.current.close();
    };
  }, [activeConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === "") return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${
      hours >= 12 ? "CH" : "SA"
    }`;

    const newMessage = {
      conversation_id: activeConversation,
      author_id: "me",
      author_avatar: "https://example.com/my_avatar.jpg",
      content: messageInput,
      created_at: timeString,
    };

    ws.current.send(JSON.stringify(newMessage));
    setMessageInput("");
  };

  const toggleMessageSearch = () => {
    setShowMessageSearch(!showMessageSearch);
    if (showMessageSearch) setMessageSearchQuery("");
  };

  const shouldShowAvatar = (messages, index) => {
    if (messages[index].author_id !== "them") return false;
    if (index === messages.length - 1 || messages[index + 1].author_id === "me") {
      return true;
    }
    return false;
  };

  const activeConvo = conversations.find(
    (conv) => conv.conversation_id === activeConversation
  );

  const filteredMessages = messages.filter((message) =>
    messageSearchQuery
      ? message.content.toLowerCase().includes(messageSearchQuery.toLowerCase())
      : true
  );

  return (
    <div className="flex h-screen bg-white">
      <ChatList
        conversations={conversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader
          activeConvo={activeConvo}
          showMessageSearch={showMessageSearch}
          toggleMessageSearch={toggleMessageSearch}
          messageSearchQuery={messageSearchQuery}
          setMessageSearchQuery={setMessageSearchQuery}
          filteredMessages={filteredMessages}
        />
        <ChatMessages
          activeConvo={activeConvo}
          messageSearchQuery={messageSearchQuery}
          filteredMessages={filteredMessages}
          shouldShowAvatar={shouldShowAvatar}
        />
        <ChatInput
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;