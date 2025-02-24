/* eslint-disable no-unused-vars */
import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import auraLogoNavNew from "/AuraNav.png";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-hot-toast";
import CartDropdown from "./CartDropdown";
import {
  FaHome,
  FaThLarge,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const {
    getCartCount,
    token,
    setToken,
    setCartItems,
    showCartDropdown,
    setShowCartDropdown,
    currentUser,
    products,
  } = useContext(ShopContext);
  
  const navCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const navSubCategories = [
    ...new Set(products.map((product) => product.subCategory)),
  ];

  const profileDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownVisible(false);
      }
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCartDropdown]);

  const logout = () => {
    navigate("/login");
    toast.success("Logged Out Successfully");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const toggleCartDropdown = (e) => {
    e.stopPropagation();
    setShowCartDropdown(!showCartDropdown);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 font-medium relative">
      <Link to="/">
        <img src={auraLogoNavNew} alt="Logo" className="w-28" />
      </Link>

      <ul className="hidden lg:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="uppercase text-gray-400 hover:text-black">
          Home
        </NavLink>
        <NavLink
          to="/collection"
          className="uppercase text-gray-400 hover:text-black"
        >
          Collection
        </NavLink>
        <NavLink
          to="/about"
          className="uppercase text-gray-400 hover:text-black"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="uppercase text-gray-400 hover:text-black"
        >
          Contact-Us
        </NavLink>
      </ul>

      {token ? (
        <div className="flex items-center gap-6">
          <div className="relative lg:mr-0 -mr-8" ref={profileDropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <FaUser className="w-5 h-5" />
              <div className="flex gap-1 items-center text-sm">
                <p>Hello,</p>
                <p>{currentUser?.firstName}</p>
              </div>
            </div>

            {profileDropdownVisible && (
              <div className="absolute z-50 right-0 mt-2 w-64 bg-white shadow-lg p-4 border border-black rounded-lg">
                <div className="flex flex-col gap-2 text-gray-500">
                  <p
                    onClick={() => {
                      navigate("/profile");
                      setProfileDropdownVisible(false);
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/orders");
                      setProfileDropdownVisible(false);
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    My Orders
                  </p>
                  <p
                    onClick={() => {
                      logout();
                      setProfileDropdownVisible(false);
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={cartDropdownRef}>
            <div
              className="cursor-pointer relative hidden lg:block"
              onClick={toggleCartDropdown}
            >
              <FaShoppingCart className="w-5 h-5" />
              <p className="absolute right-[-8px] bottom-[-8px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            </div>
            {showCartDropdown && <CartDropdown show={true} />}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link to="/login">
            <button className="px-7 py-2 text-sm text-white bg-black hover:opacity-70 rounded-full">
              Login
            </button>
          </Link>
        </div>
      )}

      <div
        className="fixed -bottom-2 rounded-t-xl left-0 w-[100vw] bg-gradient-to-r 
      from-stone-400 via-stone-400 to-stone-400 text-white 
      shadow-lg flex justify-around items-center py-3 lg:hidden"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-black font-bold scale-110 border-black"
                : "hover:text-black"
            }`
          }
        >
          <FaHome className="text-2xl" />
          <span className="mt-1">Home</span>
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-black font-bold scale-110 border-black"
                : "hover:text-black"
            }`
          }
        >
          <FaThLarge className="text-2xl" />
          <span className="mt-1">Collection</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-black font-bold scale-110 border-black"
                : "hover:text-black"
            }`
          }
        >
          <FaInfoCircle className="text-2xl" />
          <span className="mt-1">About</span>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-black font-bold scale-110 border-black"
                : "hover:text-black"
            }`
          }
        >
          <FaEnvelope className="text-2xl" />
          <span className="mt-1">Contact</span>
        </NavLink>
        <div
          className="relative flex flex-col items-center text-sm cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="text-2xl" />
          <p className="absolute right-[-8px] top-[-8px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
          <span className="mt-1">Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
