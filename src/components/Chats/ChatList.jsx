import React from "react";

const ChatList = ({ conversations, activeConversation, setActiveConversation, searchQuery, setSearchQuery }) => {
  const filteredConversations = conversations.filter((conversation) =>
    conversation.conversation_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <ul>
        {filteredConversations.map((conversation) => (
          <li
            key={conversation.conversation_id} // Thêm thuộc tính key duy nhất
            className={`p-4 cursor-pointer ${activeConversation === conversation.conversation_id ? "bg-gray-200" : ""}`}
            onClick={() => setActiveConversation(conversation.conversation_id)}
          >
            <div className="flex items-center">
              <img
                src={conversation.conversation_avatar}
                alt={conversation.conversation_name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-medium">{conversation.conversation_name}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
