import {
    ChatBubbleOutline,
    FavoriteBorder,
    Repeat,
    Send,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    IconButton,
    Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { formatDate } from "../Helpers/GetFormatDate";

const PostList = () => {
  const location = useLocation();
  const posts = location.state?.post; // Lấy dữ liệu từ state

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
        py: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          border: "2px solid #ddd",
          borderRadius: "12px",
          bgcolor: "#fff",
          boxShadow: 3,
          p: 2,
        }}
      >
        {/* Hiển thị danh sách bài đăng */}
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <Card
              key={post.post_id}
              sx={{
                bgcolor: "#fff",
                color: "#000",
                borderRadius: 3,
                p: 2,
                mb: 2,
                boxShadow: 1,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 4,
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
                {/* Avatar */}
                <Avatar
                  src={post.profile_avatar}
                  alt={post.username}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />

                {/* Nội dung bài đăng */}
                <Box sx={{ flex: 1 }}>
                  {/* Tên người dùng & Thời gian */}
                  <Typography variant="body1" fontWeight="bold">
                    {post.username}{" "}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ ml: 1, opacity: 0.6 }}
                    >
                      {formatDate(post.created_at)}
                    </Typography>
                  </Typography>

                  {/* Nội dung */}
                  <Typography variant="body2" sx={{ mt: 0.5, color: "#333" }}>
                    {post.content}
                  </Typography>

                  {post.attachment ? (
                    <Avatar
                      src={post.attachment}
                      alt={post.username}
                      sx={{ width: 200, height: 150 }}
                    />
                  ) : null}

                  {/* Hành động */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton sx={{ color: "#555" }} size="small">
                      <FavoriteBorder />
                    </IconButton>
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      {post.like_amount ?? 0}
                    </Typography>

                    <IconButton sx={{ color: "#555" }} size="small">
                      <ChatBubbleOutline />
                    </IconButton>
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      {post.comments}
                    </Typography>

                    <IconButton sx={{ color: "#555" }} size="small">
                      <Repeat />
                    </IconButton>

                    <IconButton sx={{ color: "#555", ml: "auto" }} size="small">
                      <Send />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Container>
    </Box>
  );
};

export default PostList;
