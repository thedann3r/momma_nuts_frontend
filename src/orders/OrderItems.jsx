import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderItems = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id} Details</h2>
      <p>Status: <span className="font-medium">{order.status}</span></p>
      <p>Total Price: <span className="font-medium">${order.total_price.toFixed(2)}</span></p>

      <h3 className="mt-3 font-semibold">Items:</h3>
      <ul className="list-disc pl-5">
        {order.items.map((item) => (
          <li key={item.product_id} className="flex items-center gap-3 border-b py-2">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <div>
              <p className="font-medium">{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/orders" className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Back to Orders
      </Link>
    </div>
  );
};

export default OrderItems;
