import { Facebook, MoreVert, Verified } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../Helpers/GetFormatDate";

export default function UserPage() {
  const param = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("threads");
  const [posts, setPosts] = useState([]); // Lưu trữ dữ liệu bài đăng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const userStorage = localStorage.getItem("userInfo");

      if (userStorage) {
        const parsedUser = JSON.parse(userStorage);

        if (parsedUser?.user_id) {
          setUserId(parsedUser.user_id);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Lỗi khi parse JSON từ localStorage:", error);
    }
  }, [navigate]);

  // Gọi API khi có `userId` và `param.id`
  useEffect(() => {
    if (!userId || !param.id) return; // Chỉ gọi API nếu có cả `userId` và `param.id`

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/personal-profile/user/${param.id}/actor/${userId}`
        );
        setPosts(response.data);
        console.log("blog", response.data);
      } catch (err) {
        console.log(err);
        setError("Không thể tải dữ liệu, vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [param.id, userId]); // Lắng nghe cả `userId` và `param.id`

  if (loading) <div>loading.........</div>;
  if (error) <div>Error: {error}</div>;
  console.log("datassssssssssssss", posts.data);
  return (
    <>
      {posts.data ? (
        <>
          <div className="flex h-screen bg-white">
            {/* Main content */}
            <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
              {/* Search area */}
              <div className="p-4">
                <div className="max-w-xxl mx-auto p-4 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-md">
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                      backgroundColor: "white",
                    }}
                  >
                    {/* Header: Username + Avatar + More (3 dots) */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                          color: "#333",
                          letterSpacing: "0.5px",
                          textTransform: "capitalize",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {posts.data.username}
                        <Verified sx={{ color: "#1976d2", fontSize: "20px" }} />
                      </Typography>
                      ;
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar
                          src={posts.data.profile_avatar}
                          alt="User Avatar"
                          sx={{
                            width: 100,
                            height: 100,
                            border: "2px solid #1976d2",
                          }}
                        />
                      </Stack>
                    </Stack>

                    {/* Follow Info + Icons */}
                    <Box mt={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body2" color="textSecondary">
                          Follow:{posts.data.is_friend ?? 0}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small">
                            <Facebook color="primary" />
                          </IconButton>
                          <IconButton size="small">
                            <MoreVert />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                  {/* Follow and Mention Buttons */}
                  <div className="flex space-x-3 mt-4">
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#1d4ed8", // Màu xanh dương đậm
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "999px",
                        paddingY: "10px",
                        textTransform: "none",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#2563eb",
                        },
                      }}
                    >
                      Follow
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#6b7280", // Màu xám trung tính
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "999px",
                        paddingY: "10px",
                        textTransform: "none",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#4b5563",
                        },
                      }}
                    >
                      Mention
                    </Button>
                  </div>

                  {/* Tabs */}
                  <div className="flex justify-between mt-4 border-b border-gray-300">
                    {["threads", "replies", "reposts"].map((tab) => (
                      <Button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative pb-2 font-semibold transition-all duration-300 ${
                          activeTab === tab
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                        }`}
                        sx={{
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "2px",
                            backgroundColor:
                              activeTab === tab ? "black" : "transparent",
                            transform:
                              activeTab === tab ? "scaleX(1)" : "scaleX(0)",
                            transition: "transform 0.3s ease-in-out",
                          },
                          "&:hover": {
                            color: "#374151",
                            "&::after": {
                              transform: "scaleX(1)",
                              backgroundColor: "#6b7280",
                            },
                          },
                        }}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </Button>
                    ))}
                  </div>

                  {/* Post Section */}
                  {posts.data &&
                  posts.data.posts &&
                  posts.data.posts.length > 0 ? (
                    <>
                      <div className="mt-4 bg-white shadow-md border border-gray-300 rounded-lg p-4">
                        {posts.data.posts.map((post) => (
                          <div
                            key={post.post_id}
                            className="flex items-start space-x-4 border-b border-gray-200 pb-4 mb-4 last:border-none"
                          >
                            {/* Avatar */}
                            <img
                              src={post.profile_avatar}
                              alt="Avatar"
                              className="w-12 h-12 rounded-full border border-gray-300"
                            />

                            {/* Nội dung bài đăng */}
                            <div className="flex-1">
                              {/* Tên & Thời gian */}
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                  {post.username}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  {formatDate(post.created_at)}
                                </span>
                              </div>

                              {/* Nội dung bài viết */}
                              <p className="mt-1 text-gray-800">
                                {post.content}
                              </p>

                              {/* Hình ảnh đính kèm (nếu có) */}
                              {post.attachment && (
                                <img
                                  src={post.attachment}
                                  alt="Post"
                                  className="mt-2 rounded-lg w-full h-[100px] object-cover border border-gray-300"
                                />
                              )}

                              {/* Hành động */}
                              <div className="flex space-x-4 mt-3 text-gray-600">
                                {/* Thích */}
                                <button className="flex items-center space-x-1 hover:text-red-500 transition">
                                  ❤️ <span>{post.like_amount}</span>
                                </button>

                                {/* Bình luận */}
                                <button className="flex items-center space-x-1 hover:text-green-500 transition">
                                  💬 <span>5</span>
                                </button>

                                {/* Chia sẻ */}
                                <button className="flex items-center space-x-1 hover:text-blue-500 transition">
                                  🔄
                                </button>

                                {/* Lưu */}
                                <button className="flex items-center space-x-1 hover:text-yellow-500 transition">
                                  📌
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h1>There is no post </h1>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
