/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { backendUrl, token, currency } = useContext(ShopContext);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/${orderId}`, {
        headers: { token: localStorage.getItem("token") || token },
      });
      if (response.data.success) {
        setOrder(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">Order not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-md my-10 border border-gray-400">
      <div className="mb-6">
        <Link
          to="/profile"
          className="text-blue-500 hover:underline text-sm font-semibold"
        >
          &larr; Back to Profile
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-700">Order Details</h2>

      <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-400">
        <p className="mb-4">
          <span className="font-semibold">Order ID:</span>{" "}
          <span className="text-gray-600">{order._id.slice(-5)}</span>
        </p>
        <p className="mb-4">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`${
              order.status === "Completed"
                ? "text-green-500"
                : order.status === "Pending"
                ? "text-yellow-500"
                : "text-gray-500"
            } font-semibold`}
          >
            {order.status || "Pending"}
          </span>
        </p>
        <p className="mb-4">
          <span className="font-semibold">Total Amount:</span>{" "}
          <span className="text-gray-600">
            {order.amount.toFixed(2)}
            <span className="currency">{currency}</span>
          </span>
        </p>
        <p className="mb-4">
          <span className="font-semibold">Order Date:</span>{" "}
          <span className="text-gray-600">
            {new Date(order.date).toDateString()}
          </span>
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">Items</h3>
      <div className="bg-white shadow rounded-lg p-6 mb-4 border border-gray-400">
        {order.items.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <li key={index} className="py-1 flex">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item?.image[0] || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1 w-full">
                  <p className="text-lg font-medium text-gray-700 truncate max-w-[180px] md:max-w-full">
                    {item.name}
                  </p>

                  <div className="flex gap-5">
                    <p className="text-sm text-gray-500 truncate">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      Size: {item.size}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 truncate">
                    Price: {item.price.toFixed(2)}
                    <span className="currency">{currency}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items in this order.</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
