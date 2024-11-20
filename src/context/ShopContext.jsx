/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const deliveryFees = {
  initial: 0,
  Cairo: 10,
  Alexandria: 15,
  Giza: 12,
  "Shubra El Kheima": 10,
  "Port Said": 20,
  Suez: 18,
  Mansoura: 15,
  Tanta: 16,
  Asyut: 25,
  Ismailia: 20,
  Zagazig: 17,
  Faiyum: 22,
  Damanhur: 19,
  Minya: 23,
  "Beni Suef": 21,
  Luxor: 30,
  Aswan: 32,
  Hurghada: 35,
  "Sharm El Sheikh": 40,
  "6th of October City": 15,
  "New Cairo": 12,
  "Nasr City": 10,
  Maadi: 14,
  Helwan: 16,
  "Obour City": 18,
};

const ShopContextProvider = (props) => {
  const currency = "EGP";
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
      toast.error("Please select a size first.");
      return;
    }
    if (cartItems[itemId] && cartItems[itemId][size]) {
      toast.error("Already added");
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
    setTimeout(() => setShowCartDropdown(false), 6000);
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
        setProducts(response.data.products);
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
        setCurrentUser(response.data.user);
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
      getCurrentUser(token);
    }
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

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
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
