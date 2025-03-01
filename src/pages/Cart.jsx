import { useContext, useMemo, useCallback, Suspense, lazy } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
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
          const color = cartItems[itemId][size].color || "أبيض";
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
    toast.success("تم حذف العنصر");
  };

  // Memoized delete confirmation handler
  const showDeleteConfirmation = useCallback(
    (id, size) => {
      toast(
        ({ closeToast }) => (
          <div>
            <p>هل أنت متأكد أنك تريد حذف هذا العنصر؟</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => {
                  updateQuantity(id, size, 0);
                  closeToast();
                  successDeleteToast();
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                نعم
              </button>
              <button
                onClick={() => closeToast()}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                إلغاء
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
    <div className="container mx-auto px-4 sm:px-8" dir="rtl">
      {" "}
      {/* Added RTL direction */}
      {/* Header */}
      <header className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        <Title text1="عربة" text2="التسوق" /> {/* Translated title */}
      </header>
      {/* Empty Cart State */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center mt-10 text-center">
          <img
            src={assets.empty_cart_icon}
            alt="عربة فارغة"
            className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
          />
          <p className="text-sm sm:text-lg text-gray-600">
            عربة التسوق الخاصة بك فارغة
          </p>{" "}
          {/* Translated empty cart message */}
          <div className="mt-4 flex gap-2">
            <Link
              to="/"
              className="bg-white border border-gray-400 text-black hover:bg-black hover:text-white px-3 py-2 rounded-md transition duration-300 text-sm sm:text-base"
            >
              الرئيسية
            </Link>{" "}
            {/* Translated home button */}
            <Link
              to="/collection"
              className="bg-white border border-gray-400 text-black hover:bg-black hover:text-white px-3 py-2 rounded-md transition duration-300 text-sm sm:text-base"
            >
              المجموعات
            </Link>{" "}
            {/* Translated collection button */}
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
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={productData?.image[0]}
                      alt={productData?.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item._id}`}>
                      <h3 className="text-sm sm:text-base font-semibold max-w-full overflow-hidden line-clamp">
                        {productData?.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {displayPrice}
                      <span className="currency mr-1">{currency}</span>
                    </p>
                    <p className="text-xs sm:text-sm font-medium mt-2">
                      المقاس: {/* Translated size label */}
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
                      className={`bg-white text-black border border-gray-400 px-3 
                        py-1 rounded-md transition duration-200 ease-in-out text-xs sm:text-sm ${
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
                      className="bg-white text-black border border-gray-400 px-3 py-1 rounded-md 
                      hover:bg-black hover:text-white transition duration-200 ease-in-out text-xs sm:text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Icon */}
                  <img
                    src={assets.bin_icon}
                    alt="حذف العنصر"
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
            <Suspense fallback={<div>جار التحميل...</div>}>
              {" "}
              {/* Translated loading text */}
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
                المتابعة إلى الدفع
              </button>{" "}
              {/* Translated checkout button */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
