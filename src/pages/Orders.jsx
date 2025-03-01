/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "../assets/frontend_assets/assets";
import UnAuthorized from "../components/UnAuthorized";
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isViewRateModalOpen, setIsViewRateModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [userReviews, setUserReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const displayPrice = selectedOrder?.discountStatus
    ? selectedOrder?.discountedPrice
    : selectedOrder?.price;

  const navigate = useNavigate();

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
    } finally {
      setLoading(false);
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
      toast.error("يجب أن يكون التقييم بين 1 و 5");
      return;
    }

    if (!review.rating || !review.comment) {
      toast.error("جميع الحقول مطلوبة.");
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
        toast.success("تم إرسال التقييم بنجاح");
        closeReviewModal();
        loadOrdersData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <UnAuthorized />;

  const nonDeliveredOrders = orderData.filter(
    (order) => order.status !== "تم التوصيل"
  );
  const deliveredOrders = orderData.filter(
    (order) => order.status === "تم التوصيل"
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-16 w-16 
        border-t-2 border-b-2 border-black"
        ></div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16" dir="rtl">
      <div className="text-3xl font-semibold text-gray-900">
        <Title text1={"طلباتي"} text2={""} />
      </div>
      <div>
        {nonDeliveredOrders.map((order, index) => (
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
                      رقم الطلب:{" "}
                      <span className="text-gray-500 font-medium text-base">
                        {" "}
                        {order._id.slice(-5)}{" "}
                      </span>
                    </div>
                    سعر الطلب:{" "}
                    <span className="text-gray-500 font-medium text-base">
                      {" "}
                      {order.amount}{" "}
                      <span className="currency">{currency}</span>{" "}
                    </span>
                  </div>
                </div>
                <p className="text-black font-semibold text-lg">
                  {" "}
                  التاريخ:{" "}
                  <span className="text-gray-500 font-medium text-base">
                    {" "}
                    {new Date(order.date).toDateString()}{" "}
                  </span>
                </p>
                <p className="text-black font-semibold text-lg">
                  {" "}
                  طريقة الدفع:{" "}
                  <span className="text-gray-500 font-medium text-base">
                    {" "}
                    {order.paymentMethod === "COD"
                      ? "الدفع عند الاستلام"
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
                    order.status === "تم التوصيل"
                      ? "bg-green-500"
                      : order.status === "تم الطلب"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <p className="text-sm md:text-base">{order.status}</p>
              </div>
              <div className="flex items-center gap-2">
                {order.status === "تم التوصيل" ? (
                  userReviews[order._id]?.rating === undefined ||
                  userReviews[order._id]?.rating === 0 ? (
                    <button
                      onClick={() => openReviewModal(order)}
                      className="border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white rounded-md transition duration-300"
                    >
                      قيم الطلب
                    </button>
                  ) : (
                    <button
                      onClick={() => openViewRateModal(order._id)}
                      className="border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white rounded-md transition duration-300"
                    >
                      عرض تقييمك
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => navigate(`/track-order/${order._id}`)}
                    className="border border-gray-400 px-4 py-2 hover:bg-black hover:text-white text-sm font-medium rounded-md transition duration-300"
                  >
                    تتبع الطلب
                  </button>
                )}
                <button
                  onClick={() => openModal(order)}
                  className="border border-gray-400 px-4 py-2 text-sm font-medium rounded-md hover:bg-black 
                  hover:text-white transition-all duration-300"
                >
                  تفاصيل الطلب
                </button>
              </div>
            </div>
          </div>
        ))}

        {deliveredOrders.map((order, index) => (
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
                      رقم الطلب:{" "}
                      <span className="text-gray-500 font-medium text-base">
                        {" "}
                        {order._id.slice(-5)}{" "}
                      </span>
                    </div>
                    سعر الطلب:{" "}
                    <span className="text-gray-500 font-medium text-base">
                      {" "}
                      {order.amount}{" "}
                      <span className="currency">{currency}</span>{" "}
                    </span>
                  </div>
                </div>
                <p className="text-black font-semibold text-lg">
                  {" "}
                  التاريخ:{" "}
                  <span className="text-gray-500 font-medium text-base">
                    {" "}
                    {new Date(order.date).toDateString()}{" "}
                  </span>
                </p>
                <p className="text-black font-semibold text-lg">
                  {" "}
                  طريقة الدفع:{" "}
                  <span className="text-gray-500 font-medium text-base">
                    {" "}
                    {order.paymentMethod === "COD"
                      ? "الدفع عند الاستلام"
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
                    order.status === "تم التوصيل"
                      ? "bg-green-500"
                      : order.status === "تم الطلب"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <p className="text-sm md:text-base">{order.status}</p>
              </div>
              <div className="flex items-center gap-2">
                {order.status === "تم التوصيل" ? (
                  userReviews[order._id]?.rating === undefined ||
                  userReviews[order._id]?.rating === 0 ? (
                    <button
                      onClick={() => openReviewModal(order)}
                      className="border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white rounded-md transition duration-300"
                    >
                      قيم الطلب
                    </button>
                  ) : (
                    <button
                      onClick={() => openViewRateModal(order._id)}
                      className="border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white rounded-md transition duration-300"
                    >
                      عرض تقييمك
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => navigate(`/track-order/${order._id}`)}
                    className="border border-gray-400 px-4 py-2 hover:bg-black hover:text-white text-sm font-medium rounded-md transition duration-300"
                  >
                    تتبع الطلب
                  </button>
                )}
                <button
                  onClick={() => openModal(order)}
                  className="border border-gray-400 px-4 py-2 text-sm font-medium rounded-md hover:bg-black 
                  hover:text-white transition-all duration-300"
                >
                  تفاصيل الطلب
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
                تفاصيل الطلب
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
                معلومات العميل
              </h5>
              <p>
                <strong>الاسم:</strong> {selectedOrder.address.firstName}{" "}
                {selectedOrder.address.lastName}
              </p>
              <p>
                <strong>البريد الإلكتروني:</strong>{" "}
                {selectedOrder.address.email}
              </p>
              <p>
                <strong>الهاتف:</strong> {selectedOrder.address.phone}
              </p>
              <p>
                <strong>العنوان:</strong> {selectedOrder.address.street},{" "}
                {selectedOrder.address.city}
              </p>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <h5 className="font-semibold text-gray-700 mb-[8px]">
                ملخص الطلب
              </h5>
              <p>
                <strong>تاريخ الطلب:</strong>{" "}
                {new Date(selectedOrder.date).toDateString()}
              </p>
              <p>
                <strong>رسوم التوصيل:</strong>{" "}
                {selectedOrder.delivery_fee.toFixed(2)}
                <span className="currency">{currency}</span>
              </p>
              <p>
                <strong>الخصم:</strong> {selectedOrder.discount.toFixed(2)}
                <span className="currency">{currency}</span>
              </p>
              <p>
                <strong>المبلغ الإجمالي:</strong>{" "}
                {selectedOrder.amount.toFixed(2)}
                <span className="currency">{currency}</span>
              </p>
            </div>

            {/* Items Table */}
            <div className="mb-[24px]">
              <h5 className="font-semibold text-gray-700 mb-[8px]">المنتجات</h5>
              <table className="min-w-full border border-gray-300 mt-[8px] rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    {["اسم المنتج", "الحجم", "الكمية", "السعر"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-[12px] py-[10px] border text-right"
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
                      <Link to={`/product/${item._id}`}>
                        <td className="px-[12px] py-[10px] border line-clamp overflow-hidden max-w-[150px]">
                          {item.name}
                        </td>
                      </Link>
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
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[1100]">
          <div className="bg-white p-[24px] rounded-lg w-full max-w-md shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-[16px]">
              اكتب تقييمك
            </h4>
            <label className="block mb-2">
              <span className="text-gray-700">التقييم</span>
              <input
                type="number"
                value={review.rating}
                onChange={(e) =>
                  setReview({ ...review, rating: e.target.value })
                }
                min="1"
                max="5"
                className="block w-full mt-1 border-gray-400 border rounded-md shadow-sm focus:border-gray-500 p-2"
                placeholder="التقييم (1-5)"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">التعليق</span>
              <textarea
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                rows="4"
                className="block w-full mt-1 border-gray-400 border rounded-md shadow-sm focus:border-gray-500 p-2"
                placeholder="اكتب تعليقك"
              ></textarea>
            </label>
            <div className="flex justify-end mt-[16px]">
              <button
                type="submit"
                onClick={handleReviewSubmit}
                className="bg-white text-black border px-[12px] py-[8px] rounded-lg mr-[8px] 
                border-black hover:bg-black hover:text-white transition duration=200"
              >
                إرسال التقييم
              </button>
              <button
                onClick={closeReviewModal}
                className="bg-black text-white px-[12px] py-[8px] rounded-lg hover:opacity-70 transition duration=200"
              >
                إلغاء
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
              تقييمك
            </h4>
            <p>
              <strong>التقييم:</strong> {userReviews[selectedOrder].rating}
            </p>
            <p>
              <strong>التعليق:</strong> {userReviews[selectedOrder].comment}
            </p>

            {/* Close Button */}
            <div className="flex justify-end mt-[16px]">
              <button
                onClick={closeViewRateModal}
                className="bg-black text-white px-[12px] py-[8px] rounded-lg hover:opacity-70 transition duration=200"
              >
                {" "}
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
