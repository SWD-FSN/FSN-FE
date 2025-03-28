import React, { useState, useEffect } from "react";

const CommentModal = ({
  isOpen,
  onClose,
  postId,
  onAddComment,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchComments = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/comments/post/${postId}`);
          const data = await response.json();
          if (Array.isArray(data.data)) {
            setComments(data.data);
          } else {
            console.error("Invalid data format:", data);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchComments();
    }
  }, [isOpen, postId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const currentUser = localStorage.getItem("username") || "Anonymous";
      const now = new Date();
      const timestamp = `${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;

      const newCommentData = {
        username: currentUser,
        text: newComment,
        timestamp,
      };

      // Update the UI immediately
      setComments((prevComments) => [...prevComments, newCommentData]);

      // Call the parent handler to persist the comment
      onAddComment(postId, newComment, currentUser);

      setNewComment("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg w-full max-w-lg max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading comments...</p>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{comment.username}</p>
                    <p className="text-gray-700">{comment.content || comment.text}</p> {/* Use the correct field */}
                    <p className="text-xs text-gray-500 mt-1">
                      {comment.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;