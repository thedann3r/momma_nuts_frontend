import React, { useState } from 'react';
import axios from 'axios';

const ReplyForm = ({ commentId, onReplyAdded }) => {
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('/replies', {
        parent_id: commentId,
        content: replyContent,
      });

      onReplyAdded(res.data); // Notify parent to update replies
      setReplyContent('');
    } catch (err) {
      console.error("Error posting reply:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReplySubmit} className="mt-2 flex items-center gap-2 ml-4">
      <input
        type="text"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Write a reply..."
        className="flex-grow p-2 border border-gray-300 rounded-md"
        disabled={loading}
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ReplyForm;
