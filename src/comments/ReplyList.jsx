import React from "react";
import axios from "axios";

const ReplyList = ({ replies, setReplies, currentUser, parentCommentId }) => {
  if (!replies || replies.length === 0) {
    return <p className="text-sm text-gray-400 ml-4">No replies yet.</p>;
  }

  const handleDeleteReply = async (replyId) => {
    if (window.confirm("Delete this reply?")) {
      try {
        await axios.delete(`/comments/${parentCommentId}/replies/${replyId}`);
        setReplies((prevReplies) => prevReplies.filter((r) => r.id !== replyId));
      } catch (err) {
        console.error("Error deleting reply:", err);
      }
    }
  };

  return (
    <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
      {replies.map((reply) => (
        <div key={reply.id} className="mb-2">
          <p className="text-sm font-semibold">{reply.user.name}</p>
          <p className="text-base">{reply.content}</p>
          {currentUser?.id === reply.user.id && (
            <button
              className="text-red-500 text-xs ml-2"
              onClick={() => handleDeleteReply(reply.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
