import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const currentUser = sessionStorage.getItem("username") || "Anonymous";

  useEffect(() => {
    const socketInstance = io("http://localhost:4000", {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
      socketInstance.emit("register", { username: currentUser });
    });

    socketInstance.on("notification", (data) => {
      toast(
        <div className="flex items-center gap-3">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg"
            alt="notification"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-base">{data.body}</p>
        </div>,
        {
          duration: 4000,
          position: "bottom-right",
          style: {
            padding: "16px",
            minWidth: "300px",
            backgroundColor: "#fff",
            color: "#333",
          },
        }
      );
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [currentUser]);

  const sendNotification = (notification) => {
    if (socket) {
      socket.emit("notification", notification);
    }
  };

  const value = {
    socket,
    isConnected,
    sendNotification,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
