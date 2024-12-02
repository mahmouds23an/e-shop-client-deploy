/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import UnAuthorized from "../components/UnAuthorized";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Upload,
  X,
  Star,
  Package,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Cropper from "react-easy-crop";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-blue-600"></div>
  </div>
);

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [updatedFirstName, setUpdatedFirstName] = useState(
    currentUser?.firstName || ""
  );
  const [updatedLastName, setUpdatedLastName] = useState(
    currentUser?.lastName || ""
  );
  const [updatedEmail, setUpdatedEmail] = useState(currentUser?.email || "");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(currentUser?.image || "");
  const [showRemoveButton, setShowRemoveButton] = useState(
    currentUser?.profilePicture &&
    currentUser.profilePicture !== "https://w7.pngwing.com/pngs/463/441/png-transparent-avatar-human-people-profile-user-web-user-interface-icon.png"
  );

  // Cropper state
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [tempImageUrl, setTempImageUrl] = useState(null);

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

  const handlePageChange = (page) => setCurrentPage(page);
  const handleReviewPageChange = (page) => setCurrentReviewPage(page);

  const handleEditProfile = () => {
    setUpdatedFirstName(currentUser?.firstName || "");
    setUpdatedLastName(currentUser?.lastName || "");
    setUpdatedEmail(currentUser?.email || "");
    setPreviewImage(currentUser?.image || "");
    setIsEditModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempImageUrl(URL.createObjectURL(file));
      setIsCropperOpen(true);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedBlob = await getCroppedImg(tempImageUrl, croppedAreaPixels);
      const croppedUrl = URL.createObjectURL(croppedBlob);
      setPreviewImage(croppedUrl);
      setProfilePicture(
        new File([croppedBlob], "profile.jpg", { type: "image/jpeg" })
      );
      setIsCropperOpen(false);
      URL.revokeObjectURL(tempImageUrl);
    } catch (error) {
      toast.error("Error cropping image");
      console.error(error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", updatedFirstName);
      formData.append("lastName", updatedLastName);
      formData.append("email", updatedEmail);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }
      const response = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        const updatedImage = response.data.updatedUser?.image || currentUser.image;
        setCurrentUser((prevUser) => ({
          ...prevUser,
          firstName: updatedFirstName,
          lastName: updatedLastName,
          email: updatedEmail,
          image: updatedImage,
          profilePicture: updatedImage
        }));
        setShowRemoveButton(
          updatedImage !== "https://w7.pngwing.com/pngs/463/441/png-transparent-avatar-human-people-profile-user-web-user-interface-icon.png"
        );
        setProfilePicture(null);
        setIsEditModalOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProfilePicture = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/remove-profile-picture`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Profile picture removed successfully!");
        const defaultImage =
          "https://w7.pngwing.com/pngs/463/441/png-transparent-avatar-human-people-profile-user-web-user-interface-icon.png";
        setCurrentUser((prevUser) => ({
          ...prevUser,
          image: defaultImage,
          profilePicture: defaultImage
        }));
        setPreviewImage(defaultImage);
        setShowRemoveButton(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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

  if (!token) return <UnAuthorized />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-400">
          <div className="relative h-20 bg-gradient-to-r from-gray-300 to-gray-500">
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
                <img
                  src={
                    currentUser?.profilePicture
                      ? currentUser.profilePicture
                      : previewImage || "https://via.placeholder.com/150"
                  }
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button
                  onClick={handleEditProfile}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Upload className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-6 px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentUser?.firstName} {currentUser?.lastName}
            </h1>
            <p className="text-gray-600 mt-1">{currentUser?.email}</p>
            <button
              onClick={handleEditProfile}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
            {showRemoveButton && (
              <button
                onClick={handleRemoveProfilePicture}
                className="mt-4 ml-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Removing...</span>
                  </div>
                ) : (
                  "Remove Profile Picture"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-400">
          <div className="flex items-center mb-6">
            <Package className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
          </div>
          <div className="space-y-4">
            {currentOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-300"
              >
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-900">
                    Order #{order._id}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span className="font-medium">
                        {order?.status || "Pending"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Total:{" "}
                      <span className="font-medium">
                        {order.amount.toFixed(2)} {currency}
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/orders/${order._id}`}
                  className="mt-4 sm:mt-0 group flex items-center px-6 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition duration-300"
                >
                  <span className="text-gray-700 group-hover:text-blue-600">
                    View Details
                  </span>
                  <ChevronRight className="ml-2 w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </Link>
              </div>
            ))}
          </div>

          {/* Orders Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg transition duration-300 ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-400">
          <div className="flex items-center mb-6">
            <Star className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Reviews ({currentUserReviews.length})
            </h2>
          </div>
          <div className="space-y-4">
            {currentReviews.map((review) => (
              <div
                key={review._id}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {review.productId?.name || "Unknown Product"}
                  </h3>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Reviews Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalReviewPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handleReviewPageChange(index + 1)}
                className={`px-4 py-2 rounded-lg transition duration-300 ${
                  currentReviewPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1100] px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setIsCropperOpen(false);
                  URL.revokeObjectURL(tempImageUrl);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {isCropperOpen ? (
              <div className="space-y-4">
                <div className="relative h-[300px] w-full">
                  <Cropper
                    image={tempImageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    cropShape="round"
                    showGrid={false}
                  />
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ZoomOut className="w-6 h-6" />
                  </button>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-1/2"
                  />
                  <button
                    onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ZoomIn className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsCropperOpen(false);
                      URL.revokeObjectURL(tempImageUrl);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCropConfirm}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Crop & Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative group mb-8">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <img
                        src={previewImage || "https://via.placeholder.com/150"}
                        alt="Profile Preview"
                        className="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-lg transition-all duration-300"
                      />
                      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Upload className="w-8 h-8 text-white" />
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <span className="text-sm text-gray-500 mt-2">
                      Click to upload new image
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={updatedFirstName}
                      onChange={(e) => setUpdatedFirstName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={updatedLastName}
                      onChange={(e) => setUpdatedLastName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8 space-x-3">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner />
                        <span className="ml-2">Saving...</span>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;