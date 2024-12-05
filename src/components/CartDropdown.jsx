/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const CartDropdown = ({ show }) => {
  const { cartItems, products, updateQuantity, currency, closeCartDropdown } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const cartData = useMemo(() => {
    return cartItems
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
  }, [cartItems, products]);

  const totalPrice = useMemo(() => {
    return cartData.reduce(
      (acc, item) => acc + item.quantity * (item.product?.price || 0),
      0
    );
  }, [cartData]);

  if (cartData.length === 0 && !show) return null;

  const handleViewFullCart = () => {
    navigate("/cart");
    closeCartDropdown();
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-screen bg-white shadow-lg transform transition-all duration-500 ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{ width: "85vw", maxWidth: "400px", height: "80%" }}
    >
      {/* Close Button */}
      <button
        onClick={closeCartDropdown}
        aria-label="Close cart"
        className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300"
      >
        <FaTimes className="text-lg" />
      </button>

      <div className="p-6 overflow-y-auto h-full">
        <h3 className="text-lg font-semibold mb-4 text-black">Your Cart</h3>

        {/* Empty Cart */}
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartData.map((item) => (
            <div
              key={item._id + item.size}
              className="flex items-center gap-4 py-3 border-b last:border-none"
            >
              <img
                src={item.product?.image[0]}
                alt={item.product?.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap">
                  {item.product?.name}
                </p>
                <p className="text-xs text-gray-500">
                  Size: <span className="font-semibold">{item.size}</span>
                </p>
                <p className="text-sm font-semibold mt-1 text-black">
                  {item.product?.price.toFixed(2)}{" "}
                  <span className="currency">{currency}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  aria-label={`Decrease ${item.product?.name} quantity`}
                  className={`px-2 py-1 rounded text-gray-600 hover:bg-gray-300 ${
                    item.quantity <= 1 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                >
                  -
                </button>
                <span className="text-black">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity + 1)
                  }
                  aria-label={`Increase ${item.product?.name} quantity`}
                  className="px-2 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer with Total Price */}
      {cartData.length > 0 && (
        <div className="p-4 border-t bg-gray-100">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-black">Total:</p>
            <p className="text-lg font-bold text-black">
              {totalPrice.toFixed(2)}{" "}
              <span className="currency">{currency}</span>
            </p>
          </div>
          <button
            onClick={handleViewFullCart}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            View Full Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
