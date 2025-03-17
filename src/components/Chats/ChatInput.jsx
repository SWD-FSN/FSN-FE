import React from "react";

const ChatInput = ({ messageInput, setMessageInput, handleSendMessage }) => {
  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center">
      <div className="flex space-x-2 mr-2">
        <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="M21 15l-5-5L5 21"></path>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSendMessage} className="flex-1 flex items-center">
        <input
          type="text"
          placeholder="Aa"
          className="flex-1 py-2 px-4 rounded-full bg-gray-100 focus:outline-none"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 text-green-500"
          disabled={!messageInput.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              d="M3 12l7-7v4h11v6H10v4z"
              transform="rotate(180 12 12)"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
