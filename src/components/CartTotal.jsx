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
    <div className="w-full">
      <div className="text-2xl">
        {/* Promo Code Input (conditionally rendered) */}
        {showPromoInput && (
          <div className="px-2 py-4 border border-gray-400 rounded-md shadow-md bg-white mb-5">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Have a Promo Code?
            </h3>
            <div className="flex">
              <input
                type="text"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value)}
                placeholder="Enter promo code"
                className="border border-gray-400 rounded-md-md w-full p-2 transition duration-200 text-lg"
              />
              <button
                onClick={handleApplyPromoCode}
                className="bg-black text-white rounded-r-md py-1 px-3 hover:opacity-70 transition duration-200"
              >
                Apply
              </button>
            </div>
            {promoCodeInput && (
              <p className="text-sm text-gray-600 mt-2">
                Enter your promo code above and click &quot;Apply&quot; to
                receive discounts!
              </p>
            )}
          </div>
        )}
        <Title text1={"Cart"} text2={"Total"} />
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {getCartAmount()}.00
              <span className="currency">{currency}</span>
            </p>
          </div>
          <hr className="border-gray-400 border" />
          <div className="flex justify-between">
            <p>Shipping Fees</p>
            <p>
              {Number(delivery_fee) || 0}.00
              <span className="currency">{currency}</span>
            </p>
          </div>
          <hr className="border-gray-400 border" />
          {discount > 0 && (
            <div className="flex justify-between text-green-500">
              <p>Discount Applied</p>
              <p>
                -{discount}.00
                <span className="currency">{currency}</span>
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <b>Total</b>
            <b>
              {Number(getCartAmount()) +
                (Number(delivery_fee) || 0) -
                (Number(discount) || 0)}
              .00
              <span className="currency">{currency}</span>
            </b>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default CartTotal;
