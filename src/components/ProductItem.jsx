/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({
  id,
  image,
  name,
  price,
  discountedPrice,
  showDiscountBadge = true,
  showBuyButton = true,
}) => {
  const { currency } = useContext(ShopContext);

  // Function to calculate discount percentage
  const calculateDiscountPercentage = (originalPrice, salePrice) => {
    if (!salePrice || originalPrice <= 0) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  // Calculate discount percentage if discounted price exists
  const discountPercentage = discountedPrice
    ? calculateDiscountPercentage(price, discountedPrice)
    : null;

  return (
    <Link
      className="text-gray-700 cursor-pointer border border-gray-300 rounded-lg -mb-2 relative"
      to={`/product/${id}`}
    >
      <div className="w-full max-w-xs mx-auto bg-white shadow-md rounded-lg flex flex-col items-center p-4 transition-shadow duration-200 ease-in-out hover:shadow-xl">
        {/* Discount Badge */}
        {showDiscountBadge && discountPercentage > 0 && (
          <div className="absolute top-0 right-0 z-50 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-sm">
            -{discountPercentage}%
          </div>
        )}
        <div className="w-full h-48 overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            src={image[0]}
            alt={name}
          />
        </div>
        <div className="w-full mt-3">
          <p className="single-line text-sm font-semibold text-gray-800 pt-2 pb-1">
            {name}
          </p>
          <div className="flex flex-col md:flex-row justify-between md:items-center mt-2">
            <p className="text-lg font-bold text-gray-900">
              {discountedPrice ? discountedPrice : price}{" "}
              <span className="currency">{currency}</span>
            </p>
            {showBuyButton && (
              <button
                className="bg-white text-black border border-gray-400 px-2 py-1 rounded-md transition duration-300 
              ease-in-out hover:bg-black hover:text-white focus:outline-none"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
