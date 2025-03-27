import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function NotificationList({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const username = localStorage.getItem("userInfo");

  useEffect(() => {
    if (isOpen && username) {
      fetchNotifications();
    }
  }, [isOpen, username]);

  const fetchNotifications = async () => {
    try {
      const userData = localStorage.getItem("userInfo");
      const userDataDecode = JSON.parse(userData);
      const userId = userDataDecode?.user_id;
      const apiUrl = `http://localhost:8080/notifications/user/${userId}`;
      const response = await fetch(
        // `http://localhost:4000/notifications/${username}`
        apiUrl
      );
      const data = await response.json();
      setNotifications(data.data?.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getNotificationIcon = (content) => {
    const value = content?.includes("like") ? "New Like" : "New Comment";
    switch (value) {
      case "New Like":
        return (
          <svg
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "New Comment":
        return (
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        );
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(
        `http://localhost:4000/notifications/${notificationId}/read`,
        {
          method: "PUT",
        }
      );
      setNotifications(
        notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Thông báo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Không có thông báo nào
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  notification.read ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => markAsRead(notification.notification_id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.content)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{notification.content}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {format(
                        new Date(notification.created_at),
                        "HH:mm dd/MM/yyyy"
                      )}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationList;
