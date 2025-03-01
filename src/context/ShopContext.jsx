/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const deliveryFees = {
  أسوان: 98,
  أسيوط: 91,
  الأقصر: 98,
  الاسكندرية: 56,
  الاسماعيلية: 56,
  "البحر الأحمر": 91,
  البحيرة: 56,
  الجيزة: 56,
  الدقهلية: 48,
  السويس: 58,
  الشرقية: 48,
  الغربية: 48,
  الفيوم: 58,
  القاهرة: 56,
  القليوبية: 56,
  المنصورة: 25,
  المنوفية: 48,
  المنيا: 72,
  "الوادي الجديد": 98,
  "بني سويف": 58,
  بورسعيد: 56,
  "جنوب سيناء": 48,
  دمياط: 48,
  سوهاج: 98,
  "شمال سيناء": 58,
  طلخا: 25,
  قنا: 98,
  "كفر الشيخ": 48,
  مطروح: 84,
};

const ShopContextProvider = (props) => {
  const currency = "جنيه";
  const [delivery_fee, setDeliveryFee] = useState(deliveryFees.initial);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserReviews, setCurrentUserReviews] = useState([]);
  const navigate = useNavigate();

  const closeCartDropdown = () => setShowCartDropdown(false);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("يجب اختيار المقاس أولا");
      return;
    }
    if (cartItems[itemId] && cartItems[itemId][size]) {
      toast.error("المنتج موجود في السلة");
      return;
    }
    let cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    setShowCartDropdown(true);
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        if (response.data.success) {
          const cartResponse = await axios.post(
            `${backendUrl}/api/cart/get`,
            {},
            { headers: { token } }
          );
          if (cartResponse.data.success) {
            setCartItems(cartResponse.data.cartData);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      const displayPrice = itemInfo?.discountStatus
        ? itemInfo?.discountedPrice
        : itemInfo?.price;
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item] * displayPrice;
          }
        } catch (error) {
          console.log("Something went wrong: ", error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/get-products"
      );
      if (response.data.success) {
        // Filter products where isActive is true
        const activeProducts = response.data.products.filter(
          (product) => product.isActive === true
        );
        setProducts(activeProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCurrentUser = async (token) => {
    try {
      const response = await axios.get(backendUrl + "/api/user/current-user", {
        headers: { token },
      });
      if (response.data.success) {
        const { user } = response.data;

        setCurrentUser(response.data.user);

        const favorites = user.favoriteProducts.map((product) => ({
          id: product._id,
          name: product.name,
        }));

        setCurrentUserReviews(response.data.reviews);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
      getCurrentUser(token);
    } else if (localStorage.getItem("token")) {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getCurrentUser(storedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    cartItems,
    backendUrl,
    token,
    deliveryFees,
    showCartDropdown,
    currentUser,
    currentUserReviews,
    setCurrentUserReviews,
    setCurrentUser,
    closeCartDropdown,
    setShowCartDropdown,
    setSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    setToken,
    setCartItems,
    setDeliveryFee,
    getUserCart,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
