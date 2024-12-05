/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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

  const updateQuantityHandler = (id, size, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, size, newQuantity);
    }
  };

  const dropdownVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDropdown}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Cart Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="fixed top-0 right-0 z-50 bg-white shadow-xl"
            style={{
              width: "90vw", // Adjust width for smaller screens
              maxWidth: "400px", // Maximum width for larger screens
              height: "85vh", // Adjust height for smaller screens
              maxHeight: "100%", // Ensure it doesn't exceed the screen
            }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeCartDropdown}
              aria-label="Close cart"
              className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <FaTimes className="text-lg" />
            </motion.button>

            <div className="p-6 overflow-y-auto h-full">
              <motion.h3
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-xl font-semibold mb-6 text-black"
              >
                Your Cart
              </motion.h3>

              {/* Empty Cart */}
              {cartData.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 mt-8"
                >
                  Your cart is empty.
                </motion.p>
              ) : (
                <motion.div layout>
                  {cartData.map((item, index) => (
                    <motion.div
                      key={item._id + item.size}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 py-4 border-b last:border-none hover:bg-gray-50 transition-colors rounded-lg p-3"
                    >
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={item.product?.image[0]}
                        alt={item.product?.name}
                        className="w-20 h-20 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap">
                          {item.product?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Size:{" "}
                          <span className="font-semibold">{item.size}</span>
                        </p>
                        <p className="text-sm font-semibold mt-2 text-black">
                          {item.product?.price.toFixed(2)}{" "}
                          <span className="currency">{currency}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantityHandler(
                              item._id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease ${item.product?.name} quantity`}
                          className={`px-3 py-1 rounded-full text-gray-600 hover:bg-gray-300 transition-colors ${
                            item.quantity <= 1 ? "bg-gray-100" : "bg-gray-200"
                          }`}
                        >
                          -
                        </motion.button>
                        <span className="text-black font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantityHandler(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          aria-label={`Increase ${item.product?.name} quantity`}
                          className="px-3 py-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                          +
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer with Total Price */}
            {cartData.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-6 border-t bg-gray-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold text-black">Total:</p>
                  <p className="text-lg font-bold text-black">
                    {totalPrice.toFixed(2)}{" "}
                    <span className="currency">{currency}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewFullCart}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  View Full Cart
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
