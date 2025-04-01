import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css"

const url = "http://127.0.0.1:5000";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get(`${url}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setCartItems(response.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch cart")
      );
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return; // Prevent negative values
    axios
      .post(
        `${url}/cart`,
        { product_id: cartId, quantity }, // Don't subtract before sending
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => fetchCart())
      .catch((err) => alert(err.response?.data?.error || "Failed to update quantity"));
  };
  

  const removeItem = (cartId) => {
    axios
      .delete(`${url}/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => fetchCart())
      .catch((err) =>
        alert(err.response?.data?.error || "Failed to remove item")
      );
  };

  const handleCheckout = () => {
    axios
      .post(
        `${url}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        alert("Checkout successful! Proceed to payment.");
        
        // Pass orderId and amount using state
        navigate("/mpesa", { state: { orderId: response.data.order_id, amount: response.data.total_amount } });
      })
      .catch((err) => alert(err.response?.data?.error || "Checkout failed"));
  };
  

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {error && <p className="error">{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="cart-controls">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
