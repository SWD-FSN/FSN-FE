import * as React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, Avatar, TextField, IconButton, Button, Typography } from "@mui/material";
import { Image, Gif, EmojiEmotions, LocationOn, Close } from "@mui/icons-material";

export default function CreatePostDialog({ showCreatePostForm, setShowCreatePostForm }) {
  const [postContent, setPostContent] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);

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


const handleSubmit = async () => {
  // Lấy user info từ localStorage
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!storedUserInfo || !storedUserInfo.user_id) {
      console.error("User info not found in localStorage!");
      return;
  }

  const payload = {
      author_id: storedUserInfo.user_id, // Lấy user_id từ localStorage
      content: postContent,
      is_private: isPrivate,
      is_hidden: isHidden,
  };

    try {
      const response = await fetch("http://localhost:8080/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data);
        setPostContent(""); // Clear the input field
        setShowCreatePostForm(false); // Close the dialog
      } else {
        console.error("Failed to create post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Dialog open={showCreatePostForm} onClose={handleClose} fullWidth maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DialogContent sx={{ backgroundColor: "#1c1c1c", color: "#fff", borderRadius: 2, padding: "16px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
              New thread
            </Typography>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                <Close />
              </IconButton>
            </motion.div>
          </div>

          {/* User Info */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <Avatar sx={{ width: 40, height: 40, marginRight: 2 }} />
            <div>
              <Typography sx={{ fontWeight: "bold", color: "#fff" }}>ghetlaptrinh_189</Typography>
              <Typography sx={{ color: "gray", fontSize: 14 }}>Add a topic</Typography>
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
            InputProps={{ disableUnderline: true, sx: { color: "#fff", fontSize: 18 } }}
            sx={{ backgroundColor: "transparent", border: "none", marginBottom: 2 }}
          />

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
            <div>
              {[{ icon: <Image />, key: "image" }, { icon: <Gif />, key: "gif" }, { icon: <EmojiEmotions />, key: "emoji" }, { icon: <LocationOn />, key: "location" }].map(({ icon, key }) => (
                <motion.div key={key} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={{ display: "inline-block" }}>
                  <IconButton sx={{ color: "gray" }}>{icon}</IconButton>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="primary"
                disabled={!postContent.trim()}
                onClick={handleSubmit}
                sx={{ textTransform: "none", borderRadius: "20px", padding: "6px 16px" }}
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