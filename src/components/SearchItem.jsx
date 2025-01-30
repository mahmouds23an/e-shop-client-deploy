/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const SearchItem = ({ item }) => {
  const {
    _id,
    image,
    name,
    price,
    description,
    discountStatus,
    discountedPrice,
  } = item;
  const { currency, products } = useContext(ShopContext);
  console.log(products);

  return (
    <Link to={`/product/${_id}`}>
      <div className="group flex items-center gap-4 p-4 hover:bg-gray-50 transition-all duration-300 border-b last:border-b-0">
        <div className="relative w-[100px] h-[100px] overflow-hidden rounded-lg">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          {discountStatus && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
              SALE
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
              {name}
            </h2>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-2">
            {description}
          </p>
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold text-blue-600">
              {discountStatus ? discountedPrice : price} {currency}
            </p>
            {discountStatus && (
              <p className="text-sm text-gray-500 line-through">
                {price} {currency}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
