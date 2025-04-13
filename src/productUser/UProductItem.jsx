import { useState } from "react";
import CommentSection from "../comments/CommentSection";

const url = "http://127.0.0.1:5000";

function UProductItem({ id, name, image, description, price, stock }) {
  const [loading, setLoading] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);  // Track comment section visibility
  const token = localStorage.getItem("access_token");

  const handleAddToCart = () => {
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    setLoading(true);

    fetch(`${url}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: id, quantity: 1 }), // Default quantity = 1
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add to cart");
        }
        return res.json();
      })
      .then(() => {
        alert(`${name} added to cart!`);
      })
      .catch((err) => console.error("Error adding to cart:", err))
      .finally(() => setLoading(false));
  };

  const toggleCommentSection = () => {
    setShowCommentSection(prev => !prev);  // Toggle the visibility of the comment section
  };

  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={name} />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <h3 className="product-price">Price: ${price}</h3>
        <h3 className="product-stock">Stock: {stock} available</h3>
        <div className="product-buttons">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
          
          {/* Add comment button */}
          <button 
            className="comment-btn"
            onClick={toggleCommentSection}
          >
            {showCommentSection ? "Hide Comments" : "Comment"}
          </button>
        </div>
      </div>

      {/* Conditionally show the comment section */}
      {showCommentSection && (
        <div className="comment-section">
          <h3>Comments</h3>
          <CommentSection productId={id} />
        </div>
      )}
    </div>
  );
}

export default UProductItem;
