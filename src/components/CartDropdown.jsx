/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

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

  const handleViewFullCart = (e) => {
    e.stopPropagation();
    navigate("/cart");
    closeCartDropdown();
  };

  const updateQuantityHandler = (e, id, size, newQuantity) => {
    e.stopPropagation();
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

  const successDeleteToast = () => {
    toast.success("Item deleted", { autoClose: 1500 });
  };

  const showDeleteConfirmation = useCallback(
    (id, size) => {
      toast(
        ({ closeToast }) => (
          <div>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => {
                  updateQuantity(id, size, 0);
                  closeToast();
                  successDeleteToast();
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => closeToast()}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ),
        { autoClose: false, closeOnClick: false }
      );
    },
    [updateQuantity]
  );

  return (
    <AnimatePresence>
      {show && (
        <div
          className="fixed inset-0 z-40"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDropdown}
            className="fixed inset-0 bg-black bg-opacity-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="cart-container fixed right-0 top-0 h-full w-[450px] bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                closeCartDropdown();
              }}
              aria-label="Close cart"
              className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <FaTimes className="text-lg" />
            </motion.button>

            <div className="p-3 overflow-y-auto h-full">
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
                      className="flex items-center gap-4 border-b last:border-none hover:bg-gray-50 transition-colors rounded-lg py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={item.product?.image[0]}
                        alt={item.product?.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-black font-medium text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap">
                          {item?.product?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Size:{" "}
                          <span className="font-semibold">{item.size}</span>
                        </p>
                        <p className="text-sm font-semibold mt-2 text-black">
                          {item.product?.price.toFixed(2)}{" "}
                          <span className="currency">{currency}</span>
                        </p>
                        <p
                          onClick={() =>
                            showDeleteConfirmation(item._id, item.size)
                          }
                          className="text-sm font-semibold text-red-500 hover:opacity-70 duration-300 cursor-pointer w-[20px]"
                        >
                          Remove
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            updateQuantityHandler(
                              e,
                              item._id,
                              item.size,
                              item.quantity - 1
                            );
                          }}
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
                          onClick={(e) => {
                            updateQuantityHandler(
                              e,
                              item._id,
                              item.size,
                              item.quantity + 1
                            );
                          }}
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
                onClick={(e) => e.stopPropagation()}
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
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
