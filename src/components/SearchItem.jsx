/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext } from "react";
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
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${_id}`}>
      <div className="flex items-center gap-4 p-4 hover:bg-gray-50 border-b last:border-b-0 transition-all">
        <div className="w-[80px] h-[80px] overflow-hidden bg-gray-100 border border-gray-300 rounded-md">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <p className="text-md font-bold text-gray-900 mt-1">
            {discountStatus ? discountedPrice : price}{" "}
            <span className="currency">{currency}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
