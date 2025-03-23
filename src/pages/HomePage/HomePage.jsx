import React, { useState, useEffect } from "react";
import styles from './HomePage.module.css'; // Import CSS

// Hình ảnh fallback/placeholder
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M30 40 L50 65 L70 40' stroke='%23999' stroke-width='4' fill='none'/%3E%3Ccircle cx='50' cy='30' r='8' fill='%23999'/%3E%3C/svg%3E";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");
        const data = await response.json();
        
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Dữ liệu không phải là mảng:", data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchPosts();
  }, []);

  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.postsContainer}>
        {Array.isArray(posts) && posts.map((post) => (
          <article key={post.post_id} className={styles.post}>
            <div className={styles.flexContainer}>
              <img
                src={post.profile_avatar}
                alt={`${post.username}'s avatar`}
                className={styles.avatar}
                onError={handleImageError}
              />
              <div className={styles.contentContainer}>
                <h3 className={styles.username}>{post.username}</h3>
                <p className={styles.postContent}>{post.content}</p>
                <div className={styles.postFooter}>
                  <span className={styles.likes}>{post.likeAmount} likes</span>
                  <span className={styles.comments}>3 comments</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Component Sidebar trái
function Sidebar() {
  const navItems = [
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Home",
    },
    { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", label: "Search" },
    { icon: "M12 4v16m8-8H4", label: "Create" },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      label: "Likes",
    },
    {
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      label: "Profile",
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
          <button
            key={index}
            className="p-2 hover:bg-gray-100 rounded-md"
            title={item.label}
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
          </button>
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

// Component cho mỗi bài đăng
function Post({ post, onImageError }) {
  const {
    user,
    timeAgo,
    content,
    images,
    likes,
    comments,
    mentions,
    hasUserIcon,
    userIconText,
  } = post;

  return (
    <article className="p-4">
      <div className="flex items-start">
        {hasUserIcon ? (
          <img
            src={user.avatar || FALLBACK_IMAGE}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover mr-3"
            onError={onImageError}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span className="font-bold text-sm">{userIconText}</span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{user.username}</h3>
              <p className="text-gray-500 text-sm">{timeAgo}</p>
            </div>
            <button className="text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </div>
          <p className="mt-2">{content}</p>

          {mentions &&
            mentions.map((mention, idx) => (
              <p key={idx} className="text-blue-500">
                {mention}
              </p>
            ))}

          {images && images.length > 0 && (
            <div
              className={`mt-3 ${
                images.length > 1 ? "grid grid-cols-2 gap-2" : ""
              }`}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Post image ${idx + 1}`}
                  className={`rounded-md object-cover ${
                    images.length === 1 ? "w-full max-h-72" : "w-full h-40"
                  }`}
                  onError={onImageError}
                />
              ))}
            </div>
          )}

          <div className="flex items-center mt-3 text-gray-500">
            <button className="flex items-center mr-4">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes}</span>
            </button>
            <button className="flex items-center mr-4">
              <svg
                className="w-5 h-5 mr-1"
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
              <span>{comments}</span>
            </button>
            <button className="flex items-center mr-4">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button className="flex items-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Component sidebar đăng nhập
function LoginSidebar() {
  return (
    <div className="hidden md:block w-80 p-4">
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold text-lg">
          Đăng nhập hoặc đăng ký Fsocial
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

export default HomePage;
