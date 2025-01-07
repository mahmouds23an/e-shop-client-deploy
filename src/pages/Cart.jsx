import { useContext, useMemo, useCallback, Suspense, lazy } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
// import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const CartTotal = lazy(() => import("../components/CartTotal"));

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  // Memoize cart data to prevent recalculation unless cartItems or products change
  const cartData = useMemo(() => {
    if (
      products.length === 0 ||
      !cartItems ||
      Object.keys(cartItems).length === 0
    ) {
      return [];
    }
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const color = cartItems[itemId][size].color || "White";
          tempData.push({
            _id: itemId,
            size: size,
            color: color,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    return tempData;
  }, [cartItems, products]);

  const successDeleteToast = () => {
    toast.success("Item deleted");
  };

  // Memoized delete confirmation handler
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
    <div className="container mx-auto px-4 sm:px-8">
      {/* Header */}
      <header className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        <Title text1="Your" text2="Cart" />
      </header>

      {/* Empty Cart State */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center mt-10 text-center">
          <img
            src={assets.empty_cart_icon}
            alt="Empty Cart"
            className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
          />
          <p className="text-sm sm:text-lg text-gray-600">Your cart is empty</p>
          <div className="mt-4 flex gap-2">
            <Link
              to="/"
              className="bg-white border border-gray-400 text-black hover:bg-black hover:text-white px-3 py-2 rounded-md transition duration-300 text-sm sm:text-base"
            >
              Home
            </Link>
            <Link
              to="/collection"
              className="bg-white border border-gray-400 text-black hover:bg-black hover:text-white px-3 py-2 rounded-md transition duration-300 text-sm sm:text-base"
            >
              Collection
            </Link>
          </div>
        </div>
      ) : (
        // Cart Items List
        <div className="mt-6 space-y-4">
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            const displayPrice = productData?.discountStatus
              ? productData?.discountedPrice
              : productData?.price;

            return (
              <div
                key={index}
                className="flex flex-row sm:flex-row items-start sm:items-center justify-between border-b border-gray-400 pb-4"
              >
                {/* Product Details */}
                <div className="flex items-center space-x-4 w-full sm:w-2/3">
                  <img
                    src={productData?.image[0]}
                    alt={productData?.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-ellipsis max-w-full overflow-hidden whitespace-nowrap">
                      {productData?.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {displayPrice}
                      <span className="currency">{currency}</span>
                    </p>
                    <p className="text-xs sm:text-sm font-medium mt-2">
                      Size:{" "}
                      <span className="px-2 bg-white text-black border border-gray-400 rounded-md">
                        {item?.size}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Quantity and Delete Section */}
                <div className="flex items-center space-x-4 md:mt-4 mt-8 sm:mt-0">
                  {/* Quantity Adjustment */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className={`bg-white text-black border border-gray-400 px-3 py-1 rounded-md transition duration-200 ease-in-out text-xs sm:text-sm ${
                        item.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      readOnly
                      className="border w-[50px] sm:w-[60px] text-center text-sm px-2 py-1 border-gray-400 rounded-md"
                    />

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      className="bg-white text-black border border-gray-400 px-3 py-1 rounded-md hover:bg-black hover:text-white transition duration-200 ease-in-out text-xs sm:text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Icon */}
                  <img
                    src={assets.bin_icon}
                    alt="Delete Item"
                    className="w-5 sm:w-6 cursor-pointer hover:scale-110 duration-200"
                    onClick={() => showDeleteConfirmation(item._id, item.size)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Summary */}
      {cartData.length > 0 && (
        <div className="mt-8">
          <div className="rounded-lg shadow-md p-4 w-full sm:w-[400px] mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <CartTotal
                applyPromoCode={() => {}}
                discount={0}
                showPromoInput={false}
                onSubtotalChange={() => {}}
              />
            </Suspense>
            <div className="text-center mt-4">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-white border border-gray-400 text-black text-sm sm:text-base px-6 py-2 hover:bg-black hover:text-white transition duration-300 ease-in-out rounded-md w-full"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
