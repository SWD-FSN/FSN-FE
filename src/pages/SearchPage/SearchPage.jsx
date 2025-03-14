import React, { useState } from "react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("hik");

  // Mock data for search results based on the image
  const searchResults = [
    {
      id: 1,
      username: "gmhikaru",
      name: "Hikaru Nakamura",
      verified: true,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      username: "hikariyanghuali",
      name: "ひかり ゆきゃっふぇ",
      verified: false,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      username: "hikoybrand",
      name: "Hikoybrand",
      verified: true,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      username: "hikmet.qazi",
      name: "Hikmat Mammadov",
      verified: true,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 5,
      username: "hikoinu",
      name: "하이코이누 Hikoinu 2017",
      verified: false,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 6,
      username: "hikingvibes81",
      name: "Hiking VIBES",
      verified: false,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 7,
      username: "carlos.hikri",
      name: "Carlos",
      verified: true,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 8,
      username: "bam_boy_725",
      name: "Hikaru Kusano",
      verified: false,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 9,
      username: "hikarimoon",
      name: "hika ･ﾟ♡･",
      verified: false,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 10,
      username: "hik_sita0310",
      name: "Nayanmoni Kalita",
      verified: false,
      avatar: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="flex h-screen bg-white">

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">

        {/* Search area */}
        <div className="p-4">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-full p-2 bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 ml-2 mr-2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                placeholder="Tìm kiếm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-500 mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Search results */}
          <div className="mt-4">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center py-3 border-b border-gray-100 cursor-pointer"
              >
                <div className="flex-shrink-0 mr-3">
                  <img
                    src={result.avatar}
                    alt={result.username}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{result.username}</span>
                    {result.verified && (
                      <svg
                        className="w-4 h-4 ml-1 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.7l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4-8 8z" />
                      </svg>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">{result.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
