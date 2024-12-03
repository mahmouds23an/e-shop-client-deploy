import { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import CartDropdown from "./CartDropdown";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
    showCartDropdown,
    currentUser,
  } = useContext(ShopContext);

  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const goToCartPage = () => {
    navigate("/cart");
  };

  const goToWishlistPage = () => {
    navigate("/wishlist");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      {/* Large screen navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 uppercase text-gray-400"
        >
          Home
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 uppercase text-gray-400"
        >
          Collection
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 uppercase text-gray-400"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 uppercase text-gray-400"
        >
          Contact-Us
        </NavLink>
      </ul>
      {token ? (
        <div className="flex items-center gap-6">
          <div className="relative" ref={profileDropdownRef}>
            <div className="flex items-center gap-2">
              <img
                onClick={toggleProfileDropdown}
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="Profile"
              />
              <div className="flex gap-1 items-center text-sm">
                <p className="text-gray-500">Hi, </p>
                <p className="text-gray-500">{currentUser?.firstName}</p>
              </div>
            </div>

            <div
              className={`absolute -right-11 mt-6 w-80 bg-white shadow-md rounded-md transition-transform transform duration-500 ease-out ${
                showCartDropdown
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              {showCartDropdown && <CartDropdown show={true} />}
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
                    Orders
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

          <div className="relative">
            <img
              onClick={goToWishlistPage}
              src={assets.wishlist}
              className="w-7 cursor-pointer"
              alt="Cart"
            />
            {/* <p className="absolute right-[-8px] bottom-[-8px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getWishlistCount()}
            </p> */}
          </div>

          <div className="relative">
            <img
              onClick={goToCartPage}
              src={assets.cart_icon}
              className="w-5 cursor-pointer"
              alt="Cart"
            />
            <p className="absolute right-[-8px] bottom-[-8px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
          <Link to="/login">
            <button className="px-7 py-2 text-sm text-white bg-black hover:opacity-70 rounded-full">
              Login
            </button>
          </Link>
        </div>
      )}
      <button
        className="block sm:hidden text-gray-700 text-2xl"
        onClick={toggleMenu}
      >
        {menuVisible ? <FaTimes /> : <FaBars />}
      </button>
      {/* Dropdown menu for small screens */}
      {menuVisible && (
        <ul className="absolute top-20 right-0 bg-white shadow-lg border border-gray-400 rounded-lg flex flex-col w-48 p-4 gap-2 z-50 sm:hidden">
          <NavLink
            to="/"
            className="text-gray-400 p-2 rounded-md"
            onClick={() => setMenuVisible(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className="text-gray-400 p-2 rounded-md"
            onClick={() => setMenuVisible(false)}
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-400 p-2 rounded-md"
            onClick={() => setMenuVisible(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-400 p-2 rounded-md"
            onClick={() => setMenuVisible(false)}
          >
            Contact-Us
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
