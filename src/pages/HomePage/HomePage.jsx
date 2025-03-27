import React, { useEffect, useState } from "react";
import CommentModal from "../../components/CommentModal/CommentModal";
import { useSocket } from "../../contexts/SocketContext";

// Hình ảnh fallback/placeholder
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M30 40 L50 65 L70 40' stroke='%23999' stroke-width='4' fill='none'/%3E%3Ccircle cx='50' cy='30' r='8' fill='%23999'/%3E%3C/svg%3E";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = sessionStorage.getItem("username") || "Anonymous";
  const { sendNotification } = useSocket();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch("http://localhost:8080/posts");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error("Invalid response format");
        }
        
        const data = await response.json();
        
        if (!data || !Array.isArray(data.data)) {
          throw new Error("Invalid data structure");
        }

        setPosts(data.data.map(post => ({
          ...post,
          images: convertAttachmentToImages(post.attachment),
          comments: post.comments || [],
          like_amount: post.like_amount || 0,
          createdAt: post.createdAt || new Date().toISOString()
        })));
        
      } catch (err) {
        console.error("Fetch posts error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const convertAttachmentToImages = (attachment) => {
    if (!attachment) return [];
    if (Array.isArray(attachment)) return attachment;
    if (typeof attachment === 'string') {
      try {
        const parsed = JSON.parse(attachment);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [attachment];
      }
    }
    return [];
  };

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.post_id === postId) {
          if (post.username !== currentUser) {
            sendNotification({
              recipient: post.username,
              sender: currentUser,
              title: "New Like",
              body: `${currentUser} đã thích bài viết của bạn`,
              type: "like",
              postId: postId,
            });
          }
          return { ...post, like_amount: (post.like_amount || 0) + 1 };
        }
        return post;
      })
    );
  };

  const handleOpenComments = (postId) => {
    const post = posts.find(p => p.post_id === postId);
    if (post) {
      setSelectedPost(post);
      setShowCommentModal(true);
    }
  };

  const handleAddComment = (postId, commentText, commentAuthor) => {
    const now = new Date();
    const timestamp = `${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.post_id === postId) {
          const updatedPost = {
            ...post,
            comments: [
              ...(post.comments || []),
              { username: commentAuthor, text: commentText, timestamp },
            ],
          };

          if (post.username !== currentUser) {
            sendNotification({
              recipient: post.username,
              sender: currentUser,
              title: "New Comment",
              body: `${currentUser} commented: "${commentText.substring(0, 30)}..."`,
            });
          }

          return updatedPost;
        }
        return post;
      })
    );
  };

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading posts: {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        {posts.map(post => (
          <div key={post.post_id} className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                {post.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{post.username}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mb-4">{post.content}</p>

            {post.images?.length > 0 && (
              <div className={`mt-3 ${post.images.length > 1 ? "grid grid-cols-2 gap-2" : ""}`}>
                {post.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Post attachment ${idx + 1}`}
                    className={`rounded-md object-cover ${
                      post.images.length === 1 ? "w-full max-h-72" : "w-full h-40"
                    }`}
                    onError={handleImageError}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center text-gray-500 border-t border-gray-200 pt-3">
              <button
                onClick={() => handleLike(post.post_id)}
                className="flex items-center mr-6 hover:text-blue-500"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{post.like_amount} Likes</span>
              </button>

              <button
                onClick={() => handleOpenComments(post.post_id)}
                className="flex items-center hover:text-blue-500"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{post.comments?.length || 0} Comments</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <CommentModal
          isOpen={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          postId={selectedPost.post_id}
          postAuthor={selectedPost.username}
          comments={selectedPost.comments || []}
          onAddComment={handleAddComment}
        />
      )}
    </>
  );
}

export default HomePage;