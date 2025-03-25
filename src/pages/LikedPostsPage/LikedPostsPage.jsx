import React, { useState, useEffect } from "react";
import styles from './LikedPostsPage.module.css'; // Import CSS

// Hình ảnh fallback/placeholder
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M30 40 L50 65 L70 40' stroke='%23999' stroke-width='4' fill='none'/%3E%3Ccircle cx='50' cy='30' r='8' fill='%23999'/%3E%3C/svg%3E";

const LikedPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/liked-posts");
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

    fetchLikedPosts();
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

export default LikedPostsPage;