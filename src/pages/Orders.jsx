/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/frontend_assets/assets";
import UnAuthorized from "../components/UnAuthorized";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isViewRateModalOpen, setIsViewRateModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [userReviews, setUserReviews] = useState({});
  const displayPrice = selectedOrder?.discountStatus
    ? selectedOrder?.discountedPrice
    : selectedOrder?.price;

  const loadOrdersData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/user-orders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
        const reviews = {};
        response.data.orders.forEach((order) => {
          if (order.review) {
            reviews[order._id] = order.review;
          }
        });
        setUserReviews(reviews);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, [token]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReview({ rating: "", comment: "" });
  };

  const openViewRateModal = (orderId) => {
    setSelectedOrder(orderId);
    setIsViewRateModalOpen(true);
  };

  const closeViewRateModal = () => {
    setIsViewRateModalOpen(false);
    setSelectedOrder(null);
  };

  const handleReviewSubmit = async () => {
    if (review.rating < 1 || review.rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    if (!review.rating || !review.comment) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/review`,
        {
          orderId: selectedOrder._id,
          rating: review.rating,
          comment: review.comment,
          userName: selectedOrder.address.firstName,
          phone: selectedOrder.address.phone,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Review submitted successfully");
        closeReviewModal();
        loadOrdersData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!token) return <UnAuthorized />;

  return (
    <div className="border-t pt-16">
      <div className="text-3xl font-semibold text-gray-900">
        <Title text1={"My"} text2={`Orders`} />
      </div>
      <div>
        {orderData.map((order, index) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={index}
          >
            <div className="flex items-center text-sm gap-6">
              <img
                src={assets.orders}
                className="w-16 sm:w-20 border border-gray-400 rounded-lg"
                alt=""
              />
              <div>
                <p className="sm:text-base font-medium">{order.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <div className="text-black font-semibold text-lg">
                    <div>
                      {" "}
                      Order Id:{" "}
                      <span className="text-gray-500 font-medium text-base">
                        {" "}
                        {order._id.slice(-5)}{" "}
                      </span>
                    </div>
                    Order Price:{" "}
                    <span className="text-gray-500 font-medium text-base">
                      {" "}
                      {order.amount}{" "}
                      <span className="currency">{currency}</span>{" "}
                    </span>
                  </div>
                </div>
                <p className="text-black font-semibold text-lg">
                  {" "}
                  Date:{" "}
                  <span className="text-gray-500 font-medium text-base">
                    {" "}
                    {new Date(order.date).toDateString()}{" "}
                  </span>
                </p>
                <p className="text-black font-semibold text-lg">
                  {" "}
                  Payment:{" "}
                  <span className="text-gray-500 font-medium text-base">
                    {" "}
                    {order.paymentMethod === "COD"
                      ? "Cash on delivery"
                      : order.paymentMethod}{" "}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                {/* Colored dots for order status */}
                <span
                  className={`min-w-[10px] h-[10px] rounded-lg ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : order.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <p className="text-sm md:text-base">{order.status}</p>
              </div>
              <div className="flex items-center gap-2">
                {order.status === "Delivered" ? (
                  userReviews[order._id]?.rating === undefined ||
                  userReviews[order._id]?.rating === 0 ? (
                    <button
                      onClick={() => openReviewModal(order)}
                      className="border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white rounded-md transition duration-300"
                    >
                      Rate The Order
                    </button>
                  ) : (
                    <button
                      onClick={() => openViewRateModal(order._id)}
                      className="border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white rounded-md transition duration-300"
                    >
                      View Your Rate
                    </button>
                  )
                ) : (
                  <button
                    onClick={loadOrdersData}
                    className="border border-gray-400 px-4 py-2 hover:bg-black hover:text-white text-sm font-medium rounded-md transition duration-300"
                  >
                    Track order
                  </button>
                )}
                <button
                  onClick={() => openModal(order)}
                  className="border border-gray-400 px-4 py-2 text-sm font-medium rounded-md hover:bg-black 
                  hover:text-white transition-all duration-300"
                >
                  Order Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black 
        bg-opacity-60 z-[1100] w-full h-full"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-lg h-full overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-semibold text-gray-800">
                Order Details
              </h4>
              <button
                onClick={closeModal}
                className="text-red-500 text-xl hover:text-red-600 transition duration-200"
              >
                ✕
              </button>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <h5 className="font-semibold text-gray-700 mb-[8px]">
                Customer Information
              </h5>
              <p>
                <strong>Name:</strong> {selectedOrder.address.firstName}{" "}
                {selectedOrder.address.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.address.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.address.phone}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.address.street},{" "}
                {selectedOrder.address.city}
              </p>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <h5 className="font-semibold text-gray-700 mb-[8px]">
                Order Summary
              </h5>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.date).toDateString()}
              </p>
              <p>
                <strong>Delivery Fee:</strong>{" "}
                {selectedOrder.delivery_fee.toFixed(2)}
                <span className="currency">{currency}</span>
              </p>
              <p>
                <strong>Discount:</strong> {selectedOrder.discount.toFixed(2)}
                <span className="currency">{currency}</span>
              </p>
              <p>
                <strong>Total Amount:</strong> {selectedOrder.amount.toFixed(2)}
                <span className="currency">{currency}</span>
              </p>
            </div>

            {/* Items Table */}
            <div className="mb-[24px]">
              <h5 className="font-semibold text-gray-700 mb-[8px]">Items</h5>
              <table className="min-w-full border border-gray-300 mt-[8px] rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    {["Item Name", "Size", "Quantity", "Price"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-[12px] py-[10px] border text-left"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition duration-200"
                    >
                      <td className="px-[12px] py-[10px] border text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px]">
                        {item.name}
                      </td>
                      <td className="px-[12px] py-[10px] border">
                        {item.size}
                      </td>
                      <td className="px-[12px] py-[10px] border">
                        {item.quantity}
                      </td>
                      <td className="px-[12px] py-[10px] border">
                        {item?.discountStatus
                          ? item?.discountedPrice
                          : item?.price}
                        <span className="currency">{currency}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-black text-white px-[12px] py-[8px] rounded-lg hover:opacity-70 transition duration=200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[1100]">
          <div className="bg-white p-[24px] rounded-lg w-full max-w-md shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-[16px]">
              Write a Review
            </h4>
            <label className="block mb-2">
              <span className="text-gray-700">Rating</span>
              <input
                type="number"
                value={review.rating}
                onChange={(e) =>
                  setReview({ ...review, rating: e.target.value })
                }
                min="1"
                max="5"
                className="block w-full mt-1 border-gray-400 border rounded-md shadow-sm focus:border-gray-500 p-2"
                placeholder="Rating (1-5)"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Comment</span>
              <textarea
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                rows="4"
                className="block w-full mt-1 border-gray-400 border rounded-md shadow-sm focus:border-gray-500 p-2"
                placeholder="Write your review"
              ></textarea>
            </label>
            <div className="flex justify-end mt-[16px]">
              <button
                type="submit"
                onClick={handleReviewSubmit}
                className="bg-white text-black border px-[12px] py-[8px] rounded-lg mr-[8px] 
                border-black hover:bg-black hover:text-white transition duration=200"
              >
                Submit Review
              </button>
              <button
                onClick={closeReviewModal}
                className="bg-black text-white px-[12px] py-[8px] rounded-lg hover:opacity-70 transition duration=200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Your Rate Modal */}
      {isViewRateModalOpen && userReviews[selectedOrder] && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[1100]">
          <div className="bg-white p-[24px] rounded-lg w-full max-w-md shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-[16px]">
              Your Rating
            </h4>
            <p>
              <strong>Rating:</strong> {userReviews[selectedOrder].rating}
            </p>
            <p>
              <strong>Comment:</strong> {userReviews[selectedOrder].comment}
            </p>

            {/* Close Button */}
            <div className="flex justify-end mt-[16px]">
              <button
                onClick={closeViewRateModal}
                className="bg-black text-white px-[12px] py-[8px] rounded-lg hover:opacity-70 transition duration=200"
              >
                {" "}
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
