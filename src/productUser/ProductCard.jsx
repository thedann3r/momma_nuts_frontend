import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const backendUrl = "http://127.0.0.1:5000";

function ProductCard({ product, currentUser }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product.likes?.length || 0);

  useEffect(() => {
    if (currentUser) {
        fetch(`${backendUrl}/products/${product.id}/likes`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
        .then((res) => res.json())
        .then((data) => {
          setLiked(data.liked);
          setLikesCount(data.likes_count);
        })
        .catch((err) => console.error("Error checking like status:", err));
    }
  }, [product.id, currentUser]);

  const handleLikeToggle = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const method = liked ? "DELETE" : "POST";

    fetch(`${backendUrl}/products/${product.id}/likes`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })      
      .then((res) => res.json())
      .then((data) => {
        if (liked) {
          setLiked(false);
          setLikesCount((prev) => prev - 1);
        } else {
          setLiked(true);
          setLikesCount((prev) => prev + 1);
        }
      })
      .catch((err) => console.error("Error toggling like:", err));
  };

  return (
    <div className="border rounded p-4 shadow-md">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>{product.description}</p>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handleLikeToggle}
          className="flex items-center text-red-500"
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span className="ml-1 text-sm">{likesCount}</span>
        </button>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
