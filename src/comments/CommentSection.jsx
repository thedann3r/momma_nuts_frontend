import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

function CommentSection({ productId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const backendUrl = "http://127.0.0.1:5000";  // Your backend URL

  useEffect(() => {
    // Fetch comments for a specific product using the correct URL structure
    fetch(`${backendUrl}/comments/product/${productId}`)
      .then((res) => res.json())  // Convert response to JSON
      .then((data) => setComments(data))  // Set the comments state
      .catch((err) => console.error("Failed to fetch comments", err));
  }, [productId]);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    fetch(`${backendUrl}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        content: newComment,
        product_id: productId,
      }),
    })
      .then((res) => res.json())  // Parse the response as JSON
      .then((data) => {
        setComments((prev) => [...prev, data]);  // Add new comment to the list
        setNewComment("");  // Clear the input field
      })
      .catch((err) => console.error("Failed to post comment", err));
  };

  return (
    <div className="flex flex-col max-h-[80vh] relative">
      <div className="overflow-y-auto mb-20 space-y-4">
        {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
      </div>

      <form onSubmit={handlePostComment} className="fixed bottom-0 w-full bg-white border-t flex p-4">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 mr-2"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
}
export default CommentSection;
