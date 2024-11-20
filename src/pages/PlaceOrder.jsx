/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import CitySelect from "../../helpers/CitySelect.jsx";
import UnAuthorized from "../components/UnAuthorized.jsx";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [promoCodes, setPromoCodes] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    setDeliveryFee,
    products,
  } = useContext(ShopContext);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    return phoneRegex.test(phone);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "Egypt",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Invalid phone number.");
      return;
    }
    try {
      setLoading(true);
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        discount: discount ? discount : 0,
        delivery_fee: delivery_fee ? delivery_fee : 0,
        amount: getCartAmount() - discount + delivery_fee,
        note: orderNote,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: { token },
            }
          );
          if (response.data.success) {
            setCartItems({});
            toast.success(response.data.message);
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPromoCodes = async () => {
    try {
      if (promoCodes.length === 0) {
        const response = await axios.get(`${backendUrl}/api/promo/get`);
        setPromoCodes(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.all([
          axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } }),
          axios.get(`${backendUrl}/api/promo/get`),
        ]);

        const cartData = response[0].data;
        const promoCodesData = response[1].data;

        setCartItems(cartData.cartData);
        setPromoCodes(promoCodesData);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchInitialData();
  }, [token]);

  const applyPromoCode = (code) => {
    const promo = promoCodes.find(
      (p) => p.code === code && p.isActive && new Date(p.endDate) > new Date()
    );

    if (promo) {
      const discountAmount = (getCartAmount() * promo.discountPercentage) / 100;
      setDiscount(discountAmount);
      setAppliedPromoCode(code);
      toast.success(`Promo code ${code} applied!`);
    } else {
      toast.error("Invalid or expired promo code.");
      setDiscount(0);
      setAppliedPromoCode("");
    }
  };

  if (!token) {
    return <UnAuthorized />;
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            required
          />

          <input
            className="border border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>

        <input
          className="border border-gray-400 rounded-md py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          required
        />

        <input
          className="border border-gray-400 rounded-md py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street Address"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          required
        />

        <div className="flex gap-3">
          <CitySelect
            value={formData.city}
            onChange={onChangeHandler}
            setDeliveryFee={setDeliveryFee}
          />
          <input
            className="border border-gray-400 rounded-md py-1.5 px-3.5 w-full cursor-not-allowed"
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            readOnly
          />
        </div>
        <input
          className="border border-gray-400 rounded-md py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          required
        />
        <textarea
          placeholder="Any special instructions for your order?"
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          className="border border-gray-400 rounded-md p-2 w-full h-24 resize-none"
        />
      </div>
      {/* Right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal
            applyPromoCode={applyPromoCode}
            discount={discount}
            showPromoInput={true}
            onSubtotalChange={setSubtotal}
          />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          {/* Payment Method Options */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-500 rounded-md"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-500 ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-900 text-sm font-bold mx-3 italic">
                CASH ON DELIVERY
              </p>
            </div>

            <div
              onClick={() => {}}
              className="flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50 border-gray-500 rounded-md"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-500`}
              ></p>
              <img className="h-5 mx-4" src={assets.paymob} alt="" />
              <p className="-ml-2 text-gray-500 text-sm font-bold">
                &quot;Coming Soon&quot;
              </p>
            </div>
          </div>
          <div className="w-full md:text-end text-center mt-5">
            <button
              type="submit"
              className="bg-white text-black px-16 py-3 border border-gray-400 text-sm rounded-md w-full hover:bg-black hover:text-white duration-300 transition-all"
              disabled={subtotal === 0 || loading}
            >
              {loading ? "Placing Order..." : "PLACE YOUR ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
