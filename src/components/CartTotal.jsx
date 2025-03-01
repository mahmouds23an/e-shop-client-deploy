/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({
  applyPromoCode,
  discount,
  showPromoInput = false,
  onSubtotalChange,
}) => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [promoCodeInput, setPromoCodeInput] = useState("");

  const subtotal = getCartAmount();

  // Use useEffect to update subtotal after render
  useEffect(() => {
    onSubtotalChange(subtotal);
  }, [subtotal, onSubtotalChange]);

  const handleApplyPromoCode = (e) => {
    e.preventDefault();
    applyPromoCode(promoCodeInput);
  };

  return (
    <div className="w-full" dir="rtl">
      {" "}
      {/* Added RTL direction */}
      <div className="text-2xl">
        {/* Promo Code Input (conditionally rendered) */}
        {showPromoInput && (
          <div className="px-2 py-4 border border-gray-400 rounded-md shadow-md bg-white mb-5">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              هل لديك كود خصم؟
            </h3>{" "}
            {/* Translated promo code heading */}
            <div className="flex">
              <input
                type="text"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value)}
                placeholder="أدخل كود الخصم"
                className="border border-gray-400 rounded-md-md w-full p-2 transition duration-200 text-lg"
              />
              <button
                onClick={handleApplyPromoCode}
                className="bg-black text-white rounded-l-md py-1 px-3 hover:opacity-70 transition duration-200"
              >
                تطبيق
              </button>{" "}
              {/* Translated apply button */}
            </div>
            {promoCodeInput && (
              <p className="text-sm text-gray-600 mt-2">
                أدخل كود الخصم أعلاه واضغط &quot;تطبيق&quot; للحصول على
                الخصومات!
              </p>
            )}
          </div>
        )}
        <Title text1={"تفاصيل"} text2={"الطلب"} /> {/* Translated title */}
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p> التكلفة</p> {/* Translated subtotal label */}
            <p>
              {getCartAmount()}.00
              <span className="currency mr-1">{currency}</span>
            </p>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-500">
              <p>الخصم المطبق</p> {/* Translated discount applied label */}
              <p>
                -{discount}.00
                <span className="currency mr-1">{currency}</span>
              </p>
            </div>
          )}
          <hr className="border-gray-400 border" />
          <div className="flex justify-between">
            <p>رسوم الشحن</p> {/* Translated shipping fees label */}
            <p>
              {Number(delivery_fee) || 0}.00
              <span className="currency mr-1">{currency}</span>
            </p>
          </div>
          <hr className="border-gray-400 border" />
          <div className="flex justify-between">
            <b>الإجمالي</b> {/* Translated total label */}
            <b>
              {Number(getCartAmount()) +
                (Number(delivery_fee) || 0) -
                (Number(discount) || 0)}
              .00
              <span className="currency mr-1">{currency}</span>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
