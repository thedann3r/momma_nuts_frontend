import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ReplyList from './ReplyList';
import ReplyForm from './ReplyForm';

const backendUrl = "http://127.0.0.1:5000"; // Adjust if needed

const CommentItem = ({ comment, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
  const [showReplies, setShowReplies] = useState(false);
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [replyContent, setReplyContent] = useState('');

  // Fetch initial like status when the component mounts
  useEffect(() => {
    if (currentUser) {
      console.log("Fetching like status for comment", comment.id);
      fetch(`${backendUrl}/comments/${comment.id}/likes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Like status data:", data); // <-- See what comes in!
          setLiked(data.liked);
          setLikeCount(data.likes_count);
        })
        .catch((err) => {
          console.error("Error fetching like status:", err);
        });
    }
  }, [comment.id, currentUser]);  

  const handleLikeToggle = () => {
    const token = localStorage.getItem("access_token");

    if (!liked) {
      fetch(`${backendUrl}/comments/${comment.id}/likes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          setLikeCount((prev) => prev + 1);
          setLiked(true);
        })
        .catch((err) => {
          console.error("Error toggling like:", err);
        });
    } else {
      fetch(`${backendUrl}/comments/${comment.id}/likes`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLikeCount((prev) => prev - 1);
          setLiked(false);
        })
        .catch((err) => {
          console.error("Error toggling like:", err);
        });
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    fetch('/replies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent_id: comment.id,
        content: replyContent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReplies([...replies, data]);
        setReplyContent('');
        setReplyInputVisible(false);
      })
      .catch((err) => {
        console.error("Error posting reply:", err);
      });
  };

  const handleDeleteComment = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      fetch(`/comments/${comment.id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          // Optional: remove from UI (if managing in parent component)
        })
        .catch((err) => {
          console.error("Error deleting comment:", err);
        });
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold">{comment.user.name}</p>
          <p className="text-base">{comment.content}</p>
        </div>
        <div className="text-red-500 cursor-pointer" onClick={handleLikeToggle}>
          {liked ? <FaHeart /> : <FaRegHeart />}
          <p className="text-xs text-gray-500 text-center">{likeCount}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-2 text-sm text-gray-600">
        <button onClick={() => setShowReplies(prev => !prev)}>
          {showReplies ? "Hide Replies" : "View Replies"}
        </button>
        <button onClick={() => setReplyInputVisible(prev => !prev)}>Reply</button>
      </div>

      {showReplies && (
        <ReplyList replies={replies} />
      )}

      {replyInputVisible && (
        <ReplyForm
          commentId={comment.id}
          onReplyAdded={(newReply) => setReplies(prev => [...prev, newReply])}
        />
      )}

      {currentUser?.id === comment.user.id && (
        <button
          className="text-red-500 text-sm ml-2"
          onClick={handleDeleteComment}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CommentItem;
