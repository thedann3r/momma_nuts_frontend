import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import ReplyList from './ReplyList';
import ReplyForm from './ReplyForm';

const CommentItem = ({ comment, currentUser }) => {
  const [liked, setLiked] = useState(comment.liked_by_user);
  const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
  const [showReplies, setShowReplies] = useState(false);
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [replyContent, setReplyContent] = useState('');

  const handleLikeToggle = async () => {
    try {
      if (!liked) {
        const res = await axios.post(`/likes/${comment.id}`);
        setLikeCount(prev => prev + 1);
      } else {
        await axios.delete(`/likes/${comment.id}`);
        setLikeCount(prev => prev - 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      const res = await axios.post('/replies', {
        parent_id: comment.id,
        content: replyContent,
      });
      setReplies([...replies, res.data]);
      setReplyContent('');
      setReplyInputVisible(false);
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  const handleDeleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`/comments/${comment.id}`);
        // Optional: remove from UI (if managing in parent component)
      } catch (err) {
        console.error("Error deleting comment:", err);
      }
    }
  };
  

  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold">{comment.user.username}</p>
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
