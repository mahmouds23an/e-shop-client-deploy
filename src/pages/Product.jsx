/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext, useEffect, useState } from "react";
import RelatedProducts from "../components/RelatedProducts";
import ProductNotFound from "../components/ProductNotFound";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    token,
    backendUrl,
    currentUser,
    getCartCount,
  } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [userReview, setUserReview] = useState(null);
  const displayPrice = productData?.discountStatus
    ? productData?.discountedPrice
    : productData?.price;

  const discountRate = productData?.discountStatus
    ? ((productData?.price - productData?.discountedPrice) /
        productData?.price) *
      100
    : 0;

  const showDeleteConfirmation = (reviewId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this review?</p>
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => {
                handleDeleteReview(reviewId);
                closeToast();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => closeToast()}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    } else {
      setProductData(null);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/review/get/${productId}`
      );
      const fetchedReviews = response.data.reviews;

      const userReview = fetchedReviews.find(
        (review) => review.userId._id === currentUser?._id
      );
      setUserReview(userReview);

      const sortedReviews = userReview
        ? [
            userReview,
            ...fetchedReviews.filter((review) => review._id !== userReview._id),
          ]
        : fetchedReviews;

      setReviews(sortedReviews);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first to submit a review");
      return;
    }
    try {
      await axios.post(
        `${backendUrl}/api/review/add`,
        { productId, rating, comment },
        {
          headers: { token },
        }
      );
      fetchReviews();
      setRating(1);
      setComment("");
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/review/delete/${reviewId}`,
        {},
        {
          headers: { token },
        }
      );
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchReviews();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, products]);

  if (productData === null) {
    return <ProductNotFound />;
  }

  const calculateAverageRating = (reviews) => {
    if (!reviews.length) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-6 md:px-10">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 w-full sm:w-1/2">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className="w-[24%] h-[100px] border border-gray-300 object-contain sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img
                src={image}
                alt="product"
                className="w-full object-contain h-[400px] border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 w-full sm:w-1/2">
          <h1 className="product-name">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  index < calculateAverageRating(reviews)
                    ? "currentColor"
                    : "none"
                }
                stroke="currentColor"
                viewBox="0 0 24 24"
                className={`w-5 h-5 ${
                  index < calculateAverageRating(reviews)
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2l2.4 7.3h7.6l-6 4.3 2.3 7.4-6-4.3-6 4.3 2.3-7.4-6-4.3h7.6L12 2z"
                />
              </svg>
            ))}
            <p className="pl-2 text-gray-500">({reviews.length})</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {displayPrice}
            <span className="currency">{currency}</span>
            {displayPrice !== productData.price && (
              <>
                <span className="ml-5 text-gray-500 line-through text-lg">
                  {productData.price}
                </span>
                <span className=" ml-2 text-red-600 text-lg">
                  ({discountRate.toFixed(1)}% discount)
                </span>
              </>
            )}
          </p>
          <p className="product-description mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="text-lg font-semibold">Select Size</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-all 
                    duration-300 ease-in-out
          ${
            item === size
              ? "bg-black text-white scale-105"
              : "bg-white border border-gray-400 text-black"
          }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {token ? (
            <div className="flex flex-col gap-3 md:w-[300px]">
              <button
                onClick={() => addToCart(productData._id, size)}
                className="bg-white hover:bg-black hover:text-white text-black border border-gray-400 py-3 px-8 w-full 
                md:w-[300px] rounded-md active:bg-gray-700 transition duration-300"
              >
                Add to Cart
              </button>
              {getCartCount() > 0 && (
                <Link
                  className="flex justify-end items-center text-gray-500 hover:text-black transition duration-300 "
                  to={"/cart"}
                >
                  View full cart <span className="text-xl ml-1">&rarr;</span>
                </Link>
              )}
            </div>
          ) : (
            <button
              onClick={() => alert("Please login first to add to cart")}
              className="bg-black hover:opacity-70 text-white py-3 px-8 rounded-md active:bg-gray-700"
            >
              Add to Cart
            </button>
          )}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 flex flex-col lg:flex-row gap-8">
        {/* Review List Section */}
        <div className="flex-1 w-full">
          <h2 className="font-semibold text-xl flex items-center gap-2 mb-4">
            Reviews ({reviews.length})
            <span className="ml-2 text-yellow-500">
              {calculateAverageRating(reviews)} ★
            </span>
          </h2>

          <div className="mt-3 border border-gray-100 rounded-lg">
            {Array.isArray(reviews) && reviews.length > 0 ? (
              reviews.map((review) => (
                console.log(review),
                <div
                  key={review._id}
                  className="bg-white flex justify-between items-center p-3 rounded-lg shadow-md border mb-4 border-gray-300"
                >
                  <div className="flex items-center gap-4">
                    {/* User Profile Picture */}
                    <div>
                      {review.userId?.profilePicture ? (
                        <img
                          src={review.userId?.profilePicture}
                          alt={`${review.userId?.firstName}'s profile`}
                          className="md:w-16 w-10 md:h-16 h-10 rounded-full object-fill"
                        />
                      ) : (
                        <div className="md:w-16 w-10 md:h-16 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                          {review.userId?.firstName}
                        </div>
                      )}
                    </div>

                    <div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-semibold">
                            {currentUser?._id === review.userId?._id
                              ? "Your review"
                              : review.userId.firstName}
                          </p>
                          <p className="text-gray-500 text-xs">
                            ({new Date(review.createdAt).toDateString()})
                          </p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              fill={
                                index < review.rating ? "currentColor" : "none"
                              }
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              className={`w-5 h-5 ${
                                index < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-500"
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2l2.4 7.3h7.6l-6 4.3 2.3 7.4-6-4.3-6 4.3 2.3-7.4-6-4.3h7.6L12 2z"
                              />
                            </svg>
                          ))}
                        </div>

                        <div>
                          {/* Review Content */}
                          <p className="text-sm mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* Edit and Delete buttons for the current user's review */}
                    {currentUser?._id === review.userId?._id && (
                      <div className="flex gap-4 mt-4">
                        <FaEdit className="text-gray-500 hover:text-black duration-300 cursor-pointer hover:scale-x-125" />
                        <MdDelete
                          onClick={() => showDeleteConfirmation(review._id)}
                          className="text-gray-500 hover:text-black duration-300 cursor-pointer mr-5 hover:scale-x-125"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-4">
                No reviews available for this product.
              </p>
            )}
          </div>
        </div>

        {/* Review Form Section */}
        {!userReview && token && (
          <div className="w-full lg:w-[380px]">
            <h3 className="font-semibold text-xl mb-4">Write a Review</h3>
            <form
              onSubmit={handleSubmitReview}
              className="flex flex-col gap-4 p-6 border border-gray-200 rounded-lg bg-white shadow-md"
            >
              <div>
                <label htmlFor="rating" className="block text-sm font-medium">
                  Rating: <span className="text-gray-500">min 1 - max 5</span>
                </label>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className={`w-6 h-6 cursor-pointer ${
                        index < rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                      onClick={() => setRating(index + 1)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2l2.4 7.3h7.6l-6 4.3 2.3 7.4-6-4.3-6 4.3 2.3-7.4-6-4.3h7.6L12 2z"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium">
                  Write your review:
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe your experience with this product."
                  required
                  className="border border-gray-400 rounded p-4 mt-2 w-full h-32 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-white border border-gray-400 text-black py-3 px-6 rounded-md hover:bg-black hover:text-white duration-300 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
