/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import CitySelect from "../../helpers/CitySelect.jsx";
import UnAuthorized from "../components/UnAuthorized.jsx";
import {
  Building2,
  CreditCard,
  MapPin,
  Phone,
  Truck,
  User,
  Mail,
  Clipboard,
  CreditCardIcon,
  CoinsIcon,
  LucideLassoSelect,
} from "lucide-react";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [promoCodes, setPromoCodes] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [isFirstOrder, setIsFirstOrder] = useState(false);
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
    currentUser,
  } = useContext(ShopContext);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    return phoneRegex.test(phone);
  };

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
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
        promoCode: appliedPromoCode || null,
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

  const loadOrdersData = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/user-orders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
        if (response.data.orders.length === 0) {
          setIsFirstOrder(true);
        } else {
          setIsFirstOrder(false);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, [token]);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/promo/get`);
        setPromoCodes(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPromoCodes();
    const interval = setInterval(fetchPromoCodes, 10000);
    return () => clearInterval(interval);
  }, [backendUrl]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const savedToken = token || localStorage.getItem("token");
        if (!savedToken) {
          toast.error("Authentication token is missing.");
          return;
        }
        const response = await axios.all([
          axios.post(
            `${backendUrl}/api/cart/get`,
            {},
            { headers: { token: savedToken } }
          ),
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
    if (isFirstOrder) {
      const discountAmount = (getCartAmount() * 25) / 100;
      setDiscount(discountAmount);
      setAppliedPromoCode("FIRSTORDER25");
      toast.success(`First-order discount applied!`);
      return;
    }

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

  if (!token) return <UnAuthorized />;

  const required = "required";
  const requiredVar = "*";

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-7xl mx-auto md:px-4 md:py-8 py-2 -mb-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-gray-400 rounded-md">
        {/* Delivery Information Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-400 pb-4">
            <Truck className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Delivery Information</h2>
          </div>

          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" />
                  First Name <span className={required}>{requiredVar}</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  required
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg 
                  focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" />
                  Last Name <span className={required}>{requiredVar}</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  required
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg 
                  focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4" />
                Email Address <span className={required}>{requiredVar}</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
                required
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 
                focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            {/* Address Fields */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4" />
                Street Address <span className={required}>{requiredVar}</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={onChangeHandler}
                required
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 
                focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div className="flex items-center flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full md:w-[50%]">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Building2 className="w-4 h-4" />
                  City <span className={required}>{requiredVar}</span>
                </label>
                <CitySelect
                  value={formData.city}
                  onChange={onChangeHandler}
                  setDeliveryFee={setDeliveryFee}
                />
              </div>

              <div className="space-y-2 w-full md:w-[50%]">
                <label className="text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4" />
                Phone Number <span className={required}>{requiredVar}</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChangeHandler}
                required
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            {/* Order Notes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clipboard className="w-4 h-4" />
                Order Notes (Optional)
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Any special instructions for your order?"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors h-24 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-400 pb-4">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Payment Details</h2>
            </div>

            <CartTotal
              applyPromoCode={applyPromoCode}
              discount={discount}
              showPromoInput={true}
              onSubtotalChange={setSubtotal}
            />

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <LucideLassoSelect className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Payment Methods</h2>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setMethod("cod")}
                  className={`flex items-center p-4 border border-gray-400 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                    method === "cod"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border border-gray-400 mr-3 transition-colors ${
                      method === "cod"
                        ? "border-primary bg-black"
                        : "border-gray-400"
                    }`}
                  />
                  <CoinsIcon className="h-6 mx-4" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>

                <div className="flex items-center p-4 border border-gray-400 rounded-lg opacity-50 cursor-not-allowed">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 mr-3" />
                  <CreditCardIcon className="h-6 mx-4" />
                  <img className="h-6 mx-4" src={assets.paymob} alt="" />
                  <span className="text-sm text-gray-800">
                    &quot; Coming Soon &quot;
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={subtotal === 0 || loading}
              className={`w-full mt-6 border border-gray-400 py-3 px-4 rounded-lg font-medium transition-all
                ${
                  subtotal === 0 || loading
                    ? " text-black cursor-not-allowed"
                    : " text-black hover:bg-primary/90"
                }
              `}
            >
              {loading
                ? "Processing..."
                : `Place Order ( Total ${
                    Number(getCartAmount()) +
                    (Number(delivery_fee) || 0) -
                    (Number(discount) || 0)
                  }.00 EGP )`}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
