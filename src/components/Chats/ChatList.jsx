import React from "react";

const ChatList = ({
  conversations,
  activeConversation,
  setActiveConversation,
  searchQuery,
  setSearchQuery,
}) => {
  const filteredConversations = searchQuery
    ? conversations.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="w-96 border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-[0px!important]">Chats</h1>
      </div>

      <div className="px-4 py-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm trên Messenger"
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((convo) => (
          <div
            key={convo.id}
            className={`px-3 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${
              activeConversation === convo.id ? "bg-blue-50" : ""
            }`}
            onClick={() => setActiveConversation(convo.id)}
          >
            <div className="relative mr-3">
              <img
                src={convo.avatar}
                alt={convo.name}
                className="w-12 h-12 rounded-full"
              />
              {convo.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3
                  className={`text-sm font-semibold truncate ${
                    convo.unread ? "text-black" : "text-gray-700"
                  }`}
                >
                  {convo.name}
                </h3>
                <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">
                  {convo.time}
                </span>
              </div>
              <p
                className={`text-sm truncate ${
                  convo.unread ? "text-black font-medium" : "text-gray-500"
                }`}
              >
                {convo.lastMessage}
              </p>
            </div>
            {convo.unread && (
              <div className="w-3 h-3 bg-blue-500 rounded-full ml-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
