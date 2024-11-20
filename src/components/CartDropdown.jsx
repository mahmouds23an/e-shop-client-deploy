/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";

const CartDropdown = ({ show }) => {
  const { cartItems, products, updateQuantity, currency, closeCartDropdown } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/cart") {
      closeCartDropdown();
    }
  }, [location, closeCartDropdown]);

  // Check if cartItems is a valid object (not null or undefined)
  const cartData = cartItems
    ? Object.entries(cartItems).flatMap(([id, sizes]) =>
        Object.entries(sizes)
          .filter(([_, quantity]) => quantity > 0)
          .map(([size, quantity]) => ({
            _id: id,
            size,
            quantity,
            product: products.find((product) => product._id === id),
          }))
      )
    : [];

  if (cartData.length === 0) return null;

  const handleViewFullCart = () => {
    navigate("/cart");
  };

  return (
    <div
      className={`absolute right-0 z-50 border border-black -mt-2 md:-mr-1 -mr-3 w-80 bg-white shadow-lg rounded-lg 
        p-4 transition-transform duration-300 transform ${
        show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      {cartData.map((item, index) => (
        <div key={index} className="flex items-center gap-4 py-2 border-b">
          <img
            src={item.product?.image[0]}
            alt={item.product?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <p
              className="text-sm font-medium text-ellipsis
              max-w-[150px]
              overflow-hidden whitespace-nowrap"
            >
              {item.product?.name}
            </p>
            <p className="text-xs text-gray-500">
              Size: <span className="font-semibold">{item?.size}</span>
            </p>
            <p className="text-sm font-semibold mt-1">
              {item.product?.price} <span className="currency">{currency}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateQuantity(item._id, item.size, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="text-blue-600"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item._id, item.size, item.quantity + 1)
              }
              className="text-blue-600"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 text-center">
        <button
          onClick={handleViewFullCart}
          className="text-blue-500 hover:underline"
        >
          View Full Cart
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
