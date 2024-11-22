/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import UnAuthorized from "../components/UnAuthorized";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const {
    currentUser,
    setCurrentUser,
    token,
    backendUrl,
    currency,
    currentUserReviews,
  } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(currentUser?.name || "");
  const [updatedEmail, setUpdatedEmail] = useState(currentUser?.email || "");
  const [profilePicture, setProfilePicture] = useState(
    currentUser?.image || ""
  );
  const [previewImage, setPreviewImage] = useState(null);

  const ordersPerPage = 3;
  const reviewsPerPage = 3;

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReviewPageChange = (page) => {
    setCurrentReviewPage(page);
  };

  const handleEditProfile = () => {
    setUpdatedName(currentUser?.name || "");
    setUpdatedEmail(currentUser?.email || "");
    setPreviewImage(currentUser?.image || "");
    setIsEditModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("name", updatedName);
      formData.append("email", updatedEmail);
      if (profilePicture && typeof profilePicture !== "string") {
        formData.append("image", profilePicture);
      }
      const response = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setCurrentUser(response.data.updatedUser);
        setIsEditModalOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfLastReview = currentReviewPage * reviewsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentReviews = currentUserReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(orderData.length / ordersPerPage);
  const totalReviewPages = Math.ceil(
    currentUserReviews.length / reviewsPerPage
  );

  if (!token) {
    return <UnAuthorized />;
  }

  console.log(currentUser);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-400">
        <div className="flex items-center gap-6">
          <img
            src={currentUser?.image || ""}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">
              {currentUser?.name || "User"}
            </h2>
            <p className="text-gray-500">
              {currentUser?.email || "user@example.com"}
            </p>
            <button
              onClick={handleEditProfile}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Profile Picture
              </label>
              <input type="file" name="image" onChange={handleImageUpload} />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-20 h-20 rounded-full mt-4 object-cover"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Tracking */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-400">
        <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-400 
              rounded-md hover:bg-gray-50 transition"
            >
              <div className="mb-4 sm:mb-0">
                <p className="text-lg font-medium">Order #{order._id}</p>
                <p className="text-sm text-gray-500">
                  Status: {order?.status || "Pending"}
                </p>
                <p className="text-sm text-gray-500">
                  Total Amount: {order.amount.toFixed(2)}
                  <span className="currency">{currency}</span>
                </p>
              </div>
              <Link
                to={`/orders/${order._id}`}
                className="text-blue-500 px-4 py-2 rounded-md border border-gray-400 
                sm:ml-4 sm:self-start sm:w-auto w-full text-center hover:bg-black hover:text-white transition duration-300"
              >
                View Details &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-400"
              } hover:bg-black hover:text-white transition duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-400">
        <h3 className="text-xl font-semibold mb-4">
          Your Reviews ({currentUserReviews.length})
        </h3>
        <div className="space-y-4">
          {currentReviews.map((review) => (
            <div
              key={review._id}
              className="flex justify-between items-center p-4 border border-gray-400 rounded-md w-full"
            >
              <div className="w-full">
                <p className="text-lg font-medium truncate">
                  {review.productId?.name || "Unknown Product"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Rating: {review.rating} ★
                </p>
                <p className="text-sm mt-1 break-words">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalReviewPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleReviewPageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentReviewPage === index + 1
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-400"
              } hover:bg-black hover:text-white transition duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
