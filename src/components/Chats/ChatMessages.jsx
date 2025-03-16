import React from "react";

const ChatMessages = ({
  activeConvo,
  messageSearchQuery,
  filteredMessages,
  shouldShowAvatar,
}) => {
  return (
    <div
      className="flex-1 overflow-y-auto p-4 bg-amber-50"
      style={{
        backgroundImage: "url(/api/placeholder/900/900)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col space-y-4 mx-auto">
        {(messageSearchQuery ? filteredMessages : activeConvo?.messages)?.map(
          (message, index, messages) => {
            const isHighlighted =
              messageSearchQuery &&
              message.text
                .toLowerCase()
                .includes(messageSearchQuery.toLowerCase());

            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "them" &&
                  shouldShowAvatar(messages, index) && (
                    <img
                      src={activeConvo.avatar}
                      alt={activeConvo.name}
                      className="w-8 h-8 rounded-full mr-2 self-end"
                    />
                  )}
                {message.sender === "them" &&
                  !shouldShowAvatar(messages, index) && (
                    <div className="w-8 h-8 mr-2"></div>
                  )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs ${
                    message.sender === "me"
                      ? isHighlighted
                        ? "bg-green-700 text-white"
                        : "bg-green-600 text-white"
                      : isHighlighted
                      ? "bg-yellow-100 text-black"
                      : "bg-white text-black"
                  } ${isHighlighted ? "ring-2 ring-yellow-400" : ""}`}
                >
                  {message.text}
                </div>
              </div>
            );
          }
        )}
        {messageSearchQuery && filteredMessages.length === 0 && (
          <div className="text-center p-4 text-gray-500">
            Không tìm thấy tin nhắn nào phù hợp với "{messageSearchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
