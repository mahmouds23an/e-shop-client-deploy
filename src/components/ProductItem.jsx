/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

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

  const calculateDiscountPercentage = (originalPrice, salePrice) => {
    if (!salePrice || originalPrice <= 0) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  const discountPercentage = discountedPrice
    ? calculateDiscountPercentage(price, discountedPrice)
    : null;

  return (
    <Link
      className="group relative block overflow-hidden rounded-lg border border-gray-200 
      bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      to={`/product/${id}`}
    >
      <div className="relative p-4">
        {showDiscountBadge && discountPercentage > 0 && (
          <div className="absolute top-[0.5px] left-[0.5px] z-10">
            <div className="flex items-center justify-center rounded-tl-lg rounded-br-lg bg-red-500 px-2 py-1">
              <span className="text-sm font-bold text-white">
                -{discountPercentage}%
              </span>
            </div>
          </div>
        )}

        {/* <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-rose-500">
          <Heart className="h-4 w-4" />
        </button> */}

        <div className="relative h-48 overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            src={image[0]}
            alt={name}
          />
        </div>

        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-700 group-hover:text-black line-clamp-1">
            {name}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-black">
                {discountedPrice || price} <span className="currency">{currency}</span>
              </p>
              {/* {discountedPrice && (
                <p className="mt-0.5 text-sm text-gray-500 line-through">
                  {price} {currency}
                </p>
              )} */}
            </div>

            {showBuyButton && (
              <button
                className="group-hover:bg-black group-hover:text-white 
              rounded-full  p-2 text-gray-600 transition"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
