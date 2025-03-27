import { useDebounce } from "@/hooks/useDebound";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || ""; // Lấy query từ URL
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Lấy userId từ localStorage khi component mount
  useEffect(() => {
    const userStorage = localStorage.getItem("userInfo");
    if (userStorage) {
      setUserId(JSON.parse(userStorage).user_id);
    }
  }, []);

  // Cập nhật URL khi searchQuery thay đổi
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  // Gọi API khi debouncedSearchQuery thay đổi
  useEffect(() => {
    if (!debouncedSearchQuery.trim() || userId === null) {
      setUsers([]);
      return;
    }

    setLoading(true);

    fetch(
      `http://localhost:8080/search-object/user/${userId}/keyword/${debouncedSearchQuery}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu");
        }
        return response.json();
      })
      .then((data) => {
        console.log("📥 Nhận dữ liệu:", data);
        setUsers(data);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi fetch:", err);
        setError("Không thể tải dữ liệu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchQuery, userId]);

  const handleSelectUser = (user) => {
    console.log("User selected:", user);
    navigate(`/user-post/${user.user_id}`);
  };

  const handleClickEnter = (post) => {
    console.log("post",post)
    navigate("/post-cart-page", { state: { post } });
  };
  return (
    <div className="flex h-screen bg-white">
      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        {/* Search area */}
        <div className="p-4">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-full p-2 bg-gray-100">
              {/* Icon tìm kiếm */}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (users?.data?.posts?.length > 0) {
                      handleClickEnter(users.data.posts);
                    } else {
                      console.warn("Không có dữ liệu để truyền!");
                    }
                  }
                }}
                className="flex-1 bg-transparent outline-none"
                placeholder="Tìm kiếm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-500 mr-2"
                >
                  {/* Icon Xóa */}
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

          {/* Hiển thị lỗi */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Hiển thị trạng thái Loading */}
          {loading && (
            <p className="text-gray-500 text-center mt-2">Đang tìm kiếm...</p>
          )}

          {/* Search results */}
          <div className="mt-4">
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xxl mx-auto">
              {users && users?.data?.users?.length > 0
                ? users.data.users.map((result) => (
                    <div
                      onClick={() => handleSelectUser(result)} // Xử lý khi click
                      key={result.user_id}
                      className="flex items-center py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition duration-200"
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0 mr-3">
                        <img
                          src={result.profile_avatar ?? ""} // Placeholder nếu ảnh lỗi
                          alt={result.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>

                      {/* Thông tin người dùng */}
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-semibold">
                            {result.username}
                          </span>
                          {result.is_friend_with_actor && (
                            <svg
                              className="w-4 h-4 ml-1 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.7l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4-8 8z" />
                            </svg>
                          )}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {result.follower_amount} Followers
                        </div>
                      </div>
                    </div>
                  ))
                : !loading && (
                    <div className="flex items-center justify-center py-6 text-gray-400">
                      Không có kết quả
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
