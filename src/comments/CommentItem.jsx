import React, { useState } from 'react';
import ReplyList from './ReplyList';
import ReplyForm from './ReplyForm';

const CommentItem = ({ comment, currentUser }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);

  const handleDeleteComment = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      fetch(`/comments/${comment.id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          // Optionally update parent state if needed
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
      </div>

      <div className="flex gap-4 mt-2 text-sm text-gray-600">
        <button onClick={() => setShowReplies(prev => !prev)}>
          {showReplies ? "Hide Replies" : "View Replies"}
        </button>
        <button onClick={() => setReplyInputVisible(prev => !prev)}>Reply</button>
      </div>

      {showReplies && <ReplyList replies={replies} />}

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
