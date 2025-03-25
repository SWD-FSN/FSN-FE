import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from '../footer/Footer';
import DraggableDialog from '../popupBlog/Blog';


function DefaultLayout({children, headerTitle}) {
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);

    const handleCreateClick = () => {
        setShowCreatePostForm(true);
    };

    const handleCloseForm = () => {
        setShowCreatePostForm(false);
    };

    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar onCreateClick={handleCreateClick} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Feed */}
            <div className="flex-1 border-r border-gray-200 overflow-y-auto">
              {headerTitle && (
                <header className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
                  <h1 className="text-xl font-semibold text-center">
                    {headerTitle}
                  </h1>
                </header>
              )}

              {/* Posts */}
              {children}
            </div>
          </div>

          {/* Login Sidebar */}
          <LoginSidebar />
        </div>

        {/* Footer */}
        <Footer />

        {/* Create Post Form */}
        {showCreatePostForm && (
          <DraggableDialog showCreatePostForm={showCreatePostForm} setShowCreatePostForm={setShowCreatePostForm} />
        )}
      </div>
    );
}

function Sidebar({ onCreateClick }) {
  const navItems = [
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Home",
      link: "/home",
    },
    {
      icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
      label: "Search",
      link: "/search",
    },
    {
      icon: "M2 8l10 6 M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.264 0-2.474-.197-3.596-.564a1 1 0 00-.8.1l-3.528 2.117a1 1 0 01-1.4-1.075l.684-3.42a1 1 0 00-.27-.874A7.993 7.993 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      label: "Message",
      link: "/message",
    },
    { 
      icon: "M12 4v16m8-8H4", 
      label: "Create",
      onClick: onCreateClick,
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      label: "Likes",
      link: "/likes",
    },
    {
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      label: "Profile",
      link: "/profile",
    },
  ];

  return (
    <div className="w-16 border-r border-gray-200 flex flex-col items-center py-4">
      <div className="mb-8">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-black"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <nav className="flex flex-col items-center space-y-8">
        {navItems.map((item, index) => (
          <Link
            key={index}
            className="p-2 hover:bg-gray-100 rounded-md"
            title={item.label}
            to={item.link || "#"}
            onClick={item.onClick}
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
                strokeWidth={2}
                d={item.icon}
              />
            </svg>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button className="p-2 hover:bg-gray-100 rounded-md" title="Settings">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function LoginSidebar() {
  return (
    <div className="hidden md:block w-80 p-4">
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold text-lg">
          Đăng nhập hoặc đăng ký Threads
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
        </p>

        <div className="mt-6 space-y-4">
          <a
            href="#"
            className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#000000" />
              <path
                d="M12 7.37v9.26M7.37 12h9.26"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Tiếp tục bằng Google</span>
          </a>

          <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Đăng nhập bằng tên người dùng
          </button>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;