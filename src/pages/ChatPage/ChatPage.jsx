import React, { useState } from "react";
import ChatList from "../../components/Chats/ChatList";
import ChatHeader from "../../components/Chats/ChatHeader";
import ChatMessages from "../../components/Chats/ChatMessages";
import ChatInput from "../../components/Chats/ChatInput";


const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [conversations, setConversations] = useState([
    // Dữ liệu conversations giữ nguyên như code gốc
    {
      id: 1,
      name: "Quốc trưởng Yeager",
      avatar:
        "https://luomthuomhair.com/wp-content/uploads/2023/08/240525199_1474330392965841_5259520135876930579_n.jpeg",
      online: true,
      lastMessage: "chưa ngủ luôn à",
      time: "1 giờ",
      messages: [
        { id: 1, text: "chưa ngủ luôn à", sender: "them", time: "2:10 SA" },
        { id: 2, text: "-.-", sender: "them", time: "2:10 SA" },
        {
          id: 3,
          text: "ngủ đi mai dậy sớm xong xuống sớm",
          sender: "me",
          time: "2:10 SA",
        },
        { id: 4, text: "nhớ đi", sender: "them", time: "2:10 SA" },
        { id: 5, text: "chưa", sender: "me", time: "2:10 SA" },
        { id: 6, text: "h ngủ", sender: "me", time: "2:11 SA" },
        { id: 7, text: "vừa xong", sender: "me", time: "2:11 SA" },
        { id: 8, text: "😃", sender: "them", time: "2:11 SA" },
        { id: 9, text: "ok", sender: "them", time: "2:12 SA" },
        { id: 10, text: "bibi", sender: "them", time: "2:12 SA" },
      ],
    },
    {
      id: 2,
      name: "Chè em nóng ❤️",
      avatar:
        "https://i.pinimg.com/736x/fb/a7/8f/fba78fbad5a3e84b735f6ffb79de4f62.jpg",
      online: false,
      unread: true,
      lastMessage: "=)))) bò đi ngủ thật hãaa cáaa",
      time: "52 phút",
      messages: [],
    },
    {
      id: 3,
      name: "Hoàng Vũ Huy",
      avatar:
        "https://i.pinimg.com/736x/fb/a7/8f/fba78fbad5a3e84b735f6ffb79de4f62.jpg",
      online: false,
      lastMessage: "H ngủ :((",
      time: "1 giờ",
      messages: [],
    },
    {
      id: 4,
      name: "Nhu Cầu Ăn Uống Version 2",
      avatar:
        "https://i.pinimg.com/736x/fb/a7/8f/fba78fbad5a3e84b735f6ffb79de4f62.jpg",
      groupChat: true,
      unread: true,
      lastMessage: "Đức: Sơn à 🥰",
      time: "2 giờ",
      messages: [],
    },
    {
      id: 5,
      name: "Nguyễn Pu",
      avatar:
        "https://i.pinimg.com/736x/fb/a7/8f/fba78fbad5a3e84b735f6ffb79de4f62.jpg",
      lastMessage: "Cuộc gọi video đã kết thúc.",
      time: "2 giờ",
      messages: [],
    },
    {
      id: 6,
      name: "Dãk Grup",
      avatar:
        "https://i.pinimg.com/736x/fb/a7/8f/fba78fbad5a3e84b735f6ffb79de4f62.jpg",
      unread: true,
      groupChat: true,
      lastMessage: "Cọc Lốc: 🔥",
      time: "2 giờ",
      messages: [],
    },
    {
      id: 7,
      name: "Người em thân iu",
      avatar:
        "https://i.pinimg.com/736x/fb/a7/8f/fba78fbad5a3e84b735f6ffb79de4f62.jpg",
      lastMessage: "nói với kèo là ngon xong ừ cho nó mắm.",
      time: "5 giờ",
      messages: [],
    },
    {
      id: 8,
      name: "Anh Đức",
      avatar:
        "https://i.pinimg.com/736x/fb/a7/8f/fba78fbad5a3e84b735f6ffb79de4f62.jpg",
      unread: true,
      lastMessage: "Ừ",
      time: "5 giờ",
      messages: [],
    },
  ]);

  const activeConvo = conversations.find(
    (conv) => conv.id === activeConversation
  );

  const filteredMessages = activeConvo?.messages.filter((message) =>
    messageSearchQuery
      ? message.text.toLowerCase().includes(messageSearchQuery.toLowerCase())
      : true
  );

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
      id: activeConvo.messages.length + 1,
      text: messageInput,
      sender: "me",
      time: timeString,
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: messageInput,
              time: "Vừa xong",
              messages: [...conv.messages, newMessage],
            }
          : conv
      )
    );
    setMessageInput("");
  };

  const toggleMessageSearch = () => {
    setShowMessageSearch(!showMessageSearch);
    if (showMessageSearch) setMessageSearchQuery("");
  };

  const shouldShowAvatar = (messages, index) => {
    if (messages[index].sender !== "them") return false;
    if (index === messages.length - 1 || messages[index + 1].sender === "me") {
      return true;
    }
    return false;
  };

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
