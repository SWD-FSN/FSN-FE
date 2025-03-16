import React from "react";

const ChatHeader = ({
  activeConvo,
  showMessageSearch,
  toggleMessageSearch,
  messageSearchQuery,
  setMessageSearchQuery,
  filteredMessages,
}) => {
  return (
    <div className="flex flex-col border-b border-gray-200 bg-white">
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={activeConvo?.avatar || "/api/placeholder/40/40"}
            alt={activeConvo?.name || "User"}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-semibold">{activeConvo?.name || "User"}</span>
        </div>
        <div className="flex space-x-2">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={toggleMessageSearch}
          >
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      {showMessageSearch && (
        <div className="px-4 py-2 border-t border-gray-200">
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
              placeholder="Tìm kiếm trong cuộc trò chuyện"
              className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none"
              value={messageSearchQuery}
              onChange={(e) => setMessageSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          {messageSearchQuery && (
            <div className="text-xs text-gray-500 mt-1">
              {filteredMessages.length} kết quả{" "}
              {filteredMessages.length > 0 ? "được tìm thấy" : ""}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
