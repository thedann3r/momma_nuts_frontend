import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId, status) => {
    // Check if the user can cancel the order
    if (status === "completed" && userRole !== "admin") {
      alert("Only an admin can cancel a completed order.");
      return;
    }

    try {
      await axios.patch(`http://127.0.0.1:5000/orders/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update UI after cancellation
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "canceled" } : order
        )
      );
    } catch (error) {
      console.error("Error canceling order:", error.response?.data || error);
    }
  };

  const handlePayment = (orderId, amount) => {
    // Navigate to the payment page with order details
    navigate("/mpesa", { state: { orderId, amount } });
  };

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-lg mb-4 shadow">
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <p>Status: <span className="font-medium">{order.status}</span></p>
          <p>Total Price: <span className="font-medium">${order.total_price.toFixed(2)}</span></p>
          
          <Link to={`/order-items/${order.id}`} className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View More
          </Link>

          {/* Pay Now Button for Pending Orders */}
          {order.status === "pending" && (
            <button 
              onClick={() => handlePayment(order.id, order.total_price)}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Pay Now
            </button>
          )}

          {/* Cancel Button for Pending Orders and Admin Role */}
          {(order.status === "pending" || (order.status === "completed" && userRole === "admin")) && (
            <button 
              onClick={() => handleCancelOrder(order.id, order.status)}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;
