import * as React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  Avatar,
  TextField,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import {
  Image,
  Gif,
  EmojiEmotions,
  LocationOn,
  Close,
} from "@mui/icons-material";

export default function CreatePostDialog({
  showCreatePostForm,
  setShowCreatePostForm,
}) {
  const [postContent, setPostContent] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleClose = () => {
    setShowCreatePostForm(false);
  };
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (storedUserInfo) {
    console.log("User Email:", storedUserInfo.email);
    console.log("User Role:", storedUserInfo.role);
    console.log("User ID:", storedUserInfo.user_id);
  } else {
    console.log("No user information found in localStorage.");
  }

  // Thêm state này vào đầu component
const [isSubmitting, setIsSubmitting] = React.useState(false);
const [error, setError] = React.useState(null);

// Hàm handleSubmit đã cập nhật
const handleSubmit = async () => {
  setError(null);
  setIsSubmitting(true);
  
  try {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!storedUserInfo?.user_id) throw new Error("User chưa xác thực");

    const payload = {
      author_id: storedUserInfo.user_id,
      content: postContent,
      attachment: selectedFile || "",
      is_private: isPrivate,
      is_hidden: isHidden
    };

    const response = await fetch("http://localhost:8080/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Tạo bài viết thất bại");

    // Thành công
    setPostContent("");
    setSelectedFile(null);
    setShowCreatePostForm(false);
  } catch (err) {
    setError(err.message);
    console.error("Lỗi bài viết:", err);
  } finally {
    setIsSubmitting(false);
  }
};

// Thêm hiển thị lỗi trong JSX
{error && (
  <Typography color="error" sx={{ mt: 2 }}>
    Lỗi: {error}
  </Typography>
)}

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      // 1. Upload file lên server
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedFile(data.fileUrl);
        console.log("File URL:", data.fileUrl);

        // 2. Lấy thông tin user từ localStorage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.user_id) {
          throw new Error("User information not found");
        }

        // 3. Tạo payload cho bài post
        const payload = {
          author_id: userInfo.user_id,
          content: "Nội dung bài post", // Thay bằng state của bạn
          attachment: data.fileUrl,     // URL từ service upload
          // is_private: false,           // Có thể thay bằng state
          // is_hidden: false             // Có thể thay bằng state
        };

        // 4. Gửi request tạo bài post đến BE Golang
        const postResponse = await fetch("http://localhost:8080/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(payload)
        });

        if (!postResponse.ok) {
          const errorData = await postResponse.json();
          throw new Error(errorData.message || "Failed to create post");
        }

        const postData = await postResponse.json();
        console.log("Post created:", postData);
        
        // 5. Cập nhật UI hoặc thực hiện các thao tác sau khi tạo post
        // Ví dụ: load lại danh sách bài post, hiển thị thông báo thành công...
        
      } else {
        console.error("Upload failed:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  }
};

  return (
    <Dialog
      open={showCreatePostForm}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DialogContent
          sx={{
            backgroundColor: "#1c1c1c",
            color: "#fff",
            borderRadius: 2,
            padding: "16px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
              New Post
            </Typography>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                <Close />
              </IconButton>
            </motion.div>
          </div>

          {/* User Info */}
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <Avatar sx={{ width: 40, height: 40, marginRight: 2 }} />
            <div>
              <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
              {storedUserInfo?.email || "Anonymous"}
              </Typography>
              <Typography sx={{ color: "gray", fontSize: 14 }}>
                Add a topic
              </Typography>
            </div>
          </div>

          {/* Post Input */}
          <TextField
            fullWidth
            variant="standard"
            placeholder="What's new?"
            multiline
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: { color: "#fff", fontSize: 18 },
            }}
            sx={{
              backgroundColor: "transparent",
              border: "none",
              marginBottom: 2,
            }}
          />

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <div>
              {[
                { icon: <Image />, key: "image", accept: "image/*" },
                { icon: <Gif />, key: "gif", accept: "image/gif" },
                { icon: <EmojiEmotions />, key: "emoji" },
                { icon: <LocationOn />, key: "location" },
              ].map(({ icon, key, accept }) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ display: "inline-block" }}
                >
                  {accept ? (
                    <>
                      <label htmlFor={key}>
                        <IconButton sx={{ color: "gray" }} component="span">
                          {icon}
                        </IconButton>
                      </label>
                      <input
                        type="file"
                        accept={accept}
                        style={{ display: "none" }}
                        id={key}
                        onChange={handleFileSelect}
                      />
                    </>
                  ) : (
                    <IconButton sx={{ color: "gray" }}>{icon}</IconButton>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="primary"
                disabled={!postContent.trim()}
                onClick={handleSubmit}
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  padding: "6px 16px",
                }}
              >
                Post
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
